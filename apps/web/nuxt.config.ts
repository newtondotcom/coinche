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
  },
  nitro: {
    output: {
      dir: "dist",
    },
  },
  devServer: {
    port: 3001,
  },
  ssr: false,
  runtimeConfig: {
    public: {
      serverUrl: process.env.NUXT_PUBLIC_SERVER_URL,
    },
  },
  shadcn: {
    prefix: "",
    componentDir: "@/components/ui",
  },
});
