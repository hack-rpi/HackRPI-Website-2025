"use client";

import { useEffect, useState } from "react";
import FadeInImage from "@/components/prev-projects/FadeInImage";

export default function LastYearCollage() {
  const [photos, setPhotos] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/last-year/photos", { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setPhotos(data.photos ?? []);
      } catch (e: any) {
        setError(e?.message || "Failed to load photos");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading)
    return <p className="py-6 text-center text-gray-500">Loading photos…</p>;
  if (error)
    return (
      <p className="py-6 text-center text-red-600">Error: {error}</p>
    );
  if (!photos.length)
    return (
      <p className="py-6 text-center text-gray-500">No photos found.</p>
    );

  return (
    <div className="w-full flex items-center justify-center">
      {/* Masonry-style layout using CSS columns */}
      <div
        className="
          w-full p-5
          columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5
          gap-3
          [column-fill:_balance]
        "
      >
        {photos.map((src) => (
          <div
            key={src}
            className="
              mb-3
              break-inside-avoid
              rounded-xl
              overflow-hidden
              shadow-sm
              opacity-0
              animate-fadeIn
            "
          >
            <FadeInImage
              src={src}
              alt="HackRPI XI Photo"
              width={1600}
              height={1600}
              className="w-full h-auto object-cover rounded-xl transition-transform duration-300 hover:scale-[1.02]"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
