# Kilo y Medio

Proyecto universitario de tienda ecológica: catálogo, carrito y pedidos de demostración, recetas, comentarios, perfiles y talleres. Conserva las páginas, componentes, estilos y contenido del proyecto original.

Demo publicada: [kilo-y-medio.danields.dev](https://kilo-y-medio.danields.dev).

## Stack actualizado

Next.js 16.3.8 (Pages Router), React 18, tRPC 10 estable, NextAuth con correo y contraseña, Prisma 6 y Cloudflare D1. OpenNext adapta la aplicación a Workers; todas las imágenes se guardan en R2. Tailwind 3 y DaisyUI 2 conservan el diseño original. Next.js está fijado a la versión compatible con OpenNext; la 16.4.0 compilaba pero fallaba al servir páginas en Workers. Gestor de paquetes: pnpm 12; Node.js 24.

El pago sigue siendo una simulación: no hay Stripe, cobros, almacenamiento ni envío de números de tarjeta/CVV al servidor. Utiliza datos ficticios para probarlo.

## Desarrollo local

```sh
pnpm install --frozen-lockfile
cp .env.example .env
cp .dev.vars.example .dev.vars
```

Configura `NEXTAUTH_SECRET` con un valor privado aleatorio y `SEED_ADMIN_PASSWORD` con una contraseña privada de 12–128 caracteres. Puedes generar valores con `openssl rand -base64 32`. Para `pnpm dev`, utiliza `NEXTAUTH_URL=http://localhost:3000` en ambos archivos.

```sh
pnpm db:migrate
pnpm db:seed
pnpm db:images --all
pnpm dev
```

Wrangler emula D1 y R2 localmente; no necesitas una cuenta para desarrollar. Ya no se utiliza Docker/MySQL. El seed carga los 8 perfiles, 28 productos, 12 recetas y 11 talleres originales. Los cinco administradores usan `SEED_ADMIN_PASSWORD`; los clientes del seed conservan `potitos2022`. Los nombres, correos y roles se mantienen. El acceso por correo ignora diferencias de mayúsculas.

El seed no borra datos: se ejecuta sobre una base vacía y registra una marca al finalizar. Ejecutarlo nuevamente después de completarlo no modifica nada. Si una carga falla a medias, restaura una copia o utiliza una nueva base local; no se reinicia automáticamente.

Los 28 productos tienen fotos generadas para la demo, servidas desde R2. Las copias están en [`assets/seed-products/`](assets/seed-products/README.md), fuera de `public` y del paquete de Workers. El manifiesto conserva los prompts, las URLs originales y hashes de integridad. `pnpm db:images --check` verifica las copias; `pnpm db:images --remote` permite restaurarlas en Cloudflare. Sube las imágenes antes de aplicar la migración `0005_seed_product_images.sql`, que conserva las fotos modificadas desde administración.

Las 12 recetas también tienen copias en [`assets/seed-recipes/`](assets/seed-recipes/README.md): 8 imágenes originales descargadas sin modificar y 4 generadas para los enlaces inaccesibles. Se sirven desde R2 y quedan fuera de Workers. Usa `pnpm db:images --recipes --check` para verificarlas y `pnpm db:images --all --remote` para restaurarlas antes de aplicar `0006_seed_recipe_images.sql`. El manifiesto conserva la procedencia, los créditos visibles y los prompts de las fotos generadas.

Los medios restantes están en [`assets/seed-media/`](assets/seed-media/README.md) y [`assets/site-images/`](assets/site-images/README.md). `pnpm db:images --all --check` comprueba todas las copias; `pnpm db:images --all --remote` las restaura en R2. Para subir sólo estas colecciones usa `--media` o `--site`. Aplica `0007_r2_media.sql` después de subirlas; conserva imágenes personalizadas y normaliza el avatar por defecto sin reconstruir la tabla de usuarios. Los formularios sólo aceptan rutas de imágenes de R2 y Next.js ya no contiene `remotePatterns`.

## Verificar el Worker

```sh
pnpm lint
pnpm test
pnpm build:worker
pnpm exec wrangler deploy --dry-run --outdir .seed/worker
```

Para probar el entorno real de Workers, cambia `NEXTAUTH_URL` en `.dev.vars` a `http://localhost:8787` y ejecuta `pnpm preview` después de compilar. Detén `pnpm dev` antes de abrir el preview: ambos utilizan la misma base local y ejecutar los dos emuladores a la vez puede provocar errores de D1. La compilación no necesita una base de datos poblada: las consultas de páginas se ejecutan cuando llega la petición.

Validación de la migración (9 de octubre de 2026): lint y TypeScript correctos, 25 pruebas pasando y 1 prueba histórica pendiente, 5 pruebas de navegador pasando sobre el Worker. La comprobación de publicación sin desplegar genera un Worker de unos 2,4 MiB comprimidos. El Worker está publicado en `kilo-y-medio.danields.dev`, con dominio personalizado y HTTPS. La base D1 y el bucket R2 están configurados en `wrangler.jsonc`. Las credenciales privadas del despliegue se guardan sólo en `.env.deploy.local` (ignorado por Git); la clave de sesión también está guardada como secreto del Worker.

Comprobaciones del despliegue: inicio, catálogo, recetas, talleres y login responden con HTTPS; el catálogo remoto contiene 28 productos; acceso de administración y subida/lectura en R2 correctos; tres pruebas de navegador pasan contra el dominio público. La imagen temporal usada en la verificación se elimina del bucket.

Comprobación de imágenes: 89 copias respaldadas y verificadas mediante SHA-256 desde el dominio; 83 referencias de D1 apuntan a R2 y ninguna imagen se empaqueta en los archivos estáticos de Workers. La lectura de R2 usa streaming, con tipo de contenido, tamaño y ETag originales. Durante la comprobación masiva se observó un error puntual 1102 por límites de Workers Free; una repetición funcionó. El streaming reduce el trabajo y la memoria al servir imágenes, pero el límite de CPU del plan gratuito sigue aplicándose a la aplicación.

Las pruebas de integración usan D1 real en el emulador con almacenamiento temporal independiente. Comprueban el seed, hashes, permisos, respuestas públicas, precios, idempotencia del pedido y rollback cuando cambia el stock.

`pnpm test:e2e` ejecuta las pruebas actuales de catálogo, acceso, registro, subida a R2 y compra simulada. `pnpm test:e2e:legacy` conserva la suite histórica de la universidad, que contiene expectativas y fixtures antiguos. Para usar un servidor existente configura `PLAYWRIGHT_TEST_BASE_URL`. Para probar administración configura `SEED_ADMIN_PASSWORD` con el mismo valor usado al cargar la base.

## Desplegar en Cloudflare

Para actualizar el despliegue existente, utiliza `pnpm deploy`; no vuelvas a crear los recursos ni a regenerar secretos. Aplica las nuevas migraciones con `pnpm db:migrate:remote` cuando existan. El seed terminado no se vuelve a cargar.

Para instalar otra instancia:

1. Autentícate con `pnpm exec wrangler login`. Activa R2 en el panel de tu cuenta antes de crear el bucket.
2. Crea los recursos propios del proyecto:

```sh
pnpm exec wrangler d1 create kilo-y-medio
pnpm exec wrangler r2 bucket create kilo-y-medio-images
```

3. Configura `account_id`, nombres de recursos y `database_id` de `wrangler.jsonc` con los valores de tu nueva instancia. Configura `NEXTAUTH_URL` con la URL pública definitiva y `NEXTJS_ENV=production`. El binding `WORKER_SELF_REFERENCE` debe coincidir con el nombre del Worker.
4. Carga el esquema y configura el secreto de sesión:

```sh
pnpm db:migrate:remote
pnpm exec wrangler secret put NEXTAUTH_SECRET
```

5. Para cargar el seed remoto configura `CLOUDFLARE_ACCOUNT_ID`, `CLOUDFLARE_API_TOKEN` (permiso de escritura D1) y `SEED_ADMIN_PASSWORD` en tu entorno privado. Después:

```sh
pnpm db:seed:remote
pnpm db:images --remote
pnpm db:images --all --remote
pnpm deploy
```

No publiques la contraseña del administrador ni los secretos en el repositorio. No se necesitan cuentas de Google, Stripe, Supabase o AWS.

La compilación se comprueba con el límite de tamaño de Workers Free. El nivel gratuito también tiene límites de CPU, peticiones y consultas: no garantiza coste cero para cualquier tráfico. R2 tiene uso gratuito incluido y facturación al superarlo; revisa su activación y límites en tu cuenta. Referencias: [Workers](https://developers.cloudflare.com/workers/platform/limits/), [D1](https://developers.cloudflare.com/d1/platform/pricing/), [R2](https://developers.cloudflare.com/r2/pricing/).

## Cambios y límites conocidos

- Contraseñas con PBKDF2-SHA256 y sal aleatoria, mediante Web Crypto compatible con Workers. Los administradores ya no utilizan la contraseña compartida del seed antiguo.
- Listado de usuarios privado; perfiles restringidos a su propietario/administración; las recetas públicas sólo devuelven los datos públicos del autor.
- Creación de productos reservada a administración. Sólo el autor o un administrador puede editar/borrar una receta.
- Cantidades positivas, stock en kilos/litros convertido a gramos/mililitros al seleccionar cantidades, stock comprobado e importes calculados igual que en el carrito. Crear pedido, descontar stock y vaciar carrito se ejecutan juntos con `D1.batch`; no se utiliza `$transaction` de Prisma, cuyo adaptador D1 no ofrece esas garantías.
- Subidas de PNG/JPEG de hasta 1 MB, autenticadas y con comprobación del contenido. Hasta 20 imágenes por usuario de la demo. Login, registro y subidas tienen límites de solicitudes; los identificadores de IP se guardan como hashes temporales.
- Se corrige la carga de datos y selección de alérgenos al editar el perfil. La recuperación de contraseña y el boletín siguen siendo elementos visuales sin servicio de envío.
- Los talleres originales conservan sus fechas; no se permite inscribirse en eventos pasados o sin plazas.
- Todas las imágenes se sirven desde R2: productos, recetas, talleres, categorías, perfiles, comentarios, logos, fondos y animaciones. Las copias están en `assets/`, fuera de `public` y de Workers. Los enlaces originales sólo se conservan como procedencia en los manifiestos y en el historial de migraciones. Las categorías del Supabase desaparecido usan fotos del catálogo; los perfiles usan el avatar neutro original recuperado. Los vídeos de talleres siguen en YouTube.
- La auditoría de dependencias tiene dos avisos transitivos sin versión corregida publicada: [`braces`](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm) (alto, cadena de compilación Tailwind) y [`sprintf-js`](https://github.com/advisories/GHSA-hp3w-g68c-fv3c) (moderado, herramientas de OpenNext/dotenv). Se mantienen para conservar compatibilidad; no se aceptan patrones ni formatos suministrados por visitantes en esas herramientas. `pnpm audit` sigue devolviendo estos avisos: no se ocultan ni se presenta el proyecto como libre de vulnerabilidades.
- Se conservan los datos del equipo a petición del propietario. El registro y las funciones de cliente siguen activos; el catálogo se administra con credenciales privadas. No hay reinicio periódico ni borrado automático de la demo.

## Equipo

<a href="https://github.com/Potitos-Labs/KiloYMedio/graphs/contributors">
  <img src="https://kilo-y-medio.danields.dev/api/images/site/b4ecb215-97c3-0c70-95c7-2e4dc393f439.svg" />
</a>
