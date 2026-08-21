const ROWS = 16;
const VIEW = 1000;

/**
 * Fondo fijo detrás de todo el sitio.
 *
 * Dos capas:
 * 1. "Glow orbs" — manchas lima difuminadas que flotan lentamente (solo
 *    transform/opacity, aceleradas por GPU). Livianas de verdad: andan
 *    bien en cualquier celular. Dan el efecto "futurista" en todos los
 *    dispositivos.
 * 2. Líneas de turbulencia SVG animadas — mucho más ricas visualmente,
 *    pero el filtro (feTurbulence + feDisplacementMap) es carísimo de
 *    recalcular en cada frame y desactiva la aceleración por GPU en la
 *    mayoría de los navegadores. Por eso esta capa se reserva solo para
 *    desktop/tablet (md+), donde el hardware la soporta sin problema.
 */
export default function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-paper">
      <div className="absolute -left-1/4 top-[-10%] h-[55vh] w-[55vh] animate-drift rounded-full bg-lime/25 blur-[100px]" />
      <div className="absolute -right-1/4 top-1/3 h-[50vh] w-[50vh] animate-drift-reverse rounded-full bg-lime/15 blur-[100px]" />
      <div className="absolute bottom-[-10%] left-1/4 h-[45vh] w-[45vh] animate-pulse-glow rounded-full bg-lime/15 blur-[90px]" />

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
