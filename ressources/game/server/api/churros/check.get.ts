import { ArcticFetchError, OAuth2RequestError } from 'arctic';

import authentik from '../../authentik';

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const session = await useSession(event, {
        password: config.SESSION_PASSWORD,
    });
    const query = getQuery(event);
    const code = query.code as string;
    const codeVerifier = session.data.codeVerifier;
    // récupération du token
    try {
        const tokens = await authentik.validateAuthorizationCode(code, codeVerifier);
        const accessToken = tokens.accessToken();
        const accessTokenExpiresAt = tokens.accessTokenExpiresAt();
        const refreshToken = tokens.refreshToken();
        await session.update({
            accessToken,
            accessTokenExpiresAt,
            refreshToken,
        });
    } catch (e) {
        if (e instanceof OAuth2RequestError) {
            // Invalid authorization code, credentials, or redirect URI
            const code = e.code;
            console.log(code);
        }
        if (e instanceof ArcticFetchError) {
            // Failed to call `fetch()`
            const cause = e.cause;
            console.log(cause);
        }
    }
    return {
        hello: 'world',
    };
});
