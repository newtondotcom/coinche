/*
import { translateEvent } from './src/listener';
import supabase from './src/supabase';

// delete all rows
await supabase.from('Events').delete().eq('gameId', '0');

const handleInserts = (payload: any) => {
    translateEvent(payload.new);
};

const gameId = '0';
supabase
    .channel(gameId)
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'Events' }, handleInserts)
    .subscribe();

console.log('Listening for changes in game', gameId);
*/

import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';

import { emitCanPlay, emitCanAnnonce } from './src/emitter/can';
import { emitGameStarting } from './src/emitter/start_game';
import { emitPoints } from './src/emitter/points';
import { emitRoundStarting } from './src/emitter/start_round';
import { emitEndGame } from './src/emitter/end_game';
import { emitStartDistribution } from './src/emitter/start_distribution';
import emitDistribution from './src/emitter/distribution';
import { emitPointsRound } from './src/emitter/points_round';
import { closePli } from './src/emitter/close_pli';
import { startPli } from './src/emitter/start_pli';
import { addPointsTo } from './src/points';

// Path to all proto files
const PROTO_PATH = path.resolve(__dirname, '../shared/grpc');
const protoFiles = [
  'join.proto',
  'leave.proto',
  'play.proto',
  'annonce.proto',
  'can_play.proto',
  'can_annonce.proto',
  'start_game.proto',
  'end_game.proto',
  'start_round.proto',
  'end_round.proto',
  'start_pli.proto',
  'win_pli.proto',
  'score.proto',
  'score_round.proto',
  'start_distribution.proto',
  'distribution.proto',
  'start_annonce.proto',
  'coinche.proto',
  'surcoinche.proto',
  'error.proto',
  'win_game.proto',
  'sound.proto',
  'points.proto',
];

const packageDefinition = protoLoader.loadSync(
  protoFiles.map(f => path.join(PROTO_PATH, f)),
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  }
);
const proto = grpc.loadPackageDefinition(packageDefinition) as any;

// --- Handler implementations for each service ---
const joinHandlers = {
  JoinGame: async (call: any, callback: any) => {
    // TODO: Implement join logic
    console.log("test")
    callback(null, { success: true, message: 'JoinGame not implemented' });
  },
};
const leaveHandlers = {
  LeaveGame: async (call: any, callback: any) => {
    // TODO: Implement leave logic
    callback(null, { success: true, message: 'LeaveGame not implemented' });
  },
};
const playHandlers = {
  PlayCard: async (call: any, callback: any) => {
    // TODO: Implement play logic
    callback(null, { success: true, message: 'PlayCard not implemented' });
  },
};
const annonceHandlers = {
  MakeAnnonce: async (call: any, callback: any) => {
    // TODO: Implement annonce logic
    callback(null, { success: true, message: 'MakeAnnonce not implemented' });
  },
};
const canPlayHandlers = {
  CanPlay: async (call: any, callback: any) => {
    const { player_id, game_id } = call.request;
    await emitCanPlay(player_id, game_id);
    callback(null, { success: true, message: 'Can play event emitted' });
  },
};
const canAnnonceHandlers = {
  CanAnnonce: async (call: any, callback: any) => {
    const { player_id, game_id } = call.request;
    await emitCanAnnonce(player_id, game_id);
    callback(null, { success: true, message: 'Can annonce event emitted' });
  },
};
const startGameHandlers = {
  StartGame: async (call: any, callback: any) => {
    const { player_id, game_id } = call.request;
    await emitGameStarting(player_id, game_id);
    callback(null, { success: true, message: 'Game started' });
  },
};
const endGameHandlers = {
  EndGame: async (call: any, callback: any) => {
    const { winner_player_id, team_mate_player_id, game_id } = call.request;
    await emitEndGame(winner_player_id, team_mate_player_id, game_id);
    callback(null, { success: true, message: 'End game event emitted' });
  },
};
const startRoundHandlers = {
  StartRound: async (call: any, callback: any) => {
    const { game_id, player_id } = call.request;
    await emitRoundStarting(game_id, player_id);
    callback(null, { success: true, message: 'Round started' });
  },
};
const endRoundHandlers = {
  EndRound: async (call: any, callback: any) => {
    // TODO: Implement end round logic
    callback(null, { success: true, message: 'EndRound not implemented' });
  },
};
const startPliHandlers = {
  StartPli: async (call: any, callback: any) => {
    const { game_id } = call.request;
    await startPli(game_id);
    callback(null, { success: true, message: 'Pli started' });
  },
};
const winPliHandlers = {
  WinPli: async (call: any, callback: any) => {
    const { game_id } = call.request;
    await closePli(game_id);
    callback(null, { success: true, message: 'Pli closed' });
  },
};
const scoreHandlers = {
  Score: async (call: any, callback: any) => {
    const { score_team1, score_team2, game_id } = call.request;
    await emitPoints(score_team1, score_team2, game_id);
    callback(null, { success: true, message: 'Points emitted' });
  },
};
const scoreRoundHandlers = {
  ScoreRound: async (call: any, callback: any) => {
    const { score_team1, score_team2, game_id } = call.request;
    await emitPointsRound(score_team1, score_team2, game_id);
    callback(null, { success: true, message: 'Points round emitted' });
  },
};
const startDistributionHandlers = {
  StartDistribution: async (call: any, callback: any) => {
    const { game_id } = call.request;
    await emitStartDistribution(game_id);
    callback(null, { success: true, message: 'Distribution started' });
  },
};
const distributionHandlers = {
  DistributeCard: async (call: any, callback: any) => {
    const { player_id, game_id } = call.request;
    await emitDistribution(player_id, game_id);
    callback(null, { success: true, message: 'Card distributed' });
  },
};
const startAnnonceHandlers = {
  StartAnnonce: async (call: any, callback: any) => {
    // TODO: Implement start annonce logic
    callback(null, { success: true, message: 'StartAnnonce not implemented' });
  },
};
const coincheHandlers = {
  Coinche: async (call: any, callback: any) => {
    // TODO: Implement coinche logic
    callback(null, { success: true, message: 'Coinche not implemented' });
  },
};
const surcoincheHandlers = {
  Surcoinche: async (call: any, callback: any) => {
    // TODO: Implement surcoinche logic
    callback(null, { success: true, message: 'Surcoinche not implemented' });
  },
};
const errorHandlers = {
  ReportError: async (call: any, callback: any) => {
    // TODO: Implement error reporting logic
    callback(null, { success: true, message: 'ReportError not implemented' });
  },
};
const winGameHandlers = {
  WinGame: async (call: any, callback: any) => {
    // TODO: Implement win game logic
    callback(null, { success: true, message: 'WinGame not implemented' });
  },
};
const soundHandlers = {
  PlaySound: async (call: any, callback: any) => {
    // TODO: Implement sound logic
    callback(null, { success: true, message: 'PlaySound not implemented' });
  },
};
const pointsHandlers = {
  UpdatePoints: async (call: any, callback: any) => {
    const { player_id, points } = call.request;
    await addPointsTo(points, player_id);
    callback(null, { success: true, message: 'Points updated' });
  },
};

