Convención de carpetas para material real de cada proyecto:

  /public/work/<slug-de-proyecto>/portada.jpg
  /public/work/<slug-de-proyecto>/video.mp4
  /public/work/<slug-de-proyecto>/foto-01.jpg
  /public/work/<slug-de-proyecto>/foto-02.jpg
  ...

El <slug-de-proyecto> es el mismo "slug" que usaste en lib/projects.ts
(por ejemplo: beerlin, napo, loff, al-fuego).

Una vez que subas los archivos acá, volvé a lib/projects.ts y completá el
campo "src" correspondiente, por ejemplo:

  coverImage: { src: "/work/beerlin/portada.jpg" },
  heroVideo: { src: "/work/beerlin/video.mp4" },
  images: [
    { src: "/work/beerlin/foto-01.jpg" },
    { src: "/work/beerlin/foto-02.jpg" },
  ],

No hace falta tocar ningún componente: en cuanto el campo "src" existe,
la web muestra el contenido real en lugar del placeholder.
