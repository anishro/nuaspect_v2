/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */


export default function FerrisWheel() {
  const cabinsCount = 12;
  const radius = 300;
  const cx = 400;
  const cy = 400;

  // Compute cabin coordinates for drawing spokes in static position
  const cabins = Array.from({ length: cabinsCount }, (_, i) => {
    const angle = (i * 360) / cabinsCount;
    const rad = (angle * Math.PI) / 180;
    const x = cx + radius * Math.cos(rad);
    const y = cy + radius * Math.sin(rad);
    return { id: i, x, y, angle };
  });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      <svg
        className="w-full h-full opacity-[0.08] text-brand-charcoal md:opacity-[0.12] transition-opacity duration-1000"
        viewBox="0 0 800 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <style>{`
          @keyframes ferris-spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes cabin-spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(-360deg); }
          }
          .animate-ferris-wheel {
            animation: ferris-spin 80s linear infinite;
            transform-origin: ${cx}px ${cy}px;
          }
          .animate-cabin-reverse {
            animation: cabin-spin 80s linear infinite;
          }
        `}</style>

        {/* Supporting Structure (Stationary) */}
        {/* Ground level line */}
        <line x1="100" y1="760" x2="700" y2="760" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        
        {/* Support A-Frame */}
        <line x1={cx} y1={cy} x2="330" y2="760" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        <line x1={cx} y1={cy} x2="470" y2="760" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        <line x1={cx} y1={cy} x2="400" y2="760" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />

        {/* Secondary A-Frame backplate/support */}
        <polygon points="360,760 400,400 440,760" fill="currentColor" fillOpacity="0.03" />

        {/* Central Hub base anchor */}
        <circle cx={cx} cy="760" r="10" fill="currentColor" />

        {/* Outer Wheel group that rotates */}
        <g className="animate-ferris-wheel">
          {/* Concentric Structural Circles */}
          {/* Main Outer Rim */}
          <circle cx={cx} cy={cy} r={radius} stroke="currentColor" strokeWidth="3" />
          {/* Secondary Outer Rim */}
          <circle cx={cx} cy={cy} r={radius - 12} stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
          {/* Inner Structural Rim */}
          <circle cx={cx} cy={cy} r={radius * 0.7} stroke="currentColor" strokeWidth="2" />
          {/* Inner Structural Ring 2 */}
          <circle cx={cx} cy={cy} r={radius * 0.4} stroke="currentColor" strokeWidth="1.5" />
          {/* Center Hub Outer Core */}
          <circle cx={cx} cy={cy} r="45" stroke="currentColor" strokeWidth="2.5" fill="none" />
          <circle cx={cx} cy={cy} r="25" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />

          {/* Spokes and Structural Bracing cross-meshes */}
          {cabins.map((cabin) => {
            // Secondary diagonal trussing for realism
            const nextIndex = (cabin.id + 1) % cabinsCount;
            const nextCabin = cabins[nextIndex];
            
            return (
              <g key={`struct-${cabin.id}`}>
                {/* Main Spokes */}
                <line
                  x1={cx}
                  y1={cy}
                  x2={cabin.x}
                  y2={cabin.y}
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                
                {/* Inner bracing cross lines to next spoke */}
                <line
                  x1={cx + (radius * 0.7) * Math.cos((cabin.angle * Math.PI) / 180)}
                  y1={cy + (radius * 0.7) * Math.sin((cabin.angle * Math.PI) / 180)}
                  x2={cx + radius * Math.cos((nextCabin.angle * Math.PI) / 180)}
                  y2={cy + radius * Math.sin((nextCabin.angle * Math.PI) / 180)}
                  stroke="currentColor"
                  strokeWidth="0.8"
                  strokeDasharray="2 2"
                  opacity="0.7"
                />
                <line
                  x1={cx + radius * Math.cos((cabin.angle * Math.PI) / 180)}
                  y1={cy + radius * Math.sin((cabin.angle * Math.PI) / 180)}
                  x2={cx + (radius * 0.7) * Math.cos((nextCabin.angle * Math.PI) / 180)}
                  y2={cy + (radius * 0.7) * Math.sin((nextCabin.angle * Math.PI) / 180)}
                  stroke="currentColor"
                  strokeWidth="0.8"
                  strokeDasharray="2 2"
                  opacity="0.7"
                />
              </g>
            );
          })}

          {/* Passenger Cabins (Gondolas) which stay upright */}
          {cabins.map((cabin) => (
            <g
              key={`cabin-${cabin.id}`}
              className="animate-cabin-reverse"
              style={{
                transformOrigin: `${cabin.x}px ${cabin.y}px`
              }}
            >
              {/* Cabin Pivot Pin */}
              <circle cx={cabin.x} cy={cabin.y} r="4" fill="currentColor" />

              {/* Cabin Hanger Bracket */}
              <line
                x1={cabin.x}
                y1={cabin.y}
                x2={cabin.x}
                y2={cabin.y + 12}
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              {/* Cabin Outer Shell (Capsule shape) */}
              {/* Draw a pill/circle/capsule at cabin.x, cabin.y + 24 */}
              <rect
                x={cabin.x - 14}
                y={cabin.y + 12}
                width="28"
                height="22"
                rx="6"
                stroke="currentColor"
                strokeWidth="2"
                fill="var(--color-brand-cream-light)"
                fillOpacity="0.9"
              />
              
              {/* Cabin Dome Cap */}
              <path
                d={`M ${cabin.x - 14} ${cabin.y + 16} A 14 14 0 0 1 ${cabin.x + 14} ${cabin.y + 16}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                opacity="0.5"
              />

              {/* Cabin Window */}
              <rect
                x={cabin.x - 10}
                y={cabin.y + 16}
                width="20"
                height="10"
                rx="3"
                stroke="currentColor"
                strokeWidth="1"
                fill="var(--color-brand-cream-dark)"
                fillOpacity="0.4"
              />

              {/* Micro passengers (subtle aesthetic touches!) */}
              <circle cx={cabin.x - 4} cy={cabin.y + 21} r="2.5" fill="currentColor" opacity="0.6" />
              <circle cx={cabin.x + 4} cy={cabin.y + 21} r="2.5" fill="currentColor" opacity="0.6" />
            </g>
          ))}
        </g>

        {/* Center Hub Core (Stationary Foreground Ring overlay) */}
        <circle cx={cx} cy={cy} r="18" fill="var(--color-brand-cream)" stroke="currentColor" strokeWidth="3" />
        <circle cx={cx} cy={cy} r="8" fill="currentColor" />
      </svg>
    </div>
  );
}
