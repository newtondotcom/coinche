// Original file: ../shared/grpc/join.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { JoinGameRequest as _coinche_JoinGameRequest, JoinGameRequest__Output as _coinche_JoinGameRequest__Output } from '../coinche/JoinGameRequest';
import type { JoinGameResponse as _coinche_JoinGameResponse, JoinGameResponse__Output as _coinche_JoinGameResponse__Output } from '../coinche/JoinGameResponse';

export interface JoinServiceClient extends grpc.Client {
  JoinGame(argument: _coinche_JoinGameRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_coinche_JoinGameResponse__Output>): grpc.ClientUnaryCall;
  JoinGame(argument: _coinche_JoinGameRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_coinche_JoinGameResponse__Output>): grpc.ClientUnaryCall;
  JoinGame(argument: _coinche_JoinGameRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_coinche_JoinGameResponse__Output>): grpc.ClientUnaryCall;
  JoinGame(argument: _coinche_JoinGameRequest, callback: grpc.requestCallback<_coinche_JoinGameResponse__Output>): grpc.ClientUnaryCall;
  joinGame(argument: _coinche_JoinGameRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_coinche_JoinGameResponse__Output>): grpc.ClientUnaryCall;
  joinGame(argument: _coinche_JoinGameRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_coinche_JoinGameResponse__Output>): grpc.ClientUnaryCall;
  joinGame(argument: _coinche_JoinGameRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_coinche_JoinGameResponse__Output>): grpc.ClientUnaryCall;
  joinGame(argument: _coinche_JoinGameRequest, callback: grpc.requestCallback<_coinche_JoinGameResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface JoinServiceHandlers extends grpc.UntypedServiceImplementation {
  JoinGame: grpc.handleUnaryCall<_coinche_JoinGameRequest__Output, _coinche_JoinGameResponse>;
  
}

export interface JoinServiceDefinition extends grpc.ServiceDefinition {
  JoinGame: MethodDefinition<_coinche_JoinGameRequest, _coinche_JoinGameResponse, _coinche_JoinGameRequest__Output, _coinche_JoinGameResponse__Output>
}
