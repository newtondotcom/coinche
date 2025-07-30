import { createAuthClient } from "better-auth/vue";
import { genericOAuthClient } from "better-auth/client/plugins"

export default defineNuxtPlugin(nuxtApp => {
  const config = useRuntimeConfig()
  const serverUrl = config.public.serverURL

  const authClient = createAuthClient({
    baseURL: serverUrl,
    plugins: [
      genericOAuthClient()
    ]
  })

  return {
    provide: {
      authClient: authClient
    }
  }
})
