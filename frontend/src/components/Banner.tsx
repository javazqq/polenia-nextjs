'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function MovingBanner({
  text = '🌿 Ginger Beer • Naturally Brewed • Chill & Refreshing • Purple Citrus Vibes • Limited Batch • Get Yours 🌸',
  speed = 60,
}: {
  text?: string;
  speed?: number;
}) {
  const bannerRef = useRef<HTMLDivElement>(null);
  const [currentSpeed, setCurrentSpeed] = useState(speed);

  useEffect(() => {
    const updateSpeed = () => {
      const isMobile = window.innerWidth < 768;
      setCurrentSpeed(isMobile ? speed * 1.3 : speed);
    };

    updateSpeed();
    window.addEventListener('resize', updateSpeed);
    return () => window.removeEventListener('resize', updateSpeed);
  }, [speed]);

  useEffect(() => {
    const banner = bannerRef.current;
    if (!banner) return;

    let start = performance.now();
    let offset = 0;

    const animate = (time: number) => {
      const delta = time - start;
      start = time;
      offset -= delta / currentSpeed;
      banner.style.transform = `translateX(${offset}px)`;

      if (Math.abs(offset) > banner.scrollWidth / 2) {
        offset = 0;
      }

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [currentSpeed]);

  return (
    <div className="w-full overflow-hidden bg-gradient-to-r from-purple-700 via-pink-600 to-purple-800 py-3 rounded-md shadow-inner">
      <div className="whitespace-nowrap flex">
        <div
          ref={bannerRef}
          className="flex text-lg font-semibold space-x-12"
        >
          {[...Array(2)].map((_, i) => (
            <span
              key={i}
              className="flex items-center text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-yellow-300 to-lime-200 drop-shadow-sm animate-gradient-x"
            >
              <motion.span
                className="mx-2"
                animate={{ y: [0, -2, 0] }}
                transition={{ repeat: Infinity, duration: 2, delay: i * 0.5 }}
              >
                🍋
              </motion.span>
              {text}
              <motion.span
                className="mx-2"
                animate={{ y: [0, -2, 0] }}
                transition={{ repeat: Infinity, duration: 2, delay: i * 0.7 }}
              >
                🍃
              </motion.span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
