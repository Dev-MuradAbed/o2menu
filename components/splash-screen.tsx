"use client";

import { useState, useEffect } from "react";

export function SplashScreen({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<"splash" | "exiting" | "done">("splash");

  useEffect(() => {
    const exitTimer = setTimeout(() => setPhase("exiting"), 700);
    const doneTimer = setTimeout(() => setPhase("done"), 1200);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  return (
    <>
      {phase !== "done" && (
        <div
          className={`splash-overlay ${phase === "exiting" ? "splash-exit" : ""}`}
        >
          <div className="loading-figure">
            {/* Outer rotating ring */}
            <svg
              className="loading-ring"
              viewBox="0 0 200 200"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polygon
                className="loading-hexagon"
                points="100,10 178,55 178,145 100,190 22,145 22,55"
                fill="none"
                stroke="#e20004"
                strokeWidth="2"
              />
              <polygon
                className="loading-hexagon-inner"
                points="100,30 160,65 160,135 100,170 40,135 40,65"
                fill="none"
                stroke="#e20004"
                strokeWidth="1"
              />
            </svg>

            {/* Logo container */}
            <div className="loading-logo-wrap">
              <img
                src="/O2.png"
                alt="O2"
                width={80}
                height={80}
                className="loading-logo"
              />
            </div>

            {/* Orbiting dots */}
            <div className="loading-orbit">
              <div className="loading-dot loading-dot-1" />
              <div className="loading-dot loading-dot-2" />
              <div className="loading-dot loading-dot-3" />
            </div>
          </div>

          {/* Bottom line accent */}
          <div className="loading-line" />
        </div>
      )}

      <div
        className={`splash-content ${
          phase === "done" ? "splash-content-visible" : ""
        }`}
      >
        {children}
      </div>
    </>
  );
}
