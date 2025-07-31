import { v6 as uuidv6 } from 'uuid';

export async function genIdCuid(): Promise<string> {
    const id = uuidv6();
    return id;
}
