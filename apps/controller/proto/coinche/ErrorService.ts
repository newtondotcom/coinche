// Original file: ../shared/grpc/error.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { ReportErrorRequest as _coinche_ReportErrorRequest, ReportErrorRequest__Output as _coinche_ReportErrorRequest__Output } from '../coinche/ReportErrorRequest';
import type { ReportErrorResponse as _coinche_ReportErrorResponse, ReportErrorResponse__Output as _coinche_ReportErrorResponse__Output } from '../coinche/ReportErrorResponse';

export interface ErrorServiceClient extends grpc.Client {
  ReportError(argument: _coinche_ReportErrorRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_coinche_ReportErrorResponse__Output>): grpc.ClientUnaryCall;
  ReportError(argument: _coinche_ReportErrorRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_coinche_ReportErrorResponse__Output>): grpc.ClientUnaryCall;
  ReportError(argument: _coinche_ReportErrorRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_coinche_ReportErrorResponse__Output>): grpc.ClientUnaryCall;
  ReportError(argument: _coinche_ReportErrorRequest, callback: grpc.requestCallback<_coinche_ReportErrorResponse__Output>): grpc.ClientUnaryCall;
  reportError(argument: _coinche_ReportErrorRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_coinche_ReportErrorResponse__Output>): grpc.ClientUnaryCall;
  reportError(argument: _coinche_ReportErrorRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_coinche_ReportErrorResponse__Output>): grpc.ClientUnaryCall;
  reportError(argument: _coinche_ReportErrorRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_coinche_ReportErrorResponse__Output>): grpc.ClientUnaryCall;
  reportError(argument: _coinche_ReportErrorRequest, callback: grpc.requestCallback<_coinche_ReportErrorResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface ErrorServiceHandlers extends grpc.UntypedServiceImplementation {
  ReportError: grpc.handleUnaryCall<_coinche_ReportErrorRequest__Output, _coinche_ReportErrorResponse>;
  
}

export interface ErrorServiceDefinition extends grpc.ServiceDefinition {
  ReportError: MethodDefinition<_coinche_ReportErrorRequest, _coinche_ReportErrorResponse, _coinche_ReportErrorRequest__Output, _coinche_ReportErrorResponse__Output>
}
