// Original file: ../shared/grpc/start_distribution.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { StartDistributionRequest as _coinche_StartDistributionRequest, StartDistributionRequest__Output as _coinche_StartDistributionRequest__Output } from '../coinche/StartDistributionRequest';
import type { StartDistributionResponse as _coinche_StartDistributionResponse, StartDistributionResponse__Output as _coinche_StartDistributionResponse__Output } from '../coinche/StartDistributionResponse';

export interface StartDistributionServiceClient extends grpc.Client {
  StartDistribution(argument: _coinche_StartDistributionRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_coinche_StartDistributionResponse__Output>): grpc.ClientUnaryCall;
  StartDistribution(argument: _coinche_StartDistributionRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_coinche_StartDistributionResponse__Output>): grpc.ClientUnaryCall;
  StartDistribution(argument: _coinche_StartDistributionRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_coinche_StartDistributionResponse__Output>): grpc.ClientUnaryCall;
  StartDistribution(argument: _coinche_StartDistributionRequest, callback: grpc.requestCallback<_coinche_StartDistributionResponse__Output>): grpc.ClientUnaryCall;
  startDistribution(argument: _coinche_StartDistributionRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_coinche_StartDistributionResponse__Output>): grpc.ClientUnaryCall;
  startDistribution(argument: _coinche_StartDistributionRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_coinche_StartDistributionResponse__Output>): grpc.ClientUnaryCall;
  startDistribution(argument: _coinche_StartDistributionRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_coinche_StartDistributionResponse__Output>): grpc.ClientUnaryCall;
  startDistribution(argument: _coinche_StartDistributionRequest, callback: grpc.requestCallback<_coinche_StartDistributionResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface StartDistributionServiceHandlers extends grpc.UntypedServiceImplementation {
  StartDistribution: grpc.handleUnaryCall<_coinche_StartDistributionRequest__Output, _coinche_StartDistributionResponse>;
  
}

export interface StartDistributionServiceDefinition extends grpc.ServiceDefinition {
  StartDistribution: MethodDefinition<_coinche_StartDistributionRequest, _coinche_StartDistributionResponse, _coinche_StartDistributionRequest__Output, _coinche_StartDistributionResponse__Output>
}
