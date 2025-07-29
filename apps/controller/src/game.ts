import { deleteRows } from '@/emitter/end_game';
import logger from '@/logger';
import type { IBid, ICard, IGame, IPlayer, ITrick, IRound } from '@coinche/shared';

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
        const lastTrick = lastRound.tricks[lastRound.tricks.length - 1];
        if (!lastRound) {
            throw new Error('No round exists. Add a round first.');
        }
        lastTrick.plays.push({ card, playerId });
        this.game.deck.push(card);
        logger.info(`Player ${playerId} played ${card.suite} of ${card.value}`);
    }
    public addBid(bid: IBid): void {
        const lastRound = this.game.rounds[this.game.rounds.length - 1];
        if (!lastRound) {
            throw new Error('No round exists. Add a round first.');
        }
        lastRound.bids.push(bid);
        if (bid.bidding !== 0) {
            this.getLastRound().last_bid = bid;
        }
        logger.info(`Player ${bid.playerId} announced ${bid.suite}`);
    }
    public addRound(playerStartingId: string): void {
        const roundInit: IRound = {
            tricks: [],
            bids: [],
            team1_point_current_game: 0,
            team2_point_current_game: 0,
            last_bid: { suite: 'NA', bidding: 0, playerId: 'NA' },
            coinched: false,
            surcoinched: false,
        };
        this.game.rounds.push(roundInit);
        logger.info('New round created');
    }
    public async addTrick(playerStartingId: string): Promise<void> {
        const lastRound = this.game.rounds[this.game.rounds.length - 1];
        const trickInit: ITrick = {
            plays: [],
            current_player_id: playerStartingId,
            player_starting_id: playerStartingId,
        };
        lastRound.tricks.push(trickInit);
        logger.info('New trick created');
    }
    public getLastRound() {
        return this.game.rounds[this.game.rounds.length - 1];
    }
    public getLastTrick() {
        return this.getLastRound().tricks[this.getLastRound().tricks.length - 1];
    }    
    public isTeam1(playerId: string) {
        const players = Array.from(this.getPlayers());
        return players[0].id === playerId || players[2].id === playerId;
    }
}
