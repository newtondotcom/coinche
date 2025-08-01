import { deleteRows } from '@/lib/emitter/end_game';
import logger from '@/lib/logger';
import type { Ibidding, ICard, IGame, IPlayer, IPli, IPlay, IGameState, CardSuite, ChangeCallback, PlayerId } from '@coinche/shared';

export default class GameStateManager {
    private state: IGameState;
    private changeCallbacks: ChangeCallback[] = [];

    static clearGames() {
        this._instances.clear();
    }
    private static _instances: Map<string, GameStateManager> = new Map();

    public static getInstance(gameId: string): GameStateManager {
        if (!this._instances.has(gameId)) {
            this._instances.set(gameId, new GameStateManager(gameId));
            logger.info(`New game created with id ${gameId}`);
        }
        return this._instances.get(gameId)!;
    }

    public static async deleteInstance(gameId: string): Promise<void> {
        if (this._instances.has(gameId)) {
            this._instances.delete(gameId);
            await deleteRows(gameId, () => {}); // Pass a no-op function for publish
            logger.info(`Game with id ${gameId} has been deleted from db and memory`);
        }}
    
    constructor(gameId: string, players: IPlayer[] = []) {
        this.state = this.initializeGameState(gameId, players);
    }
    
    // Méthode pour s'abonner aux changements
    onChange(callback: ChangeCallback): () => void {
        this.changeCallbacks.push(callback);
        // Retourne une fonction pour se désabonner
        return () => {
            const index = this.changeCallbacks.indexOf(callback);
            if (index > -1) {
                this.changeCallbacks.splice(index, 1);
            }
        };
    }
    
    // Méthode privée pour notifier les changements
    private notifyChange(changeType: string, data: any): void {
        // Les changements sont déjà appliqués à this.state
        this.changeCallbacks.forEach(callback => {
            try {
                callback(changeType, data, this.state);
            } catch (error) {
                console.error('Error in change callback:', error);
            }
        });
    }
    
