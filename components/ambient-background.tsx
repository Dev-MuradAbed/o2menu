"use client";

export function AmbientBackground() {
  return (
    <div className="ambient-bg" aria-hidden="true">
      <div className="ambient-hex ambient-hex-1">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <polygon
            points="100,10 178,55 178,145 100,190 22,145 22,55"
            fill="none"
            stroke="#e20004"
            strokeWidth="1"
          />
        </svg>
      </div>
      <div className="ambient-hex ambient-hex-2">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <polygon
            points="100,10 178,55 178,145 100,190 22,145 22,55"
            fill="none"
            stroke="#e20004"
            strokeWidth="0.5"
          />
        </svg>
      </div>
      <div className="ambient-hex ambient-hex-3">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <polygon
            points="100,10 178,55 178,145 100,190 22,145 22,55"
            fill="none"
            stroke="#e20004"
            strokeWidth="0.8"
          />
        </svg>
      </div>
      <div className="ambient-glow ambient-glow-1" />
      <div className="ambient-glow ambient-glow-2" />
      <div className="ambient-particle ambient-particle-1" />
      <div className="ambient-particle ambient-particle-2" />
      <div className="ambient-particle ambient-particle-3" />
      <div className="ambient-particle ambient-particle-4" />
      <div className="ambient-particle ambient-particle-5" />
      <div className="ambient-particle ambient-particle-6" />
    </div>
  );
}
