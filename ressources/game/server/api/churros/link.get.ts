import authentik from '~/server/authentik';
import { generateCodeVerifier, generateState } from 'arctic';

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const session = await useSession(event, {
        password: config.public.SESSION_PASSWORD,
    });
    const state = generateState();
    const codeVerifier = generateCodeVerifier();
    const scopes = ['openid', 'profile', 'email'];
    const url = authentik.createAuthorizationURL(state, codeVerifier, scopes);
    await session.update({
        codeVerifier: codeVerifier,
    });
    return {
        url,
    };
});
