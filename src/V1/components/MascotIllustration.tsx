import React from "react";

type MascotIllustrationProps = {
  step: 1 | 2 | 3;
};

export const MascotIllustration = ({ step }: MascotIllustrationProps) => {
  const illustrations = {
    1: "/lovable-uploads/316b6a12-c382-4fe2-8141-951582eb5fc9.png",
    2: "/lovable-uploads/3022d548-0603-4325-969e-a50b99e94a73.png",
    3: "/lovable-uploads/1e198544-a9e7-43e1-b1ef-60ee86aa3ba8.png",
  };

  const altTexts = {
    1: "Magnify Cash mascot standing on a dock, welcoming you to the app",
    2: "Magnify Cash mascot sitting on a bench, showing how gas-free loans work",
    3: "Magnify Cash mascot celebrating with a magical staff, representing successful loan completion",
  };

  return (
    <div className="relative w-full h-64 overflow-hidden rounded-xl bg-gradient-to-r from-worldcoin-primary/10 to-worldcoin-secondary/10">
      <div className="w-full h-full p-8 flex items-center justify-center">
        <img
          src={illustrations[step]}
          alt={altTexts[step]}
          className="max-h-full w-auto object-contain animate-fade-up rounded-2xl shadow-xl animate-pulse-glow transition-all duration-300 drop-shadow-[0_0_25px_rgba(0,0,0,0.2)]"
        />
      </div>
    </div>
  );
};
