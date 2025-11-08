const fs = require('fs').promises;
const path = require('path');
let sharp;

// Only require sharp if we actually run (avoid error if devs don't have it locally)
try {
  sharp = require('sharp');
} catch (e) {
  // Will handle below when deciding to run
}

const VALID = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif']);
const SKIP = new Set(['.gif']); // sharp can't encode animated gif; skip

const MAX_WIDTH = Number(process.env.LASTYEAR_MAX_WIDTH) || 1600; // px
const JPEG_QUALITY = Number(process.env.LASTYEAR_JPEG_QUALITY) || 72;
const WEBP_QUALITY = Number(process.env.LASTYEAR_WEBP_QUALITY) || 72;
const AVIF_QUALITY = Number(process.env.LASTYEAR_AVIF_QUALITY) || 45;
const MIN_SAVINGS_RATIO = 0.05; // only overwrite if >=5% smaller

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

  const stat = await fs.stat(filePath);
  const origSize = stat.size;

  let pipeline = sharp(filePath).rotate().resize({ width: MAX_WIDTH, withoutEnlargement: true, fit: 'inside' });

  if (ext === '.jpg' || ext === '.jpeg') {
    pipeline = pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true, chromaSubsampling: '4:2:0' });
  } else if (ext === '.png') {
    pipeline = pipeline.png({ compressionLevel: 9, palette: true });
  } else if (ext === '.webp') {
    pipeline = pipeline.webp({ quality: WEBP_QUALITY });
  } else if (ext === '.avif') {
    pipeline = pipeline.avif({ quality: AVIF_QUALITY });
  }

  const buffer = await pipeline.toBuffer();
  if (buffer.length < origSize * (1 - MIN_SAVINGS_RATIO)) {
    await fs.writeFile(filePath, buffer);
    return { optimized: true, before: origSize, after: buffer.length };
  } else {
    return { optimized: false, before: origSize, after: buffer.length };
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

  const files = entries.filter(e => e.isFile()).map(e => path.join(dir, e.name));
  if (files.length === 0) {
    console.log('[optimize-lastyear] No files found to optimize.');
    return;
  }

  let totalBefore = 0;
  let totalAfter = 0;
  let optimizedCount = 0;
  for (const f of files) {
    try {
      const res = await optimizeFile(f);
      if (res && res.before) totalBefore += res.before;
      if (res && res.after) totalAfter += res.after;
      if (res && res.optimized) {
        optimizedCount++;
        const name = path.basename(f);
        console.log(`[optimize-lastyear] ${name}: ${fmtBytes(res.before)} -> ${fmtBytes(res.after)}`);
      }
    } catch (err) {
      console.error('[optimize-lastyear] Failed to optimize', f, err.message);
    }
  }

  const saved = totalBefore - totalAfter;
  if (optimizedCount > 0) {
    console.log(`[optimize-lastyear] Optimized ${optimizedCount}/${files.length} files. Saved ~${fmtBytes(saved)}.`);
  } else {
    console.log('[optimize-lastyear] No files benefited from recompression (already optimized or too small to matter).');
  }
}

main();
