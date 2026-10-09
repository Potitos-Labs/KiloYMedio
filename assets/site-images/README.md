# Imágenes de la interfaz

Copias de los logos, fondos, ilustraciones, animaciones y favicon originales, además de la imagen del equipo del README. Los archivos se conservan sin modificar y se sirven desde R2; no se empaquetan como archivos estáticos del Worker.

`manifest.json` relaciona las rutas originales con las claves de R2 y sus hashes. Verifica con `pnpm db:images --site --check` y restaura con `pnpm db:images --site --remote`. Usa `--all` para incluir también las demás colecciones.
