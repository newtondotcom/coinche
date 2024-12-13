import { Authentik } from 'arctic';
import type { H3Event } from 'h3';

const domain = 'auth.inpt.fr';
const config = useRuntimeConfig();

export default function getAuthentik(event: H3Event): Authentik {
    const origin = event.node.req.headers.referer || event.node.req.headers.referer || 'unknown';
    const redirectUrl = origin.includes('localhost')
        ? 'https://coinche-game.vercel.app/'
        : 'http://localhost:3000/';
    const authentik = new Authentik(
        domain,
        config.CHURROS_CLIENT_ID,
        config.CHURROS_CLIENT_SECRET,
        redirectUrl + 'login',
    );
    return authentik;
}
