import { useToast } from '@/components/ui/toast/use-toast';
import genIdCuid from '@/lib/supabase/gen';
import { createClient } from '@supabase/supabase-js';

import { deformatAnnonce, setNextPlayerTurn } from '../supabase/annonce';
import emitDistribution, { deformatCarteToDistribute } from '../supabase/distribution';
import { deformatTeam, fetchLastPliEvents, sumPointsPli } from '../supabase/pli';
import { emitPoints, formatPoints, unformatPoints, unformatPointsPli } from '../supabase/points';
import { generateDeckCards } from './deck';
import { assertPliNumber } from './utils';

const config = useRuntimeConfig();
const supabase = createClient(config.public.SUPABASE_URL, config.public.SUPABASE_ANON_KEY);

const { toast } = useToast();

async function translateAnnonce(event: EventShared) {
    const storeGame = useGameStore();
    const storePlayers = usePlayersStore();
    const annonce = deformatAnnonce(event.value as string, event.playerId);
    storePlayers.setLastAnnonce(annonce, event.playerId);
    setNextPlayerTurn(event.playerId);
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
function translateCoinche(event: EventShared) {
    const storePlayers = usePlayersStore();
    const storeGame = useGameStore();
    const value = event.value as IAnnonce;
    storeGame.setCoinched(true);
    const lastAnnoncePlayer = storePlayers.players.find(
        (player) => player.id === storeGame.last_annonce.playerId,
    );
    const playerCoinche = storePlayers.players.find((player) => player.id === event.playerId);
    toast({
        title: 'Coinche',
        description: `${playerCoinche?.surname} coinche ${lastAnnoncePlayer?.surname} à ${value.annonce} ${value.suite}`,
    });
    return;
}
function translateSurcoinche(event: EventShared) {
    const storePlayers = usePlayersStore();
    const storeGame = useGameStore();
    const value = event.value as IAnnonce;
    const lastAnnoncePlayer = storePlayers.players.find(
        (player) => player.id === storeGame.last_annonce.playerId,
    );
    const playerCoinche = storePlayers.players.find((player) => player.id === event.playerId);
    toast({
        title: 'Coinche',
        description: `${playerCoinche?.surname} coinche ${lastAnnoncePlayer?.surname} à ${value.annonce} ${value.suite}`,
    });
    storeGame.setSurcoinched(true);
    return;
}

function translatePlay(event: EventShared) {
    const storeGame = useGameStore();
    const def = deformatCarteToDistribute(event.value as string);
    const card = def.card;
    const pli_number = def.pli_number;
    assertPliNumber(pli_number, storeGame.pli_number);
    const player_id = event.playerId;
    storeGame.addCardToPliAndRemove(card, player_id);
    setNextPlayerTurn(player_id);
    return;
}

async function translateJoin(event: EventShared) {
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
    return;
}
function translateLeave(event: EventShared) {
    const storePlayers = usePlayersStore();
    storePlayers.players = storePlayers.players.filter((player) => player.id !== event.playerId);
    return;
}

async function translateStart(event: EventShared) {
    const storeGame = useGameStore();
    const storeAbout = useAboutStore();
    // same logic applied in the io.ts file - to duplicate / refactor
    storeGame.setStatus('active');
    storeGame.setPlayerStartingId(event.value as string);
    storeGame.setCurrentPlayerId(event.value as string);
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
        storeGame.setDeck(generateDeckCards());
        await emitDistribution(storeAbout.myId);
    }
    toast({
        title: 'Game has started',
    });
    return;
}
function translateEnd(event: EventShared) {
    const storeGame = useGameStore();
    storeGame.setStatus('complete');
    return;
}

async function translateStartPli(event: EventShared) {
    const storeGame = useGameStore();
    const storeAbout = useAboutStore();
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
    storeAbout.setTimeToAnnonce(false);
    return;
}

function translateError(event: EventShared) {
    return;
}

async function translateWinPli(event: EventShared) {
    const storeGame = useGameStore();
    const storePlayers = usePlayersStore();
    const teamWinning: string[] = deformatTeam(event.value as string);
    const pastPlis: IPlay[] = await fetchLastPliEvents();
    const points: number = sumPointsPli(pastPlis);
    const teamWinningNumber = storePlayers.team1.find(
        (player) => player.id === teamWinning[0] || player.id === teamWinning[1],
    )
        ? 1
        : 2;
    const scoreTeam1CurrentPli = teamWinningNumber === 1 ? points : 0;
    const scoreTeam2CurrentPli = teamWinningNumber === 2 ? points : 0;
    storeGame.setTeam1Score(storeGame.team1_score + scoreTeam1CurrentPli);
    storeGame.setTeam2Score(storeGame.team2_score + scoreTeam2CurrentPli);
    storeGame.setNewPli();
    toast({
        title: 'Fin du pli',
        description: `Equipe 1: ${storeGame.team1_point_current_pli} points\nEquipe 2: ${storeGame.team2_point_current_pli} points`,
    });
    return;
}