const server = new grpc.Server();
server.addService(proto.coinche.JoinService.service, joinHandlers);
server.addService(proto.coinche.LeaveService.service, leaveHandlers);
server.addService(proto.coinche.PlayService.service, playHandlers);
server.addService(proto.coinche.AnnonceService.service, annonceHandlers);
server.addService(proto.coinche.CanPlayService.service, canPlayHandlers);
server.addService(proto.coinche.CanAnnonceService.service, canAnnonceHandlers);
server.addService(proto.coinche.StartGameService.service, startGameHandlers);
server.addService(proto.coinche.EndGameService.service, endGameHandlers);
server.addService(proto.coinche.StartRoundService.service, startRoundHandlers);
server.addService(proto.coinche.EndRoundService.service, endRoundHandlers);
server.addService(proto.coinche.StartPliService.service, startPliHandlers);
server.addService(proto.coinche.WinPliService.service, winPliHandlers);
server.addService(proto.coinche.ScoreService.service, scoreHandlers);
server.addService(proto.coinche.ScoreRoundService.service, scoreRoundHandlers);
server.addService(proto.coinche.StartDistributionService.service, startDistributionHandlers);
server.addService(proto.coinche.DistributionService.service, distributionHandlers);
server.addService(proto.coinche.StartAnnonceService.service, startAnnonceHandlers);
server.addService(proto.coinche.CoincheService.service, coincheHandlers);
server.addService(proto.coinche.SurcoincheService.service, surcoincheHandlers);
server.addService(proto.coinche.ErrorService.service, errorHandlers);
server.addService(proto.coinche.WinGameService.service, winGameHandlers);
server.addService(proto.coinche.SoundService.service, soundHandlers);
server.addService(proto.coinche.PointsService.service, pointsHandlers);

const PORT = process.env.GRPC_PORT || '50051';
server.bindAsync(`0.0.0.0:${PORT}`, grpc.ServerCredentials.createInsecure(), () => {
  console.log(`gRPC server running at 0.0.0.0:${PORT}`);
}); 