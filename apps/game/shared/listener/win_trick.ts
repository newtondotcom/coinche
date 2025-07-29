import { deformatTeam } from '~/shared/utils/format';
import { toast } from 'vue-sonner';
import type { EventInsert } from '@coinche/shared';

export async function translateWinTrick(event: EventInsert) {
    const storeGame = useGameStore();
    const teamWinning: string[] = deformatTeam(event.value as string);
    storeGame.setNewTrick();
    const text = `${teamWinning.join(' et ')} remportent le pli`;
    toast.message('Fin du pli', {
        description: text,
    });
    return;
}