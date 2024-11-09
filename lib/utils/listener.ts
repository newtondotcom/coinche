import { useToast } from '@/components/ui/toast/use-toast';
import genIdCuid from '@/lib/supabase/gen';
import { createClient } from '@supabase/supabase-js';

import { deformatAnnonce, setNextPlayerTurn } from '../supabase/annonce';
import { deformatCarteToDistribute } from '../supabase/distribution';
import { deformatTeam, fetchLastPliEvents, sumPointsPli } from '../supabase/pli';
import { formatPoints, unformatPoints } from '../supabase/points';

const config = useRuntimeConfig();
const supabase = createClient(config.public.SUPABASE_URL, config.public.SUPABASE_ANON_KEY);

const { toast } = useToast();

async function translateAnnonce(event: EventShared) {
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
    const def = deformatCarteToDistribute(event.value as string);
    const card = def.card;
    const pli_number = def.pli_number;
    const player_id = event.playerId;
    const storeGame = useGameStore();
    const storePlayers = usePlayersStore();
    const storeAbout = useAboutStore();
    storeGame.addCardToPli(card, player_id);
    setNextPlayerTurn(player_id);
    return;
}

function translatePass(event: EventShared) {
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

function translateStart(event: EventShared) {
    const storeGame = useGameStore();
    const storeAbout = useAboutStore();
    // same logic applied in the io.ts file - to duplicate / refactor
    storeGame.setStatus('active');
    storeGame.setPlayerStartingId(event.value as string);
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
    return;
}

function translateError(event: EventShared) {
    return;
}

async function translateWinPli(event: EventShared) {
    const storeGame = useGameStore();
    const storeAbout = useAboutStore();
    const storePlayers = usePlayersStore();
    const teamWinning: string[] = deformatTeam(event.value as string);
    const pastPlis: IPlay[] = await fetchLastPliEvents();
    const points: number = sumPointsPli(pastPlis);
    const pointsMultiplier = storeGame.coinched ? 2 : storeGame.surcoinched ? 4 : 1;
    const teamWinningNumber = storePlayers.team1.find((player) => player.id === teamWinning[0])
        ? 1
        : 2;
    const scoreTeam1CurrentPli = teamWinningNumber === 1 ? points * pointsMultiplier : 0;
    const scoreTeam2CurrentPli = teamWinningNumber === 2 ? points * pointsMultiplier : 0;
    const scoreTeam1Global = storeGame.team1_score + scoreTeam1CurrentPli;
    const scoreTeam2Global = storeGame.team2_score + scoreTeam2CurrentPli;
    await supabase.from('Events').insert([
        {
            id: await genIdCuid(),
            type: 'score',
            playerId: storeAbout.myId,
            gameId: storeAbout.gameId,
            value: formatPoints(scoreTeam1Global, scoreTeam2Global),
        },
    ]);
    storeGame.setNewPli();
    toast({
        title: 'Fin du pli',
        description: `Equipe 1: ${storeGame.team1_point_current_pli} points\nEquipe 2: ${storeGame.team2_point_current_pli} points`,
    });
    return;
}

function translateWinGame(event: EventShared) {
    const storeGame = useGameStore();
    toast({
        title: 'Fin de partie',
        description: `Equipe 1: ${storeGame.team1_point_current_pli} points\nEquipe 2: ${storeGame.team2_point_current_pli} points`,
    });
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

async function translateStartDistribution(event: EventShared) {}

async function translateEndDistribution(event: EventShared) {
    const storeAbout = useAboutStore();
    storeAbout.setTimeToAnnonce(true);
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
        case 'score':
            return translatePoints(event);
        case 'start_distribution':
            return translateStartDistribution(event);
        case 'end_distribution':
            return translateEndDistribution(event);
        default:
            return '';
    }
}
