# Fotos del catálogo del seed

Las 28 fotos se generaron con la herramienta integrada `image_gen` el 9 de octubre de 2026. Son imágenes ilustrativas para la demo, con fondo claro, luz suave y productos sin marcas. No son fotografías recuperadas del proyecto original.

Esta carpeta conserva las copias en JPEG, calidad 90 y resolución original, sin recortes. Está fuera de `public` y excluida de los archivos del servidor en `next.config.mjs`: no se incorpora a Workers ni a sus assets estáticos. Las fotos de la web se guardan en R2 y se sirven por `/api/images/seed/<id>.jpg`.

`manifest.json` contiene el prompt completo de cada foto, el producto correspondiente, su URL anterior, la clave de R2, dimensiones y SHA-256. Las claves derivan del contenido para evitar reutilizar una URL con una foto distinta bajo la caché inmutable.

Desde la raíz del proyecto:

```sh
pnpm db:images --check       # Verifica las 28 copias sin subir nada
pnpm db:images               # Restaura las fotos en R2 local
pnpm db:images --remote      # Restaura las fotos en el bucket de Cloudflare
```

La subida remota usa la sesión de Wrangler y el bucket `IMAGES_BUCKET` configurado en `wrangler.jsonc`. Ejecuta la subida antes de aplicar la migración `0005_seed_product_images.sql`. Esta migración sólo sustituye URLs originales de los productos del seed; conserva las fotos que se hayan editado desde administración. Las bases nuevas cargan directamente las nuevas URLs al ejecutar el seed.
