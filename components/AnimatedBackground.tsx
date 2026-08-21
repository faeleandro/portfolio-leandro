const ROWS = 16;
const VIEW = 1000;

/**
 * Fondo fijo detrás de todo el sitio: líneas horizontales deformadas por
 * un campo de turbulencia SVG animado, dando un efecto de "flujo" lima
 * sobre negro. 100% CSS/SVG (sin JS, sin imágenes).
 *
 * El filtro de turbulencia animado es carísimo de renderizar (recalcula
 * ruido en toda la pantalla en cada frame, y desactiva la aceleración por
 * GPU en la mayoría de los navegadores) — en celulares eso se siente como
 * scroll trabado y carga lenta. Por eso solo se muestra desde el
 * breakpoint md (tablet/desktop); en mobile queda solo el fondo plano.
 */
export default function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-paper">
      <svg
        className="hidden h-full w-full opacity-40 mix-blend-screen md:block md:opacity-50"
        viewBox={`0 0 ${VIEW} ${VIEW}`}
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <defs>
          <filter id="flowField" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.010 0.018"
              numOctaves="2"
              seed="7"
              result="noise"
            >
              <animate
                attributeName="baseFrequency"
                dur="40s"
                values="0.010 0.018;0.016 0.010;0.010 0.018"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="130"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>

          <linearGradient
            id="lineFade"
            gradientUnits="userSpaceOnUse"
            x1="0"
            y1="0"
            x2="0"
            y2={VIEW}
          >
            <stop offset="0%" stopColor="#d7ff3d" stopOpacity="0" />
            <stop offset="12%" stopColor="#d7ff3d" stopOpacity="0.9" />
            <stop offset="88%" stopColor="#d7ff3d" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#d7ff3d" stopOpacity="0" />
          </linearGradient>
        </defs>

        <g filter="url(#flowField)" fill="none" stroke="url(#lineFade)" strokeWidth="1.3">
          {Array.from({ length: ROWS }, (_, i) => {
            const y = (VIEW / (ROWS - 1)) * i;
            return <line key={i} x1={-100} y1={y} x2={VIEW + 100} y2={y} />;
          })}
        </g>
      </svg>
    </div>
  );
}
