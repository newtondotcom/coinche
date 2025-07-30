export interface Database {
  public: {
    Tables: {
      Points: {
        Row: {
          id: string;
          player_id: string;
          total_points: number;
          games_played: number;
          games_won: number;
          games_lost: number;
          win_rate: number;
          last_game_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          player_id: string;
          total_points?: number;
          games_played?: number;
          games_won?: number;
          games_lost?: number;
          win_rate?: number;
          last_game_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          player_id?: string;
          total_points?: number;
          games_played?: number;
          games_won?: number;
          games_lost?: number;
          win_rate?: number;
          last_game_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      Events: {
        Row: {
          id: string;
          gameId: string;
          playerId: string;
          type: string;
          value: string | null;
          metadata: string | null;
          timestamp: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          gameId: string;
          playerId: string;
          type: string;
          value?: string | null;
          metadata?: string | null;
          timestamp?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          gameId?: string;
          playerId?: string;
          type?: string;
          value?: string | null;
          metadata?: string | null;
          timestamp?: string;
          created_at?: string;
        };
      };
      Game: {
        Row: {
          id: string;
          player1_id: string;
          player2_id: string;
          player3_id: string;
          player4_id: string;
          team1_score: number;
          team2_score: number;
          status: string;
          started_at: string | null;
          ended_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          player1_id: string;
          player2_id: string;
          player3_id: string;
          player4_id: string;
          team1_score?: number;
          team2_score?: number;
          status?: string;
          started_at?: string | null;
          ended_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          player1_id?: string;
          player2_id?: string;
          player3_id?: string;
          player4_id?: string;
          team1_score?: number;
          team2_score?: number;
          status?: string;
          started_at?: string | null;
          ended_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
} 