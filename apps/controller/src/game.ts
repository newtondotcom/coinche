import { deleteRows } from '@/emitter/end_game';
import logger from '@/logger';
import type { Ibidding, ICard, IGame, IPlayer, IPli, IRound } from '@coinche/shared';

export default class controller {
    private static _instances: Map<string, controller> = new Map();

    public game: IGame;

    private constructor(gameId: string) {
        this.game = {
            rounds: [],
            deck: [],
            gameId: gameId,
            team1_score: 0,
            team2_score: 0,
            playersMap: new Map(),
        };
    }

    public static getInstance(gameId: string): controller {
        if (!this._instances.has(gameId)) {
            this._instances.set(gameId, new controller(gameId));
            logger.info(`New game created with id ${gameId}`);
        }
        return this._instances.get(gameId)!;
    }

    public static async deleteInstance(gameId: string): Promise<void> {
        if (this._instances.has(gameId)) {
            this._instances.delete(gameId);
            await deleteRows(gameId, () => {}); // Pass a no-op function for publish
            logger.info(`Game with id ${gameId} has been deleted from db and memory`);
        } else {
            logger.warn(`Game with id ${gameId} does not exist`);
        }
    }

    // --- Player management (now instance, using this.game.playersMap) ---
    public getPlayers(): Set<IPlayer> {
        return new Set(this.game.playersMap.values());
    }
    public addPlayer(player: IPlayer) {
        this.game.playersMap.set(player.id, player);
    }
    public removePlayer(playerId: string) {
        this.game.playersMap.delete(playerId);
    }

    public addPlay(card: ICard, playerId: string): void {
        const lastRound = this.game.rounds[this.game.rounds.length - 1];
        const lastPli = lastRound.plis[lastRound.plis.length - 1];
        if (!lastRound) {
            throw new Error('No round exists. Add a round first.');
        }
        lastPli.plays.push({ card, playerId });
        this.game.deck.push(card);
        logger.info(`Player ${playerId} played ${card.suite} of ${card.value}`);
    }
    public addbidding(bidding: Ibidding): void {
        const lastRound = this.game.rounds[this.game.rounds.length - 1];
        if (!lastRound) {
            throw new Error('No round exists. Add a round first.');
        }
        lastRound.biddings.push(bidding);
        if (bidding.bidding !== 0) {
            this.getLastRound().last_bidding = bidding;
        }
        logger.info(`Player ${bidding.playerId} announced ${bidding.suite}`);
    }
    public addRound(playerStartingId: string): void {
        const roundInit: IRound = {
            plis: [],
            biddings: [],
            team1_point_current_game: 0,
            team2_point_current_game: 0,
            last_bidding: { suite: 'NA', bidding: 0, playerId: 'NA' },
            coinched: false,
            surcoinched: false,
        };
        this.game.rounds.push(roundInit);
        logger.info('New round created');
    }
    public async addPli(playerStartingId: string): Promise<void> {
        const lastRound = this.game.rounds[this.game.rounds.length - 1];
        const pliInit: IPli = {
            plays: [],
            current_player_id: playerStartingId,
            player_starting_id: playerStartingId,
        };
        lastRound.plis.push(pliInit);
        logger.info('New pli created');
    }
    public getLastRound() {
        return this.game.rounds[this.game.rounds.length - 1];
    }
    public getLastPli() {
        return this.getLastRound().plis[this.getLastRound().plis.length - 1];
    }    
    public isTeam1(playerId: string) {
        const players = Array.from(this.getPlayers());
        return players[0].id === playerId || players[2].id === playerId;
    }
}
