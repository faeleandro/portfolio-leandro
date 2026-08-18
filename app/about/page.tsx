import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import PlaceholderMedia from "@/components/PlaceholderMedia";
import PillBreadcrumb from "@/components/PillBreadcrumb";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: `About — ${SITE.name}`,
  description: SITE.role,
};

const BIO_PARAGRAPHS = [
  `Soy ${SITE.name}, creador de contenido visual especializado en fotografía y producción audiovisual orientada a marcas, gastronomía, moda y proyectos con identidad propia.`,
  `Mi enfoque creativo nace de la búsqueda constante por capturar momentos reales y transformarlos en historias visuales que generen conexión. Me interesa crear imágenes que transmitan sensaciones, personalidad y estilo, combinando una estética urbana con una mirada cinematográfica y natural.`,
  `A lo largo de mi recorrido profesional fui desarrollando proyectos de contenido para redes sociales, ayudando a negocios y marcas a comunicar su esencia a través de producciones visuales modernas, dinámicas y auténticas. Mi trabajo se caracteriza por buscar siempre un equilibrio entre lo artístico y lo estratégico, entendiendo la importancia de crear contenido que no solo se vea bien, sino que también genere impacto y alcance.`,
  `Gran parte de mi crecimiento creativo estuvo influenciado por mis experiencias viviendo y trabajando en Chile y Brasil, donde tuve la oportunidad de convivir con nuevas culturas, estilos visuales y formas de comunicación. Estos viajes marcaron mi manera de observar los detalles, la luz, las personas y los espacios, aportando una mirada más amplia y versátil a mis producciones.`,
  `Actualmente me enfoco en desarrollar contenido que refleje la identidad de cada marca o proyecto, priorizando la autenticidad, la estética y la conexión con el público. Disfruto trabajar en entornos dinámicos, explorando nuevas ideas y generando propuestas visuales que transmitan emociones y construyan una identidad sólida.`,
  `Entiendo la fotografía y el video como herramientas para contar historias, crear experiencias y dejar una huella visual que represente verdaderamente a cada proyecto con el que trabajo.`,
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-10 md:px-10 md:py-16">
      <div className="flex flex-col overflow-hidden rounded-[2rem] md:flex-row">
        <div className="flex flex-col items-center justify-between gap-10 bg-forest px-8 py-10 md:w-[38%] md:items-start md:px-10 md:py-14">
          <PillBreadcrumb items={[{ label: "Introduction" }]} />

          <div className="w-40 shrink-0 md:w-48">
            <PlaceholderMedia
              item={SITE.photo}
              fallbackLabel={`Foto pendiente — ${SITE.name}`}
              className="aspect-square w-full rounded-full"
              sizes="200px"
            />
          </div>

          <p className="font-mono text-xs uppercase tracking-widest2 text-cream/70">
            {SITE.name}
          </p>
        </div>

        <div className="flex-1 px-6 py-10 md:px-14 md:py-16">
          <Reveal>
            <h1 className="font-serif text-4xl uppercase leading-[0.95] md:text-6xl">
              <span className="text-cream">Quien</span>
              <br />
              <span className="text-lime">Soy?</span>
            </h1>
          </Reveal>

          <div className="mt-10 flex max-w-2xl flex-col gap-5 text-sm text-muted md:text-base">
            {BIO_PARAGRAPHS.map((paragraph, i) => (
              <Reveal key={i} delay={i * 90}>
                <p>{paragraph}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
