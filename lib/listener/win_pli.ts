import { deformatTeam } from '@/lib/emitter/pli';
import { toast } from '@/lib/utils/listener';

export async function translateWinPli(event: EventShared) {
    const storeGame = useGameStore();
    const storePlayers = usePlayersStore();
    const teamWinning: string[] = deformatTeam(event.value as string);
    storeGame.setPlayerStartingId(teamWinning[0]);
    storeGame.setCurrentPlayerId(teamWinning[0]);
    const teamWinningPlayers = storePlayers.players.filter((player) =>
        teamWinning.includes(player.id),
    );
    storeGame.setNewPli();
    const text = `${teamWinningPlayers.map((player) => player.surname).join(' et ')} remportent le pli`;
    /*
    toast({
        title: 'Fin du pli',
        description: text,
    });
    */
    return;
}
