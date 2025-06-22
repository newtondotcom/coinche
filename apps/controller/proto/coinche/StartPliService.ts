// Original file: ../shared/grpc/start_pli.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { StartPliRequest as _coinche_StartPliRequest, StartPliRequest__Output as _coinche_StartPliRequest__Output } from '../coinche/StartPliRequest';
import type { StartPliResponse as _coinche_StartPliResponse, StartPliResponse__Output as _coinche_StartPliResponse__Output } from '../coinche/StartPliResponse';

export interface StartPliServiceClient extends grpc.Client {
  StartPli(argument: _coinche_StartPliRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_coinche_StartPliResponse__Output>): grpc.ClientUnaryCall;
  StartPli(argument: _coinche_StartPliRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_coinche_StartPliResponse__Output>): grpc.ClientUnaryCall;
  StartPli(argument: _coinche_StartPliRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_coinche_StartPliResponse__Output>): grpc.ClientUnaryCall;
  StartPli(argument: _coinche_StartPliRequest, callback: grpc.requestCallback<_coinche_StartPliResponse__Output>): grpc.ClientUnaryCall;
  startPli(argument: _coinche_StartPliRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_coinche_StartPliResponse__Output>): grpc.ClientUnaryCall;
  startPli(argument: _coinche_StartPliRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_coinche_StartPliResponse__Output>): grpc.ClientUnaryCall;
  startPli(argument: _coinche_StartPliRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_coinche_StartPliResponse__Output>): grpc.ClientUnaryCall;
  startPli(argument: _coinche_StartPliRequest, callback: grpc.requestCallback<_coinche_StartPliResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface StartPliServiceHandlers extends grpc.UntypedServiceImplementation {
  StartPli: grpc.handleUnaryCall<_coinche_StartPliRequest__Output, _coinche_StartPliResponse>;
  
}

export interface StartPliServiceDefinition extends grpc.ServiceDefinition {
  StartPli: MethodDefinition<_coinche_StartPliRequest, _coinche_StartPliResponse, _coinche_StartPliRequest__Output, _coinche_StartPliResponse__Output>
}
