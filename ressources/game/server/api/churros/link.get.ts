import { generateCodeVerifier, generateState } from 'arctic';

import authentik from '../../authentik';

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const session = await useSession(event, {
        password: config.SESSION_PASSWORD,
    });
    const state = generateState();
    const codeVerifier = generateCodeVerifier();
    const scopes = ['profile'];
    const url = authentik.createAuthorizationURL(state, codeVerifier, scopes);
    await session.update({
        codeVerifier: codeVerifier,
    });
    return {
        url,
    };
});
