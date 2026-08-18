# Portfolio — Leandro Fae

Sitio portfolio construido con Next.js (App Router) + TypeScript + Tailwind
CSS. Sistema de proyectos 100% modular: para agregar, quitar o modificar un
cliente/trabajo se edita únicamente `lib/projects.ts` (y `lib/collections.ts`
si algún día agregás una nueva etapa profesional). Ningún otro componente ni
página necesita tocarse.

## Cómo correrlo en tu máquina

Este archivo se escribió en un entorno sin acceso a internet, así que
todavía no tiene `node_modules` instalado. En tu computadora, con internet:

```bash
npm install
npm run dev
```

Abrí http://localhost:3000. Cualquier cambio en `lib/projects.ts` se refleja
al instante.

Para generar la versión de producción:

```bash
npm run build
npm run start
```

Se puede desplegar en Vercel, Netlify o cualquier hosting que soporte
Next.js — simplemente conectá el repositorio y usá el comando `npm run
build`.

Una vez que el sitio tenga un dominio real, configurá la variable de
entorno `NEXT_PUBLIC_SITE_URL` (ej: `https://brian.dev`) en tu hosting —
la usan `app/sitemap.ts` y `app/robots.ts` para generar las URLs
absolutas del sitemap.

## Estructura

```
app/
  page.tsx                        → Home: intro + las 4 etapas (WORK)
  work/[collection]/page.tsx      → Listado editorial de una etapa
  work/[collection]/[project]/page.tsx → Página de proyecto (01→06)
  about/page.tsx
  contact/page.tsx
components/                       → Piezas de UI reutilizables
lib/
  types.ts                        → Modelo de datos (Project, Collection)
  collections.ts                  → Las 4 etapas profesionales
  projects.ts                     → TODOS los proyectos/clientes (acá se edita)
  site.ts                         → Nombre, rol, contacto
public/work/                      → Fotos y videos reales de cada proyecto
```

## Cómo agregar un proyecto nuevo

Abrí `lib/projects.ts` y agregá un objeto al array `PROJECTS`, donde quieras
que aparezca dentro de su etapa (el orden en el array define el orden del
listado y la cadena de "siguiente proyecto"):

```ts
{
  slug: "nombre-del-cliente",       // se usa en la URL
  collection: "agencia-wedo",       // a qué etapa pertenece
  title: "Nombre Del Cliente",
  client: "Nombre Del Cliente",
  year: 2026,
  category: ["Content", "Photography"],
  description: "Descripción del trabajo realizado.",
  coverImage: { src: "/work/nombre-del-cliente/portada.jpg" },
  heroVideo: { src: "/work/nombre-del-cliente/video.mp4" },
  images: [
    { src: "/work/nombre-del-cliente/foto-01.jpg" },
    { src: "/work/nombre-del-cliente/foto-02.jpg" },
  ],
  // process y results son opcionales — si no los completás, esas
  // secciones simplemente no aparecen en la página del proyecto.
}
```

Ningún campo es obligatorio salvo `slug`, `collection`, `title` y
`category`. La web se adapta automáticamente al contenido disponible: si
falta `heroVideo`, no se muestra la sección de video; si falta `images`, no
se muestra la galería; si falta `process`, no se muestra "Proceso"; etc.

El proyecto nuevo aparece automáticamente:
- en el listado editorial de su etapa (`/work/<collection>`),
- en la cadena de "siguiente proyecto" de todo el sitio,
- con su propia página en `/work/<collection>/<slug>`.

No hace falta modificar ningún componente ni ninguna otra página.

## Cómo agregar una etapa/colección nueva

Abrí `lib/collections.ts` y agregá un objeto al array `COLLECTIONS` con un
`order` cronológico. Todas las etapas reciben exactamente el mismo
tratamiento visual — no hay forma de "destacar" una por sobre otra en este
sistema, a propósito.

## Placeholders

Mientras no exista contenido real, cada sección muestra un recuadro con un
texto que dice claramente "pendiente" (por ejemplo "Foto pendiente — Beerlin
01" o "Video pendiente — Napo"). No se inventa ninguna campaña, resultado,
foto ni dato de ningún cliente. Ver `public/work/README.txt` para la
convención de carpetas al subir material real.
