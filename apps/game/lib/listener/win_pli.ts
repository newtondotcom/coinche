import { deformatTeam } from '@coinche/shared';
import type { EventInsert } from '@coinche/shared';

export async function translateWinPli(event: EventInsert) {
    const storeGame = useGameStore();
    const teamWinning: string[] = deformatTeam(event.value as string);
    storeGame.setNewPli();
    const text = `${teamWinning.join(' et ')} remportent le pli`;
    toast({
        title: 'Fin du pli',
        description: text,
    });
    return;
}
