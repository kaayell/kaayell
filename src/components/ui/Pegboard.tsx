import { ReactNode } from "react";

interface PegboardProps {
  children: ReactNode;
  holeCount?: number;
}

export default function Pegboard({ children, holeCount }: PegboardProps) {
  return (
    <div className="relative h-full w-full p-5 md:p-10 rounded-2xl pegboard">
      <div className="screw top-2 left-2 md:top-4 md:left-4" />
      <div className="screw top-2 right-2 md:top-4 md:right-4" />
      <div className="screw bottom-2 left-2 md:bottom-4 md:left-4" />
      <div className="screw bottom-2 right-2 md:bottom-4 md:right-4" />

      <div className="relative w-full h-full">
        {holeCount && (
          <div className="w-full h-full pegboard-grid">
            {[...new Array(holeCount)].map((_, index) => (
              <div key={`peg-${index}`} className="pegboard-hole" />
            ))}
          </div>
        )}

        {children}
      </div>
    </div>
  );
}
