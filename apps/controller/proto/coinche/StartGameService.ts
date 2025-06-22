// Original file: ../shared/grpc/start_game.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { StartGameRequest as _coinche_StartGameRequest, StartGameRequest__Output as _coinche_StartGameRequest__Output } from '../coinche/StartGameRequest';
import type { StartGameResponse as _coinche_StartGameResponse, StartGameResponse__Output as _coinche_StartGameResponse__Output } from '../coinche/StartGameResponse';

export interface StartGameServiceClient extends grpc.Client {
  StartGame(argument: _coinche_StartGameRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_coinche_StartGameResponse__Output>): grpc.ClientUnaryCall;
  StartGame(argument: _coinche_StartGameRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_coinche_StartGameResponse__Output>): grpc.ClientUnaryCall;
  StartGame(argument: _coinche_StartGameRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_coinche_StartGameResponse__Output>): grpc.ClientUnaryCall;
  StartGame(argument: _coinche_StartGameRequest, callback: grpc.requestCallback<_coinche_StartGameResponse__Output>): grpc.ClientUnaryCall;
  startGame(argument: _coinche_StartGameRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_coinche_StartGameResponse__Output>): grpc.ClientUnaryCall;
  startGame(argument: _coinche_StartGameRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_coinche_StartGameResponse__Output>): grpc.ClientUnaryCall;
  startGame(argument: _coinche_StartGameRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_coinche_StartGameResponse__Output>): grpc.ClientUnaryCall;
  startGame(argument: _coinche_StartGameRequest, callback: grpc.requestCallback<_coinche_StartGameResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface StartGameServiceHandlers extends grpc.UntypedServiceImplementation {
  StartGame: grpc.handleUnaryCall<_coinche_StartGameRequest__Output, _coinche_StartGameResponse>;
  
}

export interface StartGameServiceDefinition extends grpc.ServiceDefinition {
  StartGame: MethodDefinition<_coinche_StartGameRequest, _coinche_StartGameResponse, _coinche_StartGameRequest__Output, _coinche_StartGameResponse__Output>
}
