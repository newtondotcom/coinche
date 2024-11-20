import emitDistribution from '@/lib/emitter/distribution';
import { generateDeckCards } from '@/lib/utils/deck';
import genIdCuid from '@/lib/utils/gen_id';
import { supabase, toast } from '@/lib/utils/listener';

export async function translateStart(event: EventShared) {
    const playerId = event.value as string;
    startGame(playerId);
    return;
}

export async function startGame(playerId: string) {
    const storeGame = useGameStore();
    const storeAbout = useAboutStore();
    storeGame.setStatus('active');
    storeGame.setPlayerStartingId(playerId);
    storeGame.setCurrentPlayerId(playerId);
    if (storeAbout.isCreator) {
        await supabase.from('Events').insert([
            {
                id: await genIdCuid(),
                type: 'start_distribution',
                playerId: storeAbout.myId,
                gameId: storeAbout.gameId,
                value: 'idPlayerStarting',
            },
        ]);
        if (storeGame.team1_score === 0 && storeGame.team2_score === 0) {
            storeGame.setDeck(generateDeckCards());
        }
        await emitDistribution(storeAbout.myId);
    }
    toast({
        title: 'Game has started',
    });
}
