import { Ibidding, ICard, IPlay, IPlayer, PlayerId } from "./types";

export interface IGameState {
    // Identifiants de base
    gameId: string;
    
    // Joueurs
    players: IPlayer[];
    team1 : PlayerId[];
    team2 : PlayerId[];
    
    // État de la manche courante
    currentRound: {
        plis: Array<{
            number: number;
            plays: IPlay[];
            currentPlayerId: PlayerId;
            playerStartingId: PlayerId;
            team1Score: number;
            team2Score: number;
            isActive: boolean; // Pour marquer le pli actuel
        }>;
        biddings: Ibidding[];
        biddingElected: Ibidding;
        coinched: boolean;
        surcoinched: boolean;
    };
    
    // État global du jeu
    team1PointsCurrentGame: number;
    team2PointsCurrentGame: number;
    team1Score: number;
    team2Score: number;
    deck: ICard[];
    
    // États de phase
    phases: {
        timeToBid: PlayerId;
        timeDistrib: PlayerId;
        timeToPlay: PlayerId;
    };
    
    // Métadonnées
    createdAt?: Date;
    updatedAt?: Date;
}

export type ChangeCallback = (changeType: string, data: any, state: IGameState) => void;

export interface WSPayload {
    changeType: string;
    state : IGameState;
}

export const CHANGE_TYPE_STATE = 'changeTypeState';