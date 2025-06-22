// Original file: ../shared/grpc/can_annonce.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { CanAnnonceRequest as _coinche_CanAnnonceRequest, CanAnnonceRequest__Output as _coinche_CanAnnonceRequest__Output } from '../coinche/CanAnnonceRequest';
import type { CanAnnonceResponse as _coinche_CanAnnonceResponse, CanAnnonceResponse__Output as _coinche_CanAnnonceResponse__Output } from '../coinche/CanAnnonceResponse';

export interface CanAnnonceServiceClient extends grpc.Client {
  CanAnnonce(argument: _coinche_CanAnnonceRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_coinche_CanAnnonceResponse__Output>): grpc.ClientUnaryCall;
  CanAnnonce(argument: _coinche_CanAnnonceRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_coinche_CanAnnonceResponse__Output>): grpc.ClientUnaryCall;
  CanAnnonce(argument: _coinche_CanAnnonceRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_coinche_CanAnnonceResponse__Output>): grpc.ClientUnaryCall;
  CanAnnonce(argument: _coinche_CanAnnonceRequest, callback: grpc.requestCallback<_coinche_CanAnnonceResponse__Output>): grpc.ClientUnaryCall;
  canAnnonce(argument: _coinche_CanAnnonceRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_coinche_CanAnnonceResponse__Output>): grpc.ClientUnaryCall;
  canAnnonce(argument: _coinche_CanAnnonceRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_coinche_CanAnnonceResponse__Output>): grpc.ClientUnaryCall;
  canAnnonce(argument: _coinche_CanAnnonceRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_coinche_CanAnnonceResponse__Output>): grpc.ClientUnaryCall;
  canAnnonce(argument: _coinche_CanAnnonceRequest, callback: grpc.requestCallback<_coinche_CanAnnonceResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface CanAnnonceServiceHandlers extends grpc.UntypedServiceImplementation {
  CanAnnonce: grpc.handleUnaryCall<_coinche_CanAnnonceRequest__Output, _coinche_CanAnnonceResponse>;
  
}

export interface CanAnnonceServiceDefinition extends grpc.ServiceDefinition {
  CanAnnonce: MethodDefinition<_coinche_CanAnnonceRequest, _coinche_CanAnnonceResponse, _coinche_CanAnnonceRequest__Output, _coinche_CanAnnonceResponse__Output>
}
