// Original file: ../shared/grpc/end_game.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { EndGameRequest as _coinche_EndGameRequest, EndGameRequest__Output as _coinche_EndGameRequest__Output } from '../coinche/EndGameRequest';
import type { EndGameResponse as _coinche_EndGameResponse, EndGameResponse__Output as _coinche_EndGameResponse__Output } from '../coinche/EndGameResponse';

export interface EndGameServiceClient extends grpc.Client {
  EndGame(argument: _coinche_EndGameRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_coinche_EndGameResponse__Output>): grpc.ClientUnaryCall;
  EndGame(argument: _coinche_EndGameRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_coinche_EndGameResponse__Output>): grpc.ClientUnaryCall;
  EndGame(argument: _coinche_EndGameRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_coinche_EndGameResponse__Output>): grpc.ClientUnaryCall;
  EndGame(argument: _coinche_EndGameRequest, callback: grpc.requestCallback<_coinche_EndGameResponse__Output>): grpc.ClientUnaryCall;
  endGame(argument: _coinche_EndGameRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_coinche_EndGameResponse__Output>): grpc.ClientUnaryCall;
  endGame(argument: _coinche_EndGameRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_coinche_EndGameResponse__Output>): grpc.ClientUnaryCall;
  endGame(argument: _coinche_EndGameRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_coinche_EndGameResponse__Output>): grpc.ClientUnaryCall;
  endGame(argument: _coinche_EndGameRequest, callback: grpc.requestCallback<_coinche_EndGameResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface EndGameServiceHandlers extends grpc.UntypedServiceImplementation {
  EndGame: grpc.handleUnaryCall<_coinche_EndGameRequest__Output, _coinche_EndGameResponse>;
  
}

export interface EndGameServiceDefinition extends grpc.ServiceDefinition {
  EndGame: MethodDefinition<_coinche_EndGameRequest, _coinche_EndGameResponse, _coinche_EndGameRequest__Output, _coinche_EndGameResponse__Output>
}
