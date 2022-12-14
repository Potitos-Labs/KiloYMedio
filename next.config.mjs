import bundleAnalyzer from "@next/bundle-analyzer";

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

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
  openAnalyzer: true,
});

export default withBundleAnalyzer(
  defineNextConfig({
    reactStrictMode: true,
    swcMinify: true,
    // Next.js i18n docs: https://nextjs.org/docs/advanced-features/i18n-routing
    i18n: {
      locales: ["en"],
      defaultLocale: "en",
    },
    images: {
      domains: [
        "www.elgraneldecorredera.com",
        "www.gastronomiavasca.net",
        "fruitsec.cat",
        "lh3.googleusercontent.com",
        "www.atida.com",
        "as01.epimg.net",
        "estaticos.muyinteresante.es",
        "www.mundorganico.co",
        "www.adonianatur.com",
        "http2.mlstatic.com",
        "cdn.shopify.com",
        "images.pexels.com",
        "i.pinimg.com", //tarta
        "cdn2.iconfinder.com",
        "kilo-y-medio.s3.eu-west-3.amazonaws.com",
        "www.pngall.com",
        "assets.stickpng.com",
        "sgfm.elcorteingles.es",
        "assets.jumpseller.com",
        "images.vexels.com",
        "us.123rf.com",
        "img.freepik.com",
        "www.elhombredelsaco.eu",
        "images-na.ssl-images-amazon.com",
        "www.vilmupa.com",
        "i.etsystatic.com",
        "ecologiautil.com", //index de category antiguo
        "www.frutasluisi.eu",
        "uxwing.com", //avaar en ver perfil
        "www.kindpng.com", //default img user
        "grjkjrkjpycphptekssf.supabase.co",
        "shields.io",
        "i.blogs.es", //pasta italiana y más
        "t2.uc.ltmcdn.com", //gachas
        "www.tapasmagazine.es", //sándwich
        "cecotec.es",
        "pinchofyum.com", //lentejas cremosas
        "www.laespanolaaceites.com", //espaguetis boloñesa
        "www.comedera.com", //pan pueblo
        "imagesvc.meredithcorp.io", //paella
        "www.guatemala.com", //tarta zanahoria
        "www.elespectador.com", //repostería
        "imag.bonviveur.com", //cocina japo
        "assets.recipes.prod.wpsandwatch.com", //galletas
        "canalcocina.es", //taller online
        "filesedc.com", //taller online
        "images.hola.com", //talleres online
        "www.cocinista.es", //talleres online
        "www.iberdrola.com", //talleres online
        "www.barcelonaculinaryhub.com",
      ],
    },
  }),
);
