import logger from "./logger";

export default class Master {
  game: IGame;

  addPlay(card: ICard, playerId: string) {
    this.game.rounds[-1].pli.push({
      card,
      playerId,
    });
    logger.info(`Player ${playerId} played ${card}`);
  }

  addAnnonce(annonce: IAnnonce) {
    this.game.rounds[-1].annonces.push(annonce);
    logger.info(`Player ${annonce.playerId} announced ${annonce}`);
  }

  addRound() {
    this.game.rounds.push();
    logger.info(`New round started`);
  }
}
