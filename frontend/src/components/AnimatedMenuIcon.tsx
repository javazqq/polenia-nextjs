"use client";

type Props = {
  isOpen: boolean;
};

export function AnimatedMenuIcon({ isOpen }: Props) {
  return (
    <div className="w-8 h-8 relative flex items-center justify-center">
      {/* Top bar */}
      <span
        className={`absolute w-6 h-[3px] bg-white rounded transition-all duration-300 transform-gpu will-change-transform ${
          isOpen ? "rotate-45" : "-translate-y-1.5"
        }`}
      />

      {/* Middle bar */}
      <span
        className={`absolute w-6 h-[3px] bg-white rounded transition-all duration-200 transform-gpu will-change-transform ${
          isOpen ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* Bottom bar */}
      <span
        className={`absolute w-6 h-[3px] bg-white rounded transition-all duration-300 transform-gpu will-change-transform ${
          isOpen ? "-rotate-45" : "translate-y-1.5"
        }`}
      />
    </div>
  );
}
