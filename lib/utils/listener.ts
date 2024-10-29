import { useToast } from '@/components/ui/toast/use-toast';
import genIdCuid from '@/lib/supabase/gen';
import { createClient } from '@supabase/supabase-js';

import { deformatAnnonce } from '../supabase/annonce';

const config = useRuntimeConfig();
const supabase = createClient(config.public.SUPABASE_URL, config.public.SUPABASE_ANON_KEY);

const { toast } = useToast();

export async function translateAnnonce(event: EventShared) {
    const storeGame = useGameStore();
    const storePlayers = usePlayersStore();
    const annonce = deformatAnnonce(event.value as string, event.playerId);
    storePlayers.setLastAnnonce(annonce, event.playerId);
    const nextPlayerIndex =
        storePlayers.players.findIndex((player) => player.id === event.playerId) + 1;
    const nextPlayer = storePlayers.players[nextPlayerIndex % 4];
    storeGame.setCurrentPlayerId(nextPlayer.id);
    const playerName = storePlayers.players.find((player) => player.id === event.playerId)?.surname;
    if (annonce.annonce === 0) {
        toast({
            title: 'Passe',
            description: `${playerName} passe à ${storeGame.last_annonce.annonce} ${storeGame.last_annonce.suite}`,
        });
    } else {
        toast({
            title: 'Annonce',
            description: `${playerName} annonce ${annonce.annonce} ${annonce.suite}`,
        });
        storeGame.setLastAnnonce(annonce);
    }
    storeGame.addAnnonceToPli(annonce);
    return;
}
export function translateCoinche(event: EventShared) {
    const storePlayers = usePlayersStore();
    const storeGame = useGameStore();
    const storeAbout = useAboutStore();
    const value = event.value as IAnnonce;
    storeGame.setCoinched(true);
    return `${value} coinche`;
}
export function translateSurcoinche(event: EventShared) {
    const storePlayers = usePlayersStore();
    const storeGame = useGameStore();
    const storeAbout = useAboutStore();
    const value = event.value as IAnnonce;
    storeGame.setSurcoinched(true);
    return `${value} surcoinche`;
}

export function translatePlay(event: EventShared) {
    const value = event.value as ICard;
    return `${event.value} play ${value.value} of ${value.suite}`;
}

export function translatePass(event: EventShared) {
    return `${event.playerId} pass`;
}

export async function translateJoin(event: EventShared) {
    const storePlayers = usePlayersStore();
    const storeGame = useGameStore();
    const storeAbout = useAboutStore();
    if (storePlayers.players.find((player) => player.id === event.playerId)) {
        console.log('Player already in the game');
        return '';
    } else {
        const local: IPlayer = {
            id: event.playerId,
            surname: event.value as string,
            position: storePlayers.players.length as PlayerPosition,
            hands: [],
            classement: 0,
        };
        storePlayers.addPlayer(local);
        console.log('Addded player', local);
        if (storePlayers.players.length === 4) {
            storeGame.setStatus('active');
            if (storeAbout.isCreator) {
                const idPlayerStarting = storePlayers.players[0].id;
                storeGame.setPlayerStartingId(idPlayerStarting);
                await supabase.from('Events').insert([
                    {
                        id: await genIdCuid(),
                        type: 'start_game',
                        playerId: storeAbout.myId,
                        gameId: storeAbout.gameId,
                        value: idPlayerStarting, // value is the name of the player starting
                    },
                ]);
            }
        }
    }
    return `${event.playerId} join`;
}
export function translateLeave(event: EventShared) {
    const storePlayers = usePlayersStore();
    storePlayers.players = storePlayers.players.filter((player) => player.id !== event.playerId);
    return `${event.playerId} leave`;
}

export function translateStart(event: EventShared) {
    const storeGame = useGameStore();
    const storeAbout = useAboutStore();
    // same logic applied in the io.ts file - to duplicate / refactor
    storeGame.setStatus('active');
    storeGame.setPlayerStartingId(event.value as string);
    storeAbout.setTimeToAnnonce(true);

    return `${event.value} start`;
}
export function translateEnd(event: EventShared) {
    const storeGame = useGameStore();
    storeGame.setStatus('complete');
    return `${event.value} end`;
}

export async function translateStartPli(event: EventShared) {
    const storeGame = useGameStore();
    const storeAbout = useAboutStore();
    const { data, error } = await supabase
        .from('Events')
        .select('*')
        .eq('gameId', storeAbout.gameId)
        .eq('type', 'annonce');
    if (error) {
        console.error('Game has not started:', error);
        return;
    }
    const lastAnnounceNotPassed = data.find((event) => event.value.annonce !== 0);
    console.log('lastAnnounceNotPassed', lastAnnounceNotPassed);
    const annonceChosen: IAnnonce = deformatAnnonce(
        lastAnnounceNotPassed.value,
        lastAnnounceNotPassed.playerId,
    );
    storeGame.setLastAnnonce(annonceChosen);
    console.log('start pli', event);
    storeAbout.setTimeToAnnonce(false);
    storeGame.setNewPli();
    // coinche and not coinched
    return `${event.value} start pli`;
}
export function translateEndPli(event: EventShared) {
    const storePlayers = usePlayersStore();
    const storeGame = useGameStore();
    const storeAbout = useAboutStore();
    storeGame.setCurrentPli([]);
    storeGame.setTeam1Score(storeGame.team1_score + storeGame.team1_point_current_pli);
    storeGame.setTeam2Score(storeGame.team2_score + storeGame.team2_point_current_pli);
    toast({
        title: 'Fin du pli',
        description: `Team 1: ${storeGame.team1_point_current_pli} points\nTeam 2: ${storeGame.team2_point_current_pli} points`,
    });
    return `${event.value} end pli`;
}

export function translateError(event: EventShared) {
    return `${event.value} error`;
}

export function translateWinPli(event: EventShared) {
    return `${event.value} win pli`;
}
export function translateWinGame(event: EventShared) {
    return `${event.value} win game`;
}

export function translateDistribution(event: EventShared) {
    return `${event.value} distribution`;
}

export default function translateEvent(event: EventShared) {
    switch (event.type) {
        case 'annonce':
            return translateAnnonce(event);
        case 'coinche':
            return translateCoinche(event);
        case 'surcoinche':
            return translateSurcoinche(event);
        case 'play':
            return translatePlay(event);
        case 'pass':
            return translatePass(event);
        case 'end_game':
            return translateEnd(event);
        case 'start_game':
            return translateStart(event);
        case 'end_pli':
            return translateEndPli(event);
        case 'start_pli':
            return translateStartPli(event);
        case 'leave':
            return translateLeave(event);
        case 'join':
            return translateJoin(event);
        case 'error':
            return translateError(event);
        case 'win_pli':
            return translateWinPli(event);
        case 'win_game':
            return translateWinGame(event);
        case 'distribution':
            return translateDistribution(event);
        default:
            return '';
    }
}
