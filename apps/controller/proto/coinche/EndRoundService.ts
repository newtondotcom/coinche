// Original file: ../shared/grpc/end_round.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { EndRoundRequest as _coinche_EndRoundRequest, EndRoundRequest__Output as _coinche_EndRoundRequest__Output } from '../coinche/EndRoundRequest';
import type { EndRoundResponse as _coinche_EndRoundResponse, EndRoundResponse__Output as _coinche_EndRoundResponse__Output } from '../coinche/EndRoundResponse';

export interface EndRoundServiceClient extends grpc.Client {
  EndRound(argument: _coinche_EndRoundRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_coinche_EndRoundResponse__Output>): grpc.ClientUnaryCall;
  EndRound(argument: _coinche_EndRoundRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_coinche_EndRoundResponse__Output>): grpc.ClientUnaryCall;
  EndRound(argument: _coinche_EndRoundRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_coinche_EndRoundResponse__Output>): grpc.ClientUnaryCall;
  EndRound(argument: _coinche_EndRoundRequest, callback: grpc.requestCallback<_coinche_EndRoundResponse__Output>): grpc.ClientUnaryCall;
  endRound(argument: _coinche_EndRoundRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_coinche_EndRoundResponse__Output>): grpc.ClientUnaryCall;
  endRound(argument: _coinche_EndRoundRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_coinche_EndRoundResponse__Output>): grpc.ClientUnaryCall;
  endRound(argument: _coinche_EndRoundRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_coinche_EndRoundResponse__Output>): grpc.ClientUnaryCall;
  endRound(argument: _coinche_EndRoundRequest, callback: grpc.requestCallback<_coinche_EndRoundResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface EndRoundServiceHandlers extends grpc.UntypedServiceImplementation {
  EndRound: grpc.handleUnaryCall<_coinche_EndRoundRequest__Output, _coinche_EndRoundResponse>;
  
}

export interface EndRoundServiceDefinition extends grpc.ServiceDefinition {
  EndRound: MethodDefinition<_coinche_EndRoundRequest, _coinche_EndRoundResponse, _coinche_EndRoundRequest__Output, _coinche_EndRoundResponse__Output>
}
