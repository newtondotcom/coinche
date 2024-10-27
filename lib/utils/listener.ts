import { useToast } from '@/components/ui/toast/use-toast';

const storePlayers = usePlayersStore();
const storeGame = useGameStore();

const { toast } = useToast();

export function translateAnnonce(event: EventShared) {
    const value = event.value as IAnnonce;
    storeGame.setLastAnnonce(value);
    return `${event.value} annonce ${value.annonce}`;
}
export function translateCoinche(event: EventShared) {
    const value = event.value as IAnnonce;
    storeGame.setCoinched(true);
    return `${value} coinche`;
}
export function translateSurcoinche(event: EventShared) {
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

export function translateJoin(event: EventShared) {
    const { player, surname } = event.value;
    return `${event.playerId} join`;
}
export function translateLeave(event: EventShared) {
    const { player, surname } = event.value;
    return `${event.playerId} leave`;
}

export function translateStart(event: EventShared) {
    storeGame.setStatus('active');
    return `${event.value} start`;
}
export function translateEnd(event: EventShared) {
    storeGame.setStatus('complete');
    return `${event.value} end`;
}

export function translateStartPli(event: EventShared) {
    storeGame.setNewPli();
    return `${event.value} start pli`;
}
export function translateEndPli(event: EventShared) {
    storeGame.setCurrentPli([]);
    storePlayers.addScore(storeGame.game.team1_point_current_pli, storePlayers.players[0].id);
    storePlayers.addScore(storeGame.game.team1_point_current_pli, storePlayers.players[2].id);
    storePlayers.addScore(storeGame.game.team2_point_current_pli, storePlayers.players[1].id);
    storePlayers.addScore(storeGame.game.team2_point_current_pli, storePlayers.players[3].id);
    toast({
        title: 'Fin du pli',
        description: `Team 1: ${storeGame.game.team1_point_current_pli} points\nTeam 2: ${storeGame.game.team2_point_current_pli} points`,
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

export function translateEvent(event: EventShared) {
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
            return translateEnd(event);
        case 'start_pli':
            return translateStart(event);
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
