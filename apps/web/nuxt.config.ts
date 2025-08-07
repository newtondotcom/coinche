import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: 'latest',
  devtools: { enabled: false },
  modules: ['shadcn-nuxt', '@pinia/nuxt'],
  css: ['@/assets/css/main.css'],
  devServer: {
    port: 3001
  },
  ssr: false,
  runtimeConfig: {
    public: {
      serverURL: process.env.NUXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
    }
  },
  shadcn: {
    prefix: '',
    componentDir: './app/components/ui'
  },
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  app: {
    head: {
      title: 'Coinche',
      meta: [
        { name: 'description', content: 'Coinche' }
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/carro.png' }
      ]
    }
  }
})