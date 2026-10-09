# Imágenes de las recetas del seed

Copias de las 12 recetas, preparadas el 9 de octubre de 2026: 8 imágenes descargadas de las URLs originales y 4 creadas con la herramienta integrada `image_gen`.

Las imágenes descargadas conservan los bytes JPEG originales, sus dimensiones y los créditos visibles. `manifest.json` registra las URLs de procedencia, hashes SHA-256 y claves de R2. Para las cuatro generadas también conserva el prompt completo y el motivo por el que la URL anterior no estaba disponible. Estas copias están fuera de `public` y excluidas de Workers en `next.config.mjs`; la aplicación las sirve desde R2 por `/api/images/recipes/<id>.jpg`.

Fotos generadas: gachas dulces andaluzas al anís (error de certificado del origen), pan de pueblo tradicional (404), tarta de zanahoria con nueces (403) y queso vegano de anacardos (dominio del antiguo Supabase sin resolución DNS). Se guardan en JPEG, calidad 90 y resolución original, sin recortes.

Desde la raíz del proyecto:

```sh
pnpm db:images --recipes --check
pnpm db:images --recipes          # Restaurar las 12 imágenes en R2 local
pnpm db:images --recipes --remote # Restaurar las 12 imágenes en Cloudflare
```

Sube las imágenes antes de aplicar `0006_seed_recipe_images.sql`. La migración cambia las URLs originales de estas recetas y conserva las imágenes editadas por sus autores. Las bases nuevas cargan directamente las URLs de R2 desde el seed.
