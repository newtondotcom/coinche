import logger from "./logger";
import type { IGame } from "@coinche/shared";

export default class Master {
  private static _instance: Master | null = null;

  public game: IGame;

  // Private constructor to prevent direct instantiation
  private constructor() {
    this.game = { rounds: [] }; // Initialize the game with an empty rounds array
  }

  // Getter to access the singleton instance
  public static get instance(): Master {
    if (!this._instance) {
      this._instance = new Master();
    }
    return this._instance;
  }

  // Add a play to the last round
  public addPlay(card: ICard, playerId: string): void {
    const lastRound = this.game.rounds[this.game.rounds.length - 1];
    if (!lastRound) {
      throw new Error("No round exists. Add a round first.");
    }
    lastRound.pli.push({ card, playerId });
    logger.info(`Player ${playerId} played ${card.rank} of ${card.suit}`);
  }

  // Add an announcement to the last round
  public addAnnonce(annonce: IAnnonce): void {
    const lastRound = this.game.rounds[this.game.rounds.length - 1];
    if (!lastRound) {
      throw new Error("No round exists. Add a round first.");
    }
    lastRound.annonces.push(annonce);
    logger.info(`Player ${annonce.playerId} announced ${annonce.type}`);
  }

  // Add a new round to the game
  public addRound(): void {
    this.game.rounds.push({ pli: [], annonces: [] });
    logger.info("New round started");
  }
}
