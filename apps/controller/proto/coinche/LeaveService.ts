// Original file: ../shared/grpc/leave.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { LeaveGameRequest as _coinche_LeaveGameRequest, LeaveGameRequest__Output as _coinche_LeaveGameRequest__Output } from '../coinche/LeaveGameRequest';
import type { LeaveGameResponse as _coinche_LeaveGameResponse, LeaveGameResponse__Output as _coinche_LeaveGameResponse__Output } from '../coinche/LeaveGameResponse';

export interface LeaveServiceClient extends grpc.Client {
  LeaveGame(argument: _coinche_LeaveGameRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_coinche_LeaveGameResponse__Output>): grpc.ClientUnaryCall;
  LeaveGame(argument: _coinche_LeaveGameRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_coinche_LeaveGameResponse__Output>): grpc.ClientUnaryCall;
  LeaveGame(argument: _coinche_LeaveGameRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_coinche_LeaveGameResponse__Output>): grpc.ClientUnaryCall;
  LeaveGame(argument: _coinche_LeaveGameRequest, callback: grpc.requestCallback<_coinche_LeaveGameResponse__Output>): grpc.ClientUnaryCall;
  leaveGame(argument: _coinche_LeaveGameRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_coinche_LeaveGameResponse__Output>): grpc.ClientUnaryCall;
  leaveGame(argument: _coinche_LeaveGameRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_coinche_LeaveGameResponse__Output>): grpc.ClientUnaryCall;
  leaveGame(argument: _coinche_LeaveGameRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_coinche_LeaveGameResponse__Output>): grpc.ClientUnaryCall;
  leaveGame(argument: _coinche_LeaveGameRequest, callback: grpc.requestCallback<_coinche_LeaveGameResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface LeaveServiceHandlers extends grpc.UntypedServiceImplementation {
  LeaveGame: grpc.handleUnaryCall<_coinche_LeaveGameRequest__Output, _coinche_LeaveGameResponse>;
  
}

export interface LeaveServiceDefinition extends grpc.ServiceDefinition {
  LeaveGame: MethodDefinition<_coinche_LeaveGameRequest, _coinche_LeaveGameResponse, _coinche_LeaveGameRequest__Output, _coinche_LeaveGameResponse__Output>
}
