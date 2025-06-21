import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: false },
  modules: ["shadcn-nuxt", "@pinia/nuxt", "@nuxt/eslint"],
  css: ["@/assets/css/tailwind.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  ssr: false,
  runtimeConfig: {
    CHURROS_CLIENT_ID: process.env.CHURROS_CLIENT_ID,
    CHURROS_CLIENT_SECRET: process.env.CHURROS_CLIENT_SECRET,
    SESSION_PASSWORD: process.env.SESSION_PASSWORD,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    public: {
      SUPABASE_URL: process.env.SUPABASE_URL,
      SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
      NODE_ENV: process.env.NODE_ENV,
      BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
    },
  },
  app: {
    head: {
      title: "Coinche.n7",
      meta: [
        { charset: "utf-8" },
        {
          name: "Le meilleur site de coinche en ligne",
          content: "Le meilleur site de coinche en ligne",
        },
      ],
      link: [{ rel: "icon", type: "image/png", href: "/carro.png" }],
    },
  },
});
