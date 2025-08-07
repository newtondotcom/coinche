import logger from '@/lib/logger';
import type { IPlayer, IGameState } from '@coinche/shared';
import { server } from '@/index';

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
        this.testState();
        const payload = JSON.stringify({
            changeType: 'changeTypeState',
            state: this.state,
        });
        server.publish(this.state.gameId, payload);
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

    public getCurrentPli() {
        return this.getCurrentRound().plis[this.getCurrentRound().plis.length - 1];
    }    

    public isTeam1(playerId: string) {
        const players = Array.from(this.getPlayers());
        return players[0].id === playerId || players[2].id === playerId;
    }


    public testState(){
        // Test 1 : states.phases cant be both empty or two at the same time not empty
        const phases = this.state.phases;
        const filledPhases = Object.values(phases).find(phase => phase);
        if ((filledPhases && filledPhases.length > 1)) {
            logger.error(`Invalid phases state for gameId: ${this.state.gameId}`, phases);
            throw new Error('Invalid phases state: either all phases are empty or all are filled.');
        }   

        // Test 2 : players must be 4
        if (this.state.status === 'playing' && this.state.players.length !== 4) {
            logger.error(`Invalid player count for gameId: ${this.state.gameId}`, this.state.players);
            throw new Error('Invalid player count: there must be exactly 4 players.');
        }

        // Test 3 : game status must be set to "started" if something is happening
        if (this.state.currentRound.plis.length > 0 || this.state.currentRound.biddings.length > 0) {
            if (this.state.status !== 'playing') {
                logger.error(`Invalid game status for gameId: ${this.state.gameId}`, this.state.status);
                throw new Error('Invalid game status: must be "playing" if there are ongoing rounds or biddings.');
            }
        }

        logger.warn(`State for gameId: ${this.state.gameId} is valid`, this.state);
    }
}
