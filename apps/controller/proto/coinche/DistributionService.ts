// Original file: ../shared/grpc/distribution.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { DistributeCardRequest as _coinche_DistributeCardRequest, DistributeCardRequest__Output as _coinche_DistributeCardRequest__Output } from '../coinche/DistributeCardRequest';
import type { DistributeCardResponse as _coinche_DistributeCardResponse, DistributeCardResponse__Output as _coinche_DistributeCardResponse__Output } from '../coinche/DistributeCardResponse';

export interface DistributionServiceClient extends grpc.Client {
  DistributeCard(argument: _coinche_DistributeCardRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_coinche_DistributeCardResponse__Output>): grpc.ClientUnaryCall;
  DistributeCard(argument: _coinche_DistributeCardRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_coinche_DistributeCardResponse__Output>): grpc.ClientUnaryCall;
  DistributeCard(argument: _coinche_DistributeCardRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_coinche_DistributeCardResponse__Output>): grpc.ClientUnaryCall;
  DistributeCard(argument: _coinche_DistributeCardRequest, callback: grpc.requestCallback<_coinche_DistributeCardResponse__Output>): grpc.ClientUnaryCall;
  distributeCard(argument: _coinche_DistributeCardRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_coinche_DistributeCardResponse__Output>): grpc.ClientUnaryCall;
  distributeCard(argument: _coinche_DistributeCardRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_coinche_DistributeCardResponse__Output>): grpc.ClientUnaryCall;
  distributeCard(argument: _coinche_DistributeCardRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_coinche_DistributeCardResponse__Output>): grpc.ClientUnaryCall;
  distributeCard(argument: _coinche_DistributeCardRequest, callback: grpc.requestCallback<_coinche_DistributeCardResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface DistributionServiceHandlers extends grpc.UntypedServiceImplementation {
  DistributeCard: grpc.handleUnaryCall<_coinche_DistributeCardRequest__Output, _coinche_DistributeCardResponse>;
  
}

export interface DistributionServiceDefinition extends grpc.ServiceDefinition {
  DistributeCard: MethodDefinition<_coinche_DistributeCardRequest, _coinche_DistributeCardResponse, _coinche_DistributeCardRequest__Output, _coinche_DistributeCardResponse__Output>
}
