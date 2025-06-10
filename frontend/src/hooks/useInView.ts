"use client";

import { useEffect, useState, useRef } from 'react';

export const useInView = (options = {}) => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect(); // Stop observing once loaded
        }
      },
      {
        root: null,
        rootMargin: '200px',
        threshold: 0.1,
        ...options
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [options]);

  return { ref, isInView };
};