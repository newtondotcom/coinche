import logger from '@/lib/logger';
import type { Ibidding, ICard, IGame, IPlayer, IPli, IRound, IGameState, CardSuite, bidding, PlayerId } from '@coinche/shared';
import server from '..';

export default class controller {
    static clearGames() {
        this._instances.clear();
    }
    private static _instances: Map<string, controller> = new Map();

    public state: IGameState;

    private constructor(gameId: string) {
        this.state = {
            gameId,
            players : [],
            team1: [],
            team2: [],
            currentRound: {
                plis: [],
                biddings: [],
                biddingElected: { suite: 'NA', bidding: 0, playerId: '0' },
                coinched: false,
                surcoinched: false,
            },
            team1PointsCurrentGame: 0,
            team2PointsCurrentGame: 0,
            team1Score: 0,
            team2Score: 0,
            deck: [],
            phases: {
                timeToBid: '',
                timeDistrib: '',
                timeToPlay: '',
            },
            createdAt: new Date(),
            updatedAt: new Date(),  
        };
        logger.info(`Game controller initialized for gameId: ${gameId}`);
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
            logger.info(`Game with id ${gameId} has been deleted from db and memory`);
        } else {
            logger.warn(`Game with id ${gameId} does not exist`);
        }
    }

    public sendState() {
        const payload = JSON.stringify({
            changeType: 'changeTypeState',
            state: this.state,
        });
        server.publish(this.state.gameId, payload);
        logger.info(`State sent for gameId: ${this.state.gameId}`); 
    }

    public getPlayers(): IPlayer[] {
        return Array.from(this.state.players);
    }

    public addPlayer(player: IPlayer) {
        if (this.state.players.length >= 4) {
            throw new Error('Cannot add more than 4 players to the game');
        }
        this.state.players.push(player);
        if (this.state.team1.length < 2) {
            this.state.team1.push(player.id);
        } else {
            this.state.team2.push(player.id);
        }
        logger.info(`Player ${player.id} added to the game`);
    }

    public removePlayer(playerId: string) {
        this.state.players = this.state.players.filter(p => p.id !== playerId);
        this.state.team1 = this.state.team1.filter(id => id !== playerId);
        this.state.team2 = this.state.team2.filter(id => id !== playerId);
        logger.info(`Player ${playerId} removed from the game`);
    }

    public getCurrentRound() {
        if (!this.state.currentRound) {
            throw new Error('No current round exists.');
        }
        return this.state.currentRound;
    }

    public addPlay(card: ICard, playerId: string): void {
        const currentRound = this.getCurrentRound();
        const currentPli = currentRound.plis[currentRound.plis.length - 1]; 
        currentPli.plays.push({ card, playerId });
        this.state.deck.push(card);
        logger.info(`Player ${playerId} played ${card.suite} of ${card.value}`);
    }
    public addbidding(bidding: Ibidding): void {
        const currentRound = this.getCurrentRound();
        currentRound.biddings.push(bidding);
        if (bidding.bidding !== 0) {
            currentRound.biddingElected = bidding;
            console.log(currentRound.biddingElected);
        }
        logger.info(`Player ${bidding.playerId} announced ${bidding.suite}`);
    }
    public addRound(playerStartingId: string): void {
        const roundInit = {
            plis: [],
            biddings: [],
            biddingElected: { suite: 'NA' as CardSuite, bidding: 0 as bidding, playerId: 'NA' as PlayerId },
            coinched: false,
            surcoinched: false,
        };
        this.state.currentRound = roundInit;
        logger.info('New round created');
    }
    public async addPli(playerStartingId: string): Promise<void> {
        const currentRound = this.getCurrentRound();
        const pliInit = {
            number: currentRound.plis.length + 1,
            plays: [],
            currentPlayerId: playerStartingId,
            playerStartingId: playerStartingId,
            team1Score: 0,
            team2Score: 0,
            isActive: true,
        };
        currentRound.plis.push(pliInit);
        logger.info('New pli created');
    }
    public getLastPli() {
        return this.getCurrentRound().plis[this.getCurrentRound().plis.length - 1];
    }    
    public getLastXPlis(n: number) {
        const plis = this.getCurrentRound().plis;
        return plis.slice(Math.max(plis.length - n, 0));
    }

    public isTeam1(playerId: string) {
        const players = Array.from(this.getPlayers());
        return players[0].id === playerId || players[2].id === playerId;
    }

    public static gameExists(gameId: string): { exists: boolean, playerCount: number } {
        const instance = this._instances.get(gameId);
        return {
            exists: !!instance,
            playerCount: instance ? instance.state.players.length : 0
        };
    }
}
