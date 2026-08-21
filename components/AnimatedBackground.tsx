/**
 * Fondo fijo detrás de todo el sitio: "glow orbs" — manchas lima difuminadas
 * que flotan lentamente (solo transform/opacity, aceleradas por GPU).
 * Livianas de verdad: andan fluido en cualquier dispositivo. Dan el efecto
 * "futurista" sin el costo de un filtro SVG animado (feTurbulence +
 * feDisplacementMap), que se probó acá antes y resultó pesado también en
 * desktop — se recalcula en cada frame y en muchos navegadores desactiva la
 * aceleración por GPU, generando jank.
 */
export default function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-paper">
      <div className="absolute -left-1/4 top-[-10%] h-[55vh] w-[55vh] animate-drift rounded-full bg-lime/25 blur-[100px]" />
      <div className="absolute -right-1/4 top-1/3 h-[50vh] w-[50vh] animate-drift-reverse rounded-full bg-lime/15 blur-[100px]" />
      <div className="absolute bottom-[-10%] left-1/4 h-[45vh] w-[45vh] animate-pulse-glow rounded-full bg-lime/15 blur-[90px]" />
    </div>
  );
}
