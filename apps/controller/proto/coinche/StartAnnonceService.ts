// Original file: ../shared/grpc/start_annonce.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { StartAnnonceRequest as _coinche_StartAnnonceRequest, StartAnnonceRequest__Output as _coinche_StartAnnonceRequest__Output } from '../coinche/StartAnnonceRequest';
import type { StartAnnonceResponse as _coinche_StartAnnonceResponse, StartAnnonceResponse__Output as _coinche_StartAnnonceResponse__Output } from '../coinche/StartAnnonceResponse';

export interface StartAnnonceServiceClient extends grpc.Client {
  StartAnnonce(argument: _coinche_StartAnnonceRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_coinche_StartAnnonceResponse__Output>): grpc.ClientUnaryCall;
  StartAnnonce(argument: _coinche_StartAnnonceRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_coinche_StartAnnonceResponse__Output>): grpc.ClientUnaryCall;
  StartAnnonce(argument: _coinche_StartAnnonceRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_coinche_StartAnnonceResponse__Output>): grpc.ClientUnaryCall;
  StartAnnonce(argument: _coinche_StartAnnonceRequest, callback: grpc.requestCallback<_coinche_StartAnnonceResponse__Output>): grpc.ClientUnaryCall;
  startAnnonce(argument: _coinche_StartAnnonceRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_coinche_StartAnnonceResponse__Output>): grpc.ClientUnaryCall;
  startAnnonce(argument: _coinche_StartAnnonceRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_coinche_StartAnnonceResponse__Output>): grpc.ClientUnaryCall;
  startAnnonce(argument: _coinche_StartAnnonceRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_coinche_StartAnnonceResponse__Output>): grpc.ClientUnaryCall;
  startAnnonce(argument: _coinche_StartAnnonceRequest, callback: grpc.requestCallback<_coinche_StartAnnonceResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface StartAnnonceServiceHandlers extends grpc.UntypedServiceImplementation {
  StartAnnonce: grpc.handleUnaryCall<_coinche_StartAnnonceRequest__Output, _coinche_StartAnnonceResponse>;
  
}

export interface StartAnnonceServiceDefinition extends grpc.ServiceDefinition {
  StartAnnonce: MethodDefinition<_coinche_StartAnnonceRequest, _coinche_StartAnnonceResponse, _coinche_StartAnnonceRequest__Output, _coinche_StartAnnonceResponse__Output>
}
