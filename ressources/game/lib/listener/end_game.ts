import { toast } from '@/lib/utils/listener';
import { deformatTeam } from '@coinche/shared';
import type { EventInsert } from '@coinche/shared';

export function translateEndGame(event: EventInsert) {
    const storePlayers = usePlayersStore();
    console.log('end_game', event);
    const teamWinning: string[] = deformatTeam(event.value as string);
    const teamWinningPlayers = storePlayers.players.filter((player) =>
        teamWinning.includes(player.id),
    );
    toast({
        title: 'Fin de la partie',
        description:
            'La partie est terminée : les gagnants sont ' +
            teamWinningPlayers.map((player) => player.surname).join(' et '),
    });

    /*
    setTimeout(()=>{
      navigateTo('/classement');
    },1000);
    */
    return;
}
