// Original file: ../shared/grpc/win_pli.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { WinPliRequest as _coinche_WinPliRequest, WinPliRequest__Output as _coinche_WinPliRequest__Output } from '../coinche/WinPliRequest';
import type { WinPliResponse as _coinche_WinPliResponse, WinPliResponse__Output as _coinche_WinPliResponse__Output } from '../coinche/WinPliResponse';

export interface WinPliServiceClient extends grpc.Client {
  WinPli(argument: _coinche_WinPliRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_coinche_WinPliResponse__Output>): grpc.ClientUnaryCall;
  WinPli(argument: _coinche_WinPliRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_coinche_WinPliResponse__Output>): grpc.ClientUnaryCall;
  WinPli(argument: _coinche_WinPliRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_coinche_WinPliResponse__Output>): grpc.ClientUnaryCall;
  WinPli(argument: _coinche_WinPliRequest, callback: grpc.requestCallback<_coinche_WinPliResponse__Output>): grpc.ClientUnaryCall;
  winPli(argument: _coinche_WinPliRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_coinche_WinPliResponse__Output>): grpc.ClientUnaryCall;
  winPli(argument: _coinche_WinPliRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_coinche_WinPliResponse__Output>): grpc.ClientUnaryCall;
  winPli(argument: _coinche_WinPliRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_coinche_WinPliResponse__Output>): grpc.ClientUnaryCall;
  winPli(argument: _coinche_WinPliRequest, callback: grpc.requestCallback<_coinche_WinPliResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface WinPliServiceHandlers extends grpc.UntypedServiceImplementation {
  WinPli: grpc.handleUnaryCall<_coinche_WinPliRequest__Output, _coinche_WinPliResponse>;
  
}

export interface WinPliServiceDefinition extends grpc.ServiceDefinition {
  WinPli: MethodDefinition<_coinche_WinPliRequest, _coinche_WinPliResponse, _coinche_WinPliRequest__Output, _coinche_WinPliResponse__Output>
}