async function translateWinGame(event: EventShared) {
    const storeGame = useGameStore();
    const storeAbout = useAboutStore();
    const storePlayers = usePlayersStore();
    const pointsMultiplier = storeGame.coinched ? 2 : storeGame.surcoinched ? 4 : 1;
    const { data, error } = await supabase
        .from('Events')
        .select('*')
        .eq('gameId', storeAbout.gameId)
        .eq('type', 'score_pli');
    if (error) {
        console.error('Game has not started:', error);
        return;
    }
    const scoreTeam1 = data.filter((event) => unformatPointsPli(event.value)[0] === 1);
    const pointsTeam1 = scoreTeam1.map((event) => unformatPointsPli(event.value)[1]);
    const sum1 = pointsTeam1.reduce((a, b) => a + b, 0);
    const scoreTeam2 = data.filter((event) => unformatPointsPli(event.value)[0] === 2);
    const pointsTeam2 = scoreTeam2.map((event) => unformatPointsPli(event.value)[1]);
    const sum2 = pointsTeam2.reduce((a, b) => a + b, 0);
    const annonceMade = storeGame.last_annonce;
    const playerId = annonceMade.playerId;
    const teamPlayerAnnounce = storePlayers.team1.find((player) => player.id === playerId) ? 1 : 2;
    if (annonceMade.annonce == 'capot') {
    }
    if (annonceMade.annonce == 'generale') {
    }
    if (teamPlayerAnnounce === 1) {
        if (sum1 > annonceMade.annonce) {
            // annonce validée
            // =+ points * pointsMultiplier
        } else {
            // annonce non validée
        }
    } else {
    }
    await emitPoints(sum1, sum2);
    toast({
        title: 'Fin de partie',
        description: `Equipe 1: ${sum1} points marqués\nEquipe 2: ${sum2} points marqués`,
    });
    // shift the player starting and cut the deck
    await supabase.from('Events').insert([
        {
            id: await genIdCuid(),
            type: 'start_distribution',
            playerId: storeAbout.myId,
            gameId: storeAbout.gameId,
            value: formatPoints(scoreDuringGame1, scoreDuringGame2),
        },
    ]);
    return;
}

function translateDistribution(event: EventShared) {
    const storePlayers = usePlayersStore();
    const storeGame = useGameStore();
    const { pli_number, card } = deformatCarteToDistribute(event.value as string);
    if (pli_number !== storeGame.pli_number) {
        console.error('Pli number not matching');
        return;
    }
    const player_id = event.playerId;
    const player = storePlayers.players.find((p) => p.id === player_id);
    if (player) {
        player.hands.push(card);
    } else {
        console.error('Player not found');
    }
    return;
}

async function translatePoints(event: EventShared) {
    const storeGame = useGameStore();
    const [scoreTeam1, scoreTeam2] = unformatPoints(event.value as string);
    storeGame.setTeam1Score(scoreTeam1);
    storeGame.setTeam2Score(scoreTeam2);
    return;
}

async function translatePointsPli(event: EventShared) {}

async function translateStartDistribution(event: EventShared) {
    console.log('start distribution', event);
    const storeAbout = useAboutStore();
    storeAbout.setTimeDistrib(true);
}

async function translateEndDistribution(event: EventShared) {
    console.log('end distribution', event);
    const storeAbout = useAboutStore();
    storeAbout.setTimeDistrib(false);
    storeAbout.setTimeToAnnonce(true);
}

export default async function translateEvent(event: EventShared) {
    switch (event.type) {
        case 'annonce':
            return await translateAnnonce(event);
        case 'coinche':
            return await translateCoinche(event);
        case 'surcoinche':
            return await translateSurcoinche(event);
        case 'play':
            return await translatePlay(event);
        case 'end_game':
            return await translateEnd(event);
        case 'start_game':
            return await translateStart(event);
        case 'start_pli':
            return await translateStartPli(event);
        case 'leave':
            return await translateLeave(event);
        case 'join':
            return await translateJoin(event);
        case 'error':
            return await translateError(event);
        case 'win_pli':
            return await translateWinPli(event);
        case 'win_game':
            return await translateWinGame(event);
        case 'distribution':
            return await translateDistribution(event);
        case 'score':
            return await translatePoints(event);
        case 'score_pli':
            return await translatePointsPli(event);
        case 'start_distribution':
            return await translateStartDistribution(event);
        case 'start_annonce':
            return await translateEndDistribution(event);
        default:
            return '';
    }
}
