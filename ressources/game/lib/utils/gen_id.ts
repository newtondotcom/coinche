import { createId as cuid } from '@paralleldrive/cuid2';

export default async function genIdCuid(): Promise<string> {
    const id = cuid();
    return id;
}
