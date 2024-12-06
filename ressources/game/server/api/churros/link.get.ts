import authentik from '~/server/authentik';
import { generateCodeVerifier, generateState } from 'arctic';

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const session = await useSession(event, {
        password: config.SESSION_PASSWORD,
    });
    const state = generateState();
    const codeVerifier = generateCodeVerifier();
    const scopes = ['openid', 'profile', 'preferred_username'];
    const url = authentik.createAuthorizationURL(state, codeVerifier, scopes);
    await session.update({
        codeVerifier: codeVerifier,
    });
    return {
        url,
    };
});
