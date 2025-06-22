// Original file: ../shared/grpc/points.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { UpdatePointsRequest as _coinche_UpdatePointsRequest, UpdatePointsRequest__Output as _coinche_UpdatePointsRequest__Output } from '../coinche/UpdatePointsRequest';
import type { UpdatePointsResponse as _coinche_UpdatePointsResponse, UpdatePointsResponse__Output as _coinche_UpdatePointsResponse__Output } from '../coinche/UpdatePointsResponse';

export interface PointsServiceClient extends grpc.Client {
  UpdatePoints(argument: _coinche_UpdatePointsRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_coinche_UpdatePointsResponse__Output>): grpc.ClientUnaryCall;
  UpdatePoints(argument: _coinche_UpdatePointsRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_coinche_UpdatePointsResponse__Output>): grpc.ClientUnaryCall;
  UpdatePoints(argument: _coinche_UpdatePointsRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_coinche_UpdatePointsResponse__Output>): grpc.ClientUnaryCall;
  UpdatePoints(argument: _coinche_UpdatePointsRequest, callback: grpc.requestCallback<_coinche_UpdatePointsResponse__Output>): grpc.ClientUnaryCall;
  updatePoints(argument: _coinche_UpdatePointsRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_coinche_UpdatePointsResponse__Output>): grpc.ClientUnaryCall;
  updatePoints(argument: _coinche_UpdatePointsRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_coinche_UpdatePointsResponse__Output>): grpc.ClientUnaryCall;
  updatePoints(argument: _coinche_UpdatePointsRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_coinche_UpdatePointsResponse__Output>): grpc.ClientUnaryCall;
  updatePoints(argument: _coinche_UpdatePointsRequest, callback: grpc.requestCallback<_coinche_UpdatePointsResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface PointsServiceHandlers extends grpc.UntypedServiceImplementation {
  UpdatePoints: grpc.handleUnaryCall<_coinche_UpdatePointsRequest__Output, _coinche_UpdatePointsResponse>;
  
}

export interface PointsServiceDefinition extends grpc.ServiceDefinition {
  UpdatePoints: MethodDefinition<_coinche_UpdatePointsRequest, _coinche_UpdatePointsResponse, _coinche_UpdatePointsRequest__Output, _coinche_UpdatePointsResponse__Output>
}
