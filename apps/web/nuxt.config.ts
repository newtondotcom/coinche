import "@coinche-reborn/env/web";
import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "latest",
  devtools: { enabled: false },
  modules: ["shadcn-nuxt", "@pinia/nuxt", "@nuxtjs/color-mode", "@nuxt/content"],
  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
    envPrefix: ["VITE_", "NUXT_PUBLIC_"],
  },
  devServer: {
    port: 3001,
  },
  ssr: false,
  shadcn: {
    prefix: "",
    componentDir: "@/components/ui",
  },
});
