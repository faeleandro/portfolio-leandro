type Props = {
  text: string;
  className?: string;
};

const VIEWBOX_HEIGHT = 100;
// Ancho aproximado de cada letra en Archivo Black, como fracción de la
// altura de línea — Archivo Black es bastante uniforme/monoespaciado así
// que esta estimación funciona bien para dimensionar el viewBox.
const CHAR_WIDTH_RATIO = 0.66;

/**
 * Título grande renderizado como SVG en vez de texto HTML normal.
 *
 * En Windows, a tamaños muy grandes (md:text-9xl y similares) el texto
 * HTML se veía con una sombra/fantasma detrás de las letras — un bug de
 * rasterización del navegador que aparece con pantallas de escala
 * fraccionaria (devicePixelRatio no entero). No depende de la fuente, el
 * color, ni de nada del CSS del sitio: se probó sacando la imagen de
 * fondo, el fondo animado, cambiando de fuente por completo, sacando
 * cualquier filter/transform — nada lo arregla salvo cambiar el motor de
 * renderizado. SVG usa un camino de dibujo vectorial distinto al de texto
 * HTML y no tiene este problema.
 *
 * El viewBox escala con el tamaño que le dé el className del wrapper
 * (igual que un ícono SVG), así que sigue siendo responsive con clases de
 * Tailwind normales controlando el alto.
 */
export default function CrispHeading({ text, className = "" }: Props) {
  const width = Math.max(text.length * VIEWBOX_HEIGHT * CHAR_WIDTH_RATIO, VIEWBOX_HEIGHT);

  return (
    <svg
      viewBox={`0 0 ${width} ${VIEWBOX_HEIGHT}`}
      className={className}
      preserveAspectRatio="xMinYMid meet"
      role="img"
      aria-label={text}
    >
      <text
        x="0"
        y={VIEWBOX_HEIGHT * 0.82}
        fontSize={VIEWBOX_HEIGHT}
        fontFamily="var(--font-display), 'Arial Black', sans-serif"
        fill="currentColor"
        textLength={width}
        lengthAdjust="spacingAndGlyphs"
      >
        {text}
      </text>
    </svg>
  );
}
