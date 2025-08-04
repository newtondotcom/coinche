import logger from '@/lib/logger';
import type { IPlayer, IGameState } from '@coinche/shared';

export default class controller {
    static clearGames() {
        this._instances.clear();
    }
    private static _instances: Map<string, controller> = new Map();

    public state: IGameState;

    private constructor(gameId: string) {
        this.state = {
            gameId,
            status: 'waiting',
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
        // server.publish(this.state.gameId, payload);
        logger.info(`State sent for gameId: ${this.state.gameId}`); 
    }

    /*
    GAME MANAGEMENT METHODS

    SET methods will be store in the `src/lib/actions/` folder

    GET methods will be below

    */
    public getPlayers(): IPlayer[] {
        return Array.from(this.state.players);
    }

    public getCurrentRound() {
        if (!this.state.currentRound) {
            throw new Error('No current round exists.');
        }
        return this.state.currentRound;
    }

    public static gameExists(gameId: string): { exists: boolean, playerCount: number } {
        const instance = this._instances.get(gameId);
        return {
            exists: !!instance,
            playerCount: instance ? instance.state.players.length : 0
        };
    }

    public getLastPli() {
        return this.getCurrentRound().plis[this.getCurrentRound().plis.length - 1];
    }    

    public isTeam1(playerId: string) {
        const players = Array.from(this.getPlayers());
        return players[0].id === playerId || players[2].id === playerId;
    }
}
