import { setValueAccordingToAtout } from '../deck';
import { supabase } from '../listener';

export async function translateStartPli(event: EventShared) {
    const storeGame = useGameStore();
    const storeAbout = useAboutStore();
    const storePlayers = usePlayersStore();
    const { data, error } = await supabase
        .from('Events')
        .select('*')
        .eq('gameId', storeAbout.gameId)
        .eq('type', 'start_game');
    if (error) {
        console.error('Game has not started:', error);
        return;
    }
    const playerIdStarting = data[0].value as string;
    storeGame.setCurrentPlayerId(playerIdStarting);
    console.log('start pli', event);
    // set cards value to atout
    storePlayers.players.forEach((player) => {
        player.hands = setValueAccordingToAtout(player.hands);
    });
    storeAbout.setTimeToAnnonce(false);
    return;
}
