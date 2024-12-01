import { ArcticFetchError, OAuth2RequestError } from 'arctic';

import authentik from '../../authentik';

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const session = await useSession(event, {
        password: config.SESSION_PASSWORD,
    });
    const accessTokenExpiresAt = session.data.accessTokenExpiresAt;
    if (accessTokenExpiresAt && new Date(accessTokenExpiresAt) < new Date()) {
        const refreshToken = session.data.refreshToken;
        try {
            const tokens = await authentik.refreshAccessToken(refreshToken);
            const accessToken = tokens.accessToken();
            const accessTokenExpiresAt = tokens.accessTokenExpiresAt();
            await session.update({
                accessToken,
                accessTokenExpiresAt,
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
    }
    return {
        hello: 'world',
    };
});
