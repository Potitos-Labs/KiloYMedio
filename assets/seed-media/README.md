# Imágenes de talleres, perfiles y categorías

Estas copias se restauran en R2 con `pnpm db:images --media --remote` y se verifican con `pnpm db:images --media --check`. Están fuera de `public` y se excluyen del Worker.

El manifiesto conserva los hashes, tipos de contenido, URLs de origen y las 43 referencias migradas en D1. Se descargaron sin modificar seis fotos de talleres, el avatar neutro original y un icono del código histórico de checkout. Los cuatro enlaces de talleres inaccesibles se sustituyeron con fotos generadas mediante el `image_gen` integrado; el manifiesto incluye sus prompts. Reciclaje y el taller de alérgenos compartían imagen en el seed original y siguen compartiéndola.

El antiguo Supabase no resuelve. Las categorías reutilizan imágenes de productos representativos respaldados en `assets/seed-products/`; perfiles y comentarios usan el avatar neutro recuperado. Los nombres y el resto de datos se conservan.
