// Original file: ../shared/grpc/annonce.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { MakeAnnonceRequest as _coinche_MakeAnnonceRequest, MakeAnnonceRequest__Output as _coinche_MakeAnnonceRequest__Output } from '../coinche/MakeAnnonceRequest';
import type { MakeAnnonceResponse as _coinche_MakeAnnonceResponse, MakeAnnonceResponse__Output as _coinche_MakeAnnonceResponse__Output } from '../coinche/MakeAnnonceResponse';

export interface AnnonceServiceClient extends grpc.Client {
  MakeAnnonce(argument: _coinche_MakeAnnonceRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_coinche_MakeAnnonceResponse__Output>): grpc.ClientUnaryCall;
  MakeAnnonce(argument: _coinche_MakeAnnonceRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_coinche_MakeAnnonceResponse__Output>): grpc.ClientUnaryCall;
  MakeAnnonce(argument: _coinche_MakeAnnonceRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_coinche_MakeAnnonceResponse__Output>): grpc.ClientUnaryCall;
  MakeAnnonce(argument: _coinche_MakeAnnonceRequest, callback: grpc.requestCallback<_coinche_MakeAnnonceResponse__Output>): grpc.ClientUnaryCall;
  makeAnnonce(argument: _coinche_MakeAnnonceRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_coinche_MakeAnnonceResponse__Output>): grpc.ClientUnaryCall;
  makeAnnonce(argument: _coinche_MakeAnnonceRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_coinche_MakeAnnonceResponse__Output>): grpc.ClientUnaryCall;
  makeAnnonce(argument: _coinche_MakeAnnonceRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_coinche_MakeAnnonceResponse__Output>): grpc.ClientUnaryCall;
  makeAnnonce(argument: _coinche_MakeAnnonceRequest, callback: grpc.requestCallback<_coinche_MakeAnnonceResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface AnnonceServiceHandlers extends grpc.UntypedServiceImplementation {
  MakeAnnonce: grpc.handleUnaryCall<_coinche_MakeAnnonceRequest__Output, _coinche_MakeAnnonceResponse>;
  
}

export interface AnnonceServiceDefinition extends grpc.ServiceDefinition {
  MakeAnnonce: MethodDefinition<_coinche_MakeAnnonceRequest, _coinche_MakeAnnonceResponse, _coinche_MakeAnnonceRequest__Output, _coinche_MakeAnnonceResponse__Output>
}
