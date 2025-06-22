// Original file: ../shared/grpc/play.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { PlayCardRequest as _coinche_PlayCardRequest, PlayCardRequest__Output as _coinche_PlayCardRequest__Output } from '../coinche/PlayCardRequest';
import type { PlayCardResponse as _coinche_PlayCardResponse, PlayCardResponse__Output as _coinche_PlayCardResponse__Output } from '../coinche/PlayCardResponse';

export interface PlayServiceClient extends grpc.Client {
  PlayCard(argument: _coinche_PlayCardRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_coinche_PlayCardResponse__Output>): grpc.ClientUnaryCall;
  PlayCard(argument: _coinche_PlayCardRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_coinche_PlayCardResponse__Output>): grpc.ClientUnaryCall;
  PlayCard(argument: _coinche_PlayCardRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_coinche_PlayCardResponse__Output>): grpc.ClientUnaryCall;
  PlayCard(argument: _coinche_PlayCardRequest, callback: grpc.requestCallback<_coinche_PlayCardResponse__Output>): grpc.ClientUnaryCall;
  playCard(argument: _coinche_PlayCardRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_coinche_PlayCardResponse__Output>): grpc.ClientUnaryCall;
  playCard(argument: _coinche_PlayCardRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_coinche_PlayCardResponse__Output>): grpc.ClientUnaryCall;
  playCard(argument: _coinche_PlayCardRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_coinche_PlayCardResponse__Output>): grpc.ClientUnaryCall;
  playCard(argument: _coinche_PlayCardRequest, callback: grpc.requestCallback<_coinche_PlayCardResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface PlayServiceHandlers extends grpc.UntypedServiceImplementation {
  PlayCard: grpc.handleUnaryCall<_coinche_PlayCardRequest__Output, _coinche_PlayCardResponse>;
  
}

export interface PlayServiceDefinition extends grpc.ServiceDefinition {
  PlayCard: MethodDefinition<_coinche_PlayCardRequest, _coinche_PlayCardResponse, _coinche_PlayCardRequest__Output, _coinche_PlayCardResponse__Output>
}
