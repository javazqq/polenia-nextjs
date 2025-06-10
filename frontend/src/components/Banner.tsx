'use client';

import { useRef, useEffect } from 'react';

export default function MovingBanner({
  text = '🔥 Ginger Beer – Freshly Brewed • Spicy • Refreshing • Limited Stock • Order Now! ',
  speed = 50, // lower = faster
}: {
  text?: string;
  speed?: number;
}) {
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const banner = bannerRef.current;
    if (!banner) return;

    let start = performance.now();
    let offset = 0;

    const animate = (time: number) => {
      const delta = time - start;
      start = time;
      offset -= delta / speed;
      banner.style.transform = `translateX(${offset}px)`;

      // Reset to loop
      if (Math.abs(offset) > banner.scrollWidth / 2) {
        offset = 0;
      }

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [speed]);

  return (
    <div className="w-full overflow-hidden bg-yellow-900 py-2">
      <div className="whitespace-nowrap flex">
        <div
          ref={bannerRef}
          className="flex text-white font-bold text-lg space-x-8"
        >
          <span>{text}</span>
          <span aria-hidden="true">{text}</span> {/* duplicate for seamless loop */}
        </div>
      </div>
    </div>
  );
}
