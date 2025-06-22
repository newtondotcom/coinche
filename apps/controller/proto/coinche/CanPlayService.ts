// Original file: ../shared/grpc/can_play.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { CanPlayRequest as _coinche_CanPlayRequest, CanPlayRequest__Output as _coinche_CanPlayRequest__Output } from '../coinche/CanPlayRequest';
import type { CanPlayResponse as _coinche_CanPlayResponse, CanPlayResponse__Output as _coinche_CanPlayResponse__Output } from '../coinche/CanPlayResponse';

export interface CanPlayServiceClient extends grpc.Client {
  CanPlay(argument: _coinche_CanPlayRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_coinche_CanPlayResponse__Output>): grpc.ClientUnaryCall;
  CanPlay(argument: _coinche_CanPlayRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_coinche_CanPlayResponse__Output>): grpc.ClientUnaryCall;
  CanPlay(argument: _coinche_CanPlayRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_coinche_CanPlayResponse__Output>): grpc.ClientUnaryCall;
  CanPlay(argument: _coinche_CanPlayRequest, callback: grpc.requestCallback<_coinche_CanPlayResponse__Output>): grpc.ClientUnaryCall;
  canPlay(argument: _coinche_CanPlayRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_coinche_CanPlayResponse__Output>): grpc.ClientUnaryCall;
  canPlay(argument: _coinche_CanPlayRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_coinche_CanPlayResponse__Output>): grpc.ClientUnaryCall;
  canPlay(argument: _coinche_CanPlayRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_coinche_CanPlayResponse__Output>): grpc.ClientUnaryCall;
  canPlay(argument: _coinche_CanPlayRequest, callback: grpc.requestCallback<_coinche_CanPlayResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface CanPlayServiceHandlers extends grpc.UntypedServiceImplementation {
  CanPlay: grpc.handleUnaryCall<_coinche_CanPlayRequest__Output, _coinche_CanPlayResponse>;
  
}

export interface CanPlayServiceDefinition extends grpc.ServiceDefinition {
  CanPlay: MethodDefinition<_coinche_CanPlayRequest, _coinche_CanPlayResponse, _coinche_CanPlayRequest__Output, _coinche_CanPlayResponse__Output>
}
