export function resolveImage(imgSrc) {
  return {
    layout: 'constrained',
    backgroundColor: '#8684cf',
    tranformOptions: { fit: 'cover', cropFocus: 'attention' },
    images: {
      fallback: {
        src: imgSrc,
        srcSet: imgSrc,
        sizes: '(min-width: 1000px) 1000px, 100vw',
      },
      sources: [
        {
          srcSet: imgSrc,
          type: 'image/webp',
          sizes: '(min-width: 1000px) 1000px, 100vw',
        },
      ],
    },
    width: 1000,
    height: 250,
  };
}
