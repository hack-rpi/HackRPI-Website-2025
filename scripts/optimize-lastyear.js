const fs = require('fs').promises;
const fsSync = require('fs');
const path = require('path');
let sharp;

// Only require sharp if we actually run (avoid error if devs don't have it locally)
try {
  sharp = require('sharp');
} catch (e) {
  // Will handle below when deciding to run
}

const VALID = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.JPG', '.JPEG', '.PNG']);
const SKIP = new Set(['.gif']); // sharp can't encode animated gif; skip

const MAX_WIDTH = Number(process.env.LASTYEAR_MAX_WIDTH) || 800; // More aggressive: 800px
const JPEG_QUALITY = Number(process.env.LASTYEAR_JPEG_QUALITY) || 60; // More aggressive: 60%
const MIN_SAVINGS_RATIO = 0.0; // Always replace if smaller

function fmtBytes(bytes) {
  const sizes = ['B', 'KB', 'MB', 'GB'];
  if (bytes === 0) return '0B';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const val = bytes / Math.pow(1024, i);
  return `${val.toFixed(1)} ${sizes[i]}`;
}

async function optimizeFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!VALID.has(ext) || SKIP.has(ext)) return { skipped: true, reason: 'unsupported' };

  let origSize;
  try {
    const stat = await fs.stat(filePath);
    origSize = stat.size;
  } catch (err) {
    return { skipped: true, reason: 'stat failed: ' + err.message };
  }

  // Read into buffer first to avoid file locks
  let inputBuffer;
  try {
    inputBuffer = await fs.readFile(filePath);
  } catch (err) {
    return { skipped: true, reason: 'read failed: ' + err.message };
  }

  let pipeline = sharp(inputBuffer).rotate().resize({ width: MAX_WIDTH, withoutEnlargement: true, fit: 'inside' });

  // Force JPEG for all images for maximum compression
  pipeline = pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true, chromaSubsampling: '4:2:0' });

  let outputBuffer;
  try {
    outputBuffer = await pipeline.toBuffer();
  } catch (err) {
    return { skipped: true, reason: 'sharp failed: ' + err.message };
  }

  if (outputBuffer.length < origSize * (1 - MIN_SAVINGS_RATIO)) {
    // Write to temp file first, then rename to avoid corruption
    const tempPath = filePath + '.tmp';
    try {
      await fs.writeFile(tempPath, outputBuffer);
      // Delete original and rename temp
      try {
        await fs.unlink(filePath);
      } catch (e) {
        // Try sync if async fails
        try {
          fsSync.unlinkSync(filePath);
        } catch (e2) {
          await fs.unlink(tempPath);
          return { skipped: true, reason: 'cannot delete original' };
        }
      }
      await fs.rename(tempPath, filePath);
      return { optimized: true, before: origSize, after: outputBuffer.length };
    } catch (err) {
      // Clean up temp if it exists
      try { await fs.unlink(tempPath); } catch (e) {}
      return { skipped: true, reason: 'write failed: ' + err.message };
    }
  } else {
    return { optimized: false, before: origSize, after: outputBuffer.length };
  }
}

async function main() {
  const isCI = String(process.env.CI).toLowerCase() === 'true';
  const force = process.argv.includes('--force');
  if (!isCI && !force) {
    console.log('[optimize-lastyear] Non-CI environment detected; skipping. Use --force to run locally.');
    return;
  }
  if (!sharp) {
    console.error('[optimize-lastyear] sharp is not installed. Ensure it is listed in dependencies and available in CI.');
    process.exitCode = 1;
    return;
  }

  const dir = path.join(process.cwd(), 'public', 'lastYearPhotos');
  let entries;
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch (err) {
    console.error('[optimize-lastyear] Failed to read directory:', dir, err.message);
    process.exitCode = 1;
    return;
  }

  const files = entries.filter(e => e.isFile() && !e.name.endsWith('.tmp') && !e.name.endsWith('.ts')).map(e => path.join(dir, e.name));
  if (files.length === 0) {
    console.log('[optimize-lastyear] No files found to optimize.');
    return;
  }

  let totalBefore = 0;
  let totalAfter = 0;
  let optimizedCount = 0;
  let skippedCount = 0;
  for (const f of files) {
    const name = path.basename(f);
    try {
      const res = await optimizeFile(f);
      if (res.skipped) {
        skippedCount++;
        console.log(`[optimize-lastyear] ${name}: SKIPPED (${res.reason})`);
      } else {
        if (res.before) totalBefore += res.before;
        if (res.after) totalAfter += res.after;
        if (res.optimized) {
          optimizedCount++;
          console.log(`[optimize-lastyear] ${name}: ${fmtBytes(res.before)} -> ${fmtBytes(res.after)}`);
        }
      }
    } catch (err) {
      skippedCount++;
      console.error('[optimize-lastyear] ${name}: ERROR -', err.message);
    }
  }

  const saved = totalBefore - totalAfter;
  console.log(`\n[optimize-lastyear] Summary:`);
  console.log(`  Optimized: ${optimizedCount} files`);
  console.log(`  Skipped: ${skippedCount} files`);
  console.log(`  Total savings: ~${fmtBytes(saved)}`);
}

main();
