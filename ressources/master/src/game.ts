import logger from "./logger";
import type { IAnnonce, ICard, IGame, IPlayer, IRound } from "@coinche/shared";

export default class Master {
  private static _instance: Master | null = null;

  public game: IGame;

  private constructor() {
    this.game = { rounds: [], players: [], deck: [], gameId: "" }; // Initialize the game with an empty rounds array
  }
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
    this.game.deck.push(card);
    logger.info(`Player ${playerId} played ${card.suite} of ${card.value}`);
  }

  // Add an announcement to the last round
  public addAnnonce(annonce: IAnnonce): void {
    const lastRound = this.game.rounds[this.game.rounds.length - 1];
    if (!lastRound) {
      throw new Error("No round exists. Add a round first.");
    }
    lastRound.annonces.push(annonce);
    logger.info(`Player ${annonce.playerId} announced ${annonce.suite}`);
  }

  // Add a new round to the game
  public addRound(): void {
    const roundInit: IRound = {
      pli: [],
      annonces: [],
      pli_number: 0,
      current_player_id: "PlayerId",
      player_starting_id: "PlayerId",
    };
    this.game.rounds.push(roundInit);
    logger.info("New round started");
  }

  public setId(id: string): void {
    this.game.gameId = id;
  }

  public getLastRound() {
    return this.game.rounds[this.game.rounds.length - 1];
  }

  public addPlayer(player: IPlayer) {
    this.game.players.push(player);
  }
}
