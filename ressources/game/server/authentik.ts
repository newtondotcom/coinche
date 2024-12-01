import { Authentik } from 'arctic';

const domain = 'auth.inpt.fr';
const config = useRuntimeConfig();

const authentik = new Authentik(
    domain,
    config.CHURROS_CLIENT_ID,
    config.CHURROS_CLIENT_SECRET,
    'http://localhost:3000/api/churros',
);

export default authentik;
