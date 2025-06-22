// Original file: ../shared/grpc/win_game.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { WinGameRequest as _coinche_WinGameRequest, WinGameRequest__Output as _coinche_WinGameRequest__Output } from '../coinche/WinGameRequest';
import type { WinGameResponse as _coinche_WinGameResponse, WinGameResponse__Output as _coinche_WinGameResponse__Output } from '../coinche/WinGameResponse';

export interface WinGameServiceClient extends grpc.Client {
  WinGame(argument: _coinche_WinGameRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_coinche_WinGameResponse__Output>): grpc.ClientUnaryCall;
  WinGame(argument: _coinche_WinGameRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_coinche_WinGameResponse__Output>): grpc.ClientUnaryCall;
  WinGame(argument: _coinche_WinGameRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_coinche_WinGameResponse__Output>): grpc.ClientUnaryCall;
  WinGame(argument: _coinche_WinGameRequest, callback: grpc.requestCallback<_coinche_WinGameResponse__Output>): grpc.ClientUnaryCall;
  winGame(argument: _coinche_WinGameRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_coinche_WinGameResponse__Output>): grpc.ClientUnaryCall;
  winGame(argument: _coinche_WinGameRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_coinche_WinGameResponse__Output>): grpc.ClientUnaryCall;
  winGame(argument: _coinche_WinGameRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_coinche_WinGameResponse__Output>): grpc.ClientUnaryCall;
  winGame(argument: _coinche_WinGameRequest, callback: grpc.requestCallback<_coinche_WinGameResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface WinGameServiceHandlers extends grpc.UntypedServiceImplementation {
  WinGame: grpc.handleUnaryCall<_coinche_WinGameRequest__Output, _coinche_WinGameResponse>;
  
}

export interface WinGameServiceDefinition extends grpc.ServiceDefinition {
  WinGame: MethodDefinition<_coinche_WinGameRequest, _coinche_WinGameResponse, _coinche_WinGameRequest__Output, _coinche_WinGameResponse__Output>
}