    private initializeGameState(gameId: string, players: IPlayer[]): IGameState {
        const initialState: IGameState = {
            gameId,
            players,
            currentRound: {
                plis: [{
                    number: 0,
                    plays: [],
                    currentPlayerId: '',
                    playerStartingId: '',
                    team1Score: 0,
                    team2Score: 0,
                    isActive: true
                }],
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
        
        return initialState;
    }
    
    // Getters pour accéder à l'état
    getState(): Readonly<IGameState> {
        return { ...this.state };
    }
    
    getPlayers(): IPlayer[] {
        return [...this.state.players];
    }
    
    // currentPli est maintenant le dernier pli actif
    getCurrentPli(): IPlay[] {
        const activePli = this.state.currentRound.plis.find(p => p.isActive);
        return activePli ? [...activePli.plays] : [];
    }
    
    // Obtenir le pli actuel complet
    getCurrentPliObject() {
        return this.state.currentRound.plis.find(p => p.isActive);
    }
    
    getLastBidding(): Ibidding {
        return { ...this.state.currentRound.biddingElected };
    }
    
    getCurrentPliNumber(): number {
        const activePli = this.state.currentRound.plis.find(p => p.isActive);
        return activePli?.number ?? 0;
    }
    
    // Méthodes de mise à jour
    addPlayer(player: IPlayer): void {
        const oldState = { ...this.state };
        this.state.players.push({ ...player });
        this.updateTimestamp();
        this.notifyChange('playerAdded', { player });
    }
    
    removePlayer(playerId: string): void {
        const oldState = { ...this.state };
        const removedPlayer = this.state.players.find(p => p.id === playerId);
        this.state.players = this.state.players.filter(p => p.id !== playerId);
        this.updateTimestamp();
        this.notifyChange('playerRemoved', { playerId, removedPlayer });
    }
    
    addCardToPli(card: ICard, playerId: PlayerId): void {
        const oldState = { ...this.state };
        const activePli = this.state.currentRound.plis.find(p => p.isActive);
        
        if (!activePli) {
            throw new Error('No active pli found');
        }
        
        activePli.plays.push({ card: { ...card }, playerId });
        this.removeCardFromPlayer(card, playerId);
        this.state.deck.push({ ...card });
        this.updateTimestamp();
        this.notifyChange('cardPlayed', { card, playerId, pliNumber: activePli.number });
    }
    
    private removeCardFromPlayer(card: ICard, playerId: string): void {
        const player = this.state.players.find(p => p.id === playerId);
        if (player) {
            player.hands = player.hands.filter(c => 
                !(c.suite === card.suite && c.value === card.value && c.valueNum === card.valueNum)
            );
        }
    }
    
    addBidding(bidding: Ibidding): void {
        const oldState = { ...this.state };
        this.state.currentRound.biddings.push({ ...bidding });
        if (bidding.bidding !== 0) {
            this.state.currentRound.biddingElected = { ...bidding };
        }
        this.updateTimestamp();
        this.notifyChange('biddingAdded', { bidding });
    }
    
    setTimeToBid(playerId: PlayerId): void {
        const oldState = { ...this.state };
        this.state.phases.timeToBid = playerId;
        this.updateTimestamp();
        this.notifyChange('phaseChanged', { phase: 'timeToBid', playerId });
    }
    
    setTimeDistrib(playerId: PlayerId): void {
        const oldState = { ...this.state };
        this.state.phases.timeDistrib = playerId;
        this.updateTimestamp();
        this.notifyChange('phaseChanged', { phase: 'timeDistrib', playerId });
    }
    
    setTimeToPlay(playerId: PlayerId): void {
        const oldState = { ...this.state };
        this.state.phases.timeToPlay = playerId;
        
        // Mettre à jour le currentPlayerId du pli actif
        const activePli = this.state.currentRound.plis.find(p => p.isActive);
        if (activePli) {
            activePli.currentPlayerId = playerId;
        }
        
        this.updateTimestamp();
        this.notifyChange('phaseChanged', { phase: 'timeToPlay', playerId });
    }
    
    setCoinched(coinched: boolean): void {
        this.state.currentRound.coinched = coinched;
        this.updateTimestamp();
    }
    
    setSurcoinched(surcoinched: boolean): void {
        this.state.currentRound.surcoinched = surcoinched;
        this.updateTimestamp();
    }
    
    finishCurrentPli(team1Score: number = 0, team2Score: number = 0): void {
        const oldState = { ...this.state };
        const activePli = this.state.currentRound.plis.find(p => p.isActive);
        
        if (!activePli) {
            throw new Error('No active pli found');
        }
        
        // Marquer le pli comme terminé et ajouter les scores
        activePli.isActive = false;
        activePli.team1Score = team1Score;
        activePli.team2Score = team2Score;
        
        // Ajouter les points au score de la manche
        this.state.team1PointsCurrentGame += team1Score;
        this.state.team2PointsCurrentGame += team2Score;
        
        this.updateTimestamp();
        this.notifyChange('pliFinished', { 
            pliNumber: activePli.number, 
            team1Score, 
            team2Score,
            plays: activePli.plays 
        });
    }
    
    startNewPli(playerStartingId: PlayerId): void {
        const oldState = { ...this.state };
        
        // Créer un nouveau pli et le marquer comme actif
        const newPliNumber = this.state.currentRound.plis.length;
        const newPli = {
            number: newPliNumber,
            plays: [],
            currentPlayerId: playerStartingId,
            playerStartingId: playerStartingId,
            team1Score: 0,
            team2Score: 0,
            isActive: true
        };
        
        this.state.currentRound.plis.push(newPli);
        this.state.phases.timeToPlay = playerStartingId;
        
        this.updateTimestamp();
        this.notifyChange('pliStarted', { 
            pliNumber: newPliNumber, 
            playerStartingId 
        });
    }
    
    private getPlayerStartingCurrentPli(): PlayerId {
        const activePli = this.state.currentRound.plis.find(p => p.isActive);
        return activePli?.playerStartingId ?? '';
    }
    
    startNewRound(): void {
        const oldState = { ...this.state };
        
        // Finaliser les scores de la manche précédente
        this.state.team1Score += this.state.team1PointsCurrentGame;
        this.state.team2Score += this.state.team2PointsCurrentGame;
        
        // Réinitialiser pour la nouvelle manche
        this.state.currentRound = {
            plis: [{
                number: 0,
                plays: [],
                currentPlayerId: '',
                playerStartingId: '',
                team1Score: 0,
                team2Score: 0,
                isActive: true
            }],
            biddings: [],
            biddingElected: { suite: 'NA', bidding: 0, playerId: '0' },
            coinched: false,
            surcoinched: false,
        };
        
        this.state.team1PointsCurrentGame = 0;
        this.state.team2PointsCurrentGame = 0;
        this.state.phases = {
            timeToBid: '',
            timeDistrib: '',
            timeToPlay: '',
        };
        
        this.updateTimestamp();
        this.notifyChange('roundStarted', { 
            team1TotalScore: this.state.team1Score,
            team2TotalScore: this.state.team2Score 
        });
    }
    
    addScoreToTeam1(score: number): void {
        this.state.team1PointsCurrentGame += score;
        this.updateTimestamp();
    }
    
    addScoreToTeam2(score: number): void {
        this.state.team2PointsCurrentGame += score;
        this.updateTimestamp();
    }
    
    addGlobalScoreToTeam1(score: number): void {
        this.state.team1Score += score;
        this.updateTimestamp();
    }
    
    addGlobalScoreToTeam2(score: number): void {
        this.state.team2Score += score;
        this.updateTimestamp();
    }
    
    // Méthodes utilitaires (computed properties équivalentes)
    getTeam1Players(): IPlayer[] {
        return this.state.players.filter(p => p.position === 0 || p.position === 2);
    }
    
    getTeam2Players(): IPlayer[] {
        return this.state.players.filter(p => p.position === 1 || p.position === 3);
    }
    
    getPlayerHand(playerId: string): ICard[] {
        const player = this.state.players.find(p => p.id === playerId);
        return player ? [...player.hands] : [];
    }
    
    getColorAsked(): CardSuite | undefined {
        const currentPli = this.getCurrentPli();
        return currentPli.length > 0 && currentPli[0]?.card 
            ? currentPli[0].card.suite 
            : undefined;
    }
    
    hasPlayerColor(playerId: string, color: CardSuite): boolean {
        const player = this.state.players.find(p => p.id === playerId);
        return player ? player.hands.some(card => card.suite === color) : false;
    }
    
    hasPlayerAtout(playerId: string): boolean {
        return this.hasPlayerColor(playerId, this.state.currentRound.biddingElected.suite);
    }
    
    getHighestAtoutInPli(): number {
        const atout = this.state.currentRound.biddingElected.suite;
        const currentPli = this.getCurrentPli();
        const atoutsInPli = currentPli.filter(play => play.card.suite === atout);
        
        if (atoutsInPli.length === 0) return NaN;
        
        const orderedAtouts = atoutsInPli.sort((a, b) => b.card.valueNum - a.card.valueNum);
        return orderedAtouts[0]?.card.valueNum ?? NaN;
    }
    
    isAtoutAsked(): boolean {
        const colorAsked = this.getColorAsked();
        const atout = this.state.currentRound.biddingElected.suite;
        return colorAsked !== undefined && atout !== undefined && colorAsked === atout;
    }
    
    isTeam1Player(playerId: string): boolean {
        const player = this.state.players.find(p => p.id === playerId);
        return player ? (player.position === 0 || player.position === 2) : false;
    }
    
    // Méthodes pour les phases
    isMyTurnToBid(playerId: string): boolean {
        return this.state.phases.timeToBid === playerId;
    }
    
    isMyTurnToPlay(playerId: string): boolean {
        return this.state.phases.timeToPlay === playerId;
    }
    
    isDistributionTime(playerId: string): boolean {
        return this.state.phases.timeDistrib === playerId;
    }
    
    // Sérialisation pour la synchronisation
    toJSON(): string {
        return JSON.stringify(this.state);
    }
    
    static fromJSON(json: string): GameStateManager {
        const state = JSON.parse(json) as IGameState;
        const manager = new GameStateManager(state.gameId);
        manager.state = state;
        return manager;
    }
    
    // Méthode pour synchroniser avec un autre état (utile pour le client)
    sync(newState: Partial<IGameState>): void {
        this.state = { ...this.state, ...newState };
        this.updateTimestamp();
    }
    
    // Méthode pour obtenir une version complète de l'état pour synchronisation
    getFullState(): IGameState {
        return JSON.parse(JSON.stringify(this.state));
    }
    
    private updateTimestamp(): void {
        this.state.updatedAt = new Date();
    }
}