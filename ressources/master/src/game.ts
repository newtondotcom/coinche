import logger from "./logger";
import type {
  IAnnonce,
  ICard,
  IGame,
  IPlayer,
  IPli,
  IRound,
} from "@coinche/shared";

export default class Master {
  private static _instances: Map<string, Master> = new Map();

  public game: IGame;

  private constructor(gameId: string) {
    this.game = {
      rounds: [],
      players: [],
      deck: [],
      gameId: gameId,
      team1_score: 0,
      team2_score: 0,
      status: "new",
    };
  }

  public static getInstance(gameId: string): Master {
    if (!this._instances.has(gameId)) {
      this._instances.set(gameId, new Master(gameId));
      logger.info(`New game created with id ${gameId}`);
    }
    return this._instances.get(gameId)!;
  }

  // Add a play to the last pli of the last round
  public addPlay(card: ICard, playerId: string): void {
    const lastRound = this.game.rounds[this.game.rounds.length - 1];
    const lastPli = lastRound.plis[lastRound.plis.length - 1];
    if (!lastRound) {
      throw new Error("No round exists. Add a round first.");
    }
    lastPli.plays.push({ card, playerId });
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
  public addRound(playerStartingId: string): void {
    const roundInit: IRound = {
      plis: [],
      annonces: [],
      team1_point_current_game: 0,
      team2_point_current_game: 0,
      last_annonce: { suite: "NA", annonce: 0, playerId: "NA" },
      coinched: false,
      surcoinched: false,
    };
    this.game.rounds.push(roundInit);
    logger.info("New round started");
  }

  public addPli(playerStartingId: string): void {
    const lastRound = this.game.rounds[this.game.rounds.length - 1];
    const pliInit: IPli = {
      plays: [],
      current_player_id: playerStartingId,
      player_starting_id: playerStartingId,
    };
    lastRound.plis.push(pliInit);
    logger.info("New round started");
  }

  public setId(id: string): void {
    this.game.gameId = id;
  }

  public getLastRound() {
    return this.game.rounds[this.game.rounds.length - 1];
  }

  public getLastPli() {
    return this.getLastRound().plis[this.getLastRound().plis.length - 1];
  }

  public addPlayer(player: IPlayer) {
    this.game.players.push(player);
  }

  public isTeam1(playerId: string) {
    return (
      this.game.players[0].id === playerId ||
      this.game.players[2].id === playerId
    );
  }
}
