"use client";

import React from "react";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className = "" }) => {
  return (
    <div className={`relative overflow-hidden rounded-3xl ${className}`}>
      {/* Background Glows */}
      <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-to-r from-[#6153E0]/20 to-[#FF6E98]/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-to-r from-[#FF991F]/15 to-[#D6E012]/15 rounded-full blur-3xl animate-pulse [animation-delay:1.5s]"></div>

      {/* Glass Container */}
      <div className="relative z-10 bg-white/50 backdrop-blur-xl border border-white/20 rounded-3xl h-full">
        {children}
      </div>
    </div>
  );
};

export default GlassCard;
