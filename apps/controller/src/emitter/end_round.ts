import { findWinner } from '@/emitter/close_pli';
import { emitPointsRound } from '@/emitter/points_round';
import controller from '@/game';
import logger from '@/logger';

export async function emitEndRound(gameId: string) {
    const controllerInstance = controller.getInstance(gameId);
    const lastRound = controllerInstance.getLastRound();
    const pointMultiplier = lastRound.coinched ? 2 : lastRound.surcoinched ? 4 : 1;
    const seuilAnnonce = lastRound.last_annonce;
    const teamAnnounced = controllerInstance.isTeam1(seuilAnnonce.playerId) ? 1 : 2;

    const calculateCapotGeneraleScore = (annonce: string) => {
        const plis = lastRound.plis;
        let isSuccessful = true;

        plis.forEach((pli) => {
            const winnerPli = findWinner(pli.plays, gameId);
            if (
                (teamAnnounced === 1 && !controllerInstance.isTeam1(winnerPli)) ||
                (teamAnnounced === 2 && controllerInstance.isTeam1(winnerPli))
            ) {
                isSuccessful = false;
            }
        });

        if (isSuccessful) {
            return annonce === 'capot' ? 250 * pointMultiplier : 500 * pointMultiplier;
        }
        return 0;
    };

    const calculateDefaultScore = () => {
        const annonceValue =
            typeof seuilAnnonce.annonce === 'number'
                ? seuilAnnonce.annonce
                : parseInt(seuilAnnonce.annonce, 10);

        if (
            (teamAnnounced === 1 && lastRound.team1_point_current_game > annonceValue) ||
            (teamAnnounced === 2 && lastRound.team2_point_current_game > annonceValue)
        ) {
            // annonce validée
            return annonceValue * pointMultiplier;
        } else {
            // annonce chutée
            return -annonceValue * pointMultiplier;
        }
    };

    let scoreTeam1 = 0;
    let scoreTeam2 = 0;

    if (teamAnnounced === 1) {
        switch (seuilAnnonce.annonce) {
            case 'capot':
            case 'generale':
                scoreTeam1 = calculateCapotGeneraleScore(seuilAnnonce.annonce);
                break;
            default:
                scoreTeam1 = calculateDefaultScore();
                if (scoreTeam1 < 0) {
                    scoreTeam2 = -scoreTeam1;
                    scoreTeam1 = 0;
                }
                break;
        }
    } else {
        switch (seuilAnnonce.annonce) {
            case 'capot':
            case 'generale':
                scoreTeam2 = calculateCapotGeneraleScore(seuilAnnonce.annonce);
                break;
            default:
                scoreTeam2 = calculateDefaultScore();
                if (scoreTeam2 < 0) {
                    scoreTeam1 = -scoreTeam2;
                    scoreTeam2 = 0;
                }
                break;
        }
    }

    logger.info(`Score de ${scoreTeam1} à ${scoreTeam2}`);
    controllerInstance.game.team1_score += scoreTeam1;
    controllerInstance.game.team2_score += scoreTeam2;
    await emitPointsRound(scoreTeam1, scoreTeam2, gameId);
}
