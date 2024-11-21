import { unformatPoints } from '@coinche/shared';
import type { EventShared } from '@coinche/shared';

export async function translatePoints(event: EventShared) {
    console.log('points', event);
    const storeGame = useGameStore();
    const storePlayers = usePlayersStore();
    const [scoreTeam1, scoreTeam2] = unformatPoints(event.value as string);
    storeGame.addScoreToTeam1(scoreTeam1);
    storeGame.addScoreToTeam2(scoreTeam2);
    if (storeGame.deck.length == 32) {
        const pointMultiplier = storeGame.coinched ? 2 : storeGame.surcoinched ? 4 : 1;
        const seuilAnnonce = storeGame.last_annonce;
        const teamAnnounced = storePlayers.team1.find(
            (player) => player.id === seuilAnnonce.playerId,
        )
            ? 1
            : 2;
        if (teamAnnounced === 1) {
            switch (seuilAnnonce.annonce) {
                case 'capot':
                    // TODO
                    break;
                case 'generale':
                    // TODO
                    break;
                default:
                    if (scoreTeam1 > seuilAnnonce.annonce) {
                        // annonce validée
                        storeGame.addGlobalScoreToTeam1(scoreTeam1 * pointMultiplier);
                    } else {
                        // annonce chutée
                        storeGame.addGlobalScoreToTeam2(scoreTeam1 * pointMultiplier);
                    }
            }
        } else {
            switch (seuilAnnonce.annonce) {
                case 'capot':
                    // TODO
                    break;
                case 'generale':
                    // TODO
                    break;
                default:
                    if (scoreTeam1 > seuilAnnonce.annonce) {
                        // annonce validée
                        storeGame.addGlobalScoreToTeam2(scoreTeam2 * pointMultiplier);
                    } else {
                        // annonce chutée
                        storeGame.addGlobalScoreToTeam1(scoreTeam2 * pointMultiplier);
                    }
            }
        }
    }
    return;
}
