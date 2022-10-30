/**
 * Don't be scared of the generics here.
 * All they do is to give us autocompletion when using this.
 *
 * @template {import('next').NextConfig} T
 * @param {T} config - A generic parameter that flows through to the return type
 * @constraint {{import('next').NextConfig}}
 */
function defineNextConfig(config) {
  return config;
}

export default defineNextConfig({
  reactStrictMode: true,
  swcMinify: true,
  // Next.js i18n docs: https://nextjs.org/docs/advanced-features/i18n-routing
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "www.atida.com",
      "as01.epimg.net",
      "estaticos.muyinteresante.es",
      "www.mundorganico.co",
      "www.adonianatur.com",
      "http2.mlstatic.com",
      "cdn.shopify.com",
      "images.pexels.com",
      "i.pinimg.com",
      "cdn2.iconfinder.com",
      "kilo-y-medio.s3.eu-west-3.amazonaws.com",
      "www.pngall.com",
      "assets.stickpng.com",
      "sgfm.elcorteingles.es",
      "assets.jumpseller.com",
      "images.vexels.com",
      "us.123rf.com",
      "www.pngall.com",
      "img.freepik.com",
      "www.elhombredelsaco.eu",
      "us.123rf.com",
      "images-na.ssl-images-amazon.com",
      "www.vilmupa.com",
      "i.etsystatic.com",
      "los40.com",
      "ecologiautil.com",
      "www.frutasluisi.eu",
      "uxwing.com",
      "pbs.twimg.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
});
