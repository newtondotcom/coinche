import { Authentik } from 'arctic';

const domain = 'auth.inpt.fr';
const config = useRuntimeConfig();

export default function getAuthentik(): Authentik {
    const devEnv = config.public.NODE_ENV !== 'production';
    const redirectUrl = devEnv ? 'http://localhost:3000/' : 'https://coinche-game.vercel.app/';
    const authentik = new Authentik(
        domain,
        config.CHURROS_CLIENT_ID,
        config.CHURROS_CLIENT_SECRET,
        redirectUrl + 'login',
    );
    return authentik;
}
