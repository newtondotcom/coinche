import type { EventInsert } from '@coinche/shared';

export async function translateStart(event: EventInsert) {
    const storeGame = useGameStore();
    storeGame.setNewRound();
    toast({
        title: `${event.value} commence le jeu`,
    });
    return;
}
