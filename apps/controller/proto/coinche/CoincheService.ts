// Original file: ../shared/grpc/coinche.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { CoincheRequest as _coinche_CoincheRequest, CoincheRequest__Output as _coinche_CoincheRequest__Output } from '../coinche/CoincheRequest';
import type { CoincheResponse as _coinche_CoincheResponse, CoincheResponse__Output as _coinche_CoincheResponse__Output } from '../coinche/CoincheResponse';
import type { EmitEventRequest as _coinche_EmitEventRequest, EmitEventRequest__Output as _coinche_EmitEventRequest__Output } from '../coinche/EmitEventRequest';
import type { EmitEventResponse as _coinche_EmitEventResponse, EmitEventResponse__Output as _coinche_EmitEventResponse__Output } from '../coinche/EmitEventResponse';
import type { FetchEventsRequest as _coinche_FetchEventsRequest, FetchEventsRequest__Output as _coinche_FetchEventsRequest__Output } from '../coinche/FetchEventsRequest';
import type { FetchEventsResponse as _coinche_FetchEventsResponse, FetchEventsResponse__Output as _coinche_FetchEventsResponse__Output } from '../coinche/FetchEventsResponse';
import type { GameEvent as _coinche_GameEvent, GameEvent__Output as _coinche_GameEvent__Output } from '../coinche/GameEvent';
import type { JoinRequest as _coinche_JoinRequest, JoinRequest__Output as _coinche_JoinRequest__Output } from '../coinche/JoinRequest';
import type { JoinResponse as _coinche_JoinResponse, JoinResponse__Output as _coinche_JoinResponse__Output } from '../coinche/JoinResponse';
import type { LeaveRequest as _coinche_LeaveRequest, LeaveRequest__Output as _coinche_LeaveRequest__Output } from '../coinche/LeaveRequest';
import type { LeaveResponse as _coinche_LeaveResponse, LeaveResponse__Output as _coinche_LeaveResponse__Output } from '../coinche/LeaveResponse';
import type { SubscribeEventsRequest as _coinche_SubscribeEventsRequest, SubscribeEventsRequest__Output as _coinche_SubscribeEventsRequest__Output } from '../coinche/SubscribeEventsRequest';

export interface CoincheServiceClient extends grpc.Client {
  Coinche(argument: _coinche_CoincheRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_coinche_CoincheResponse__Output>): grpc.ClientUnaryCall;
  Coinche(argument: _coinche_CoincheRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_coinche_CoincheResponse__Output>): grpc.ClientUnaryCall;
  Coinche(argument: _coinche_CoincheRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_coinche_CoincheResponse__Output>): grpc.ClientUnaryCall;
  Coinche(argument: _coinche_CoincheRequest, callback: grpc.requestCallback<_coinche_CoincheResponse__Output>): grpc.ClientUnaryCall;
  coinche(argument: _coinche_CoincheRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_coinche_CoincheResponse__Output>): grpc.ClientUnaryCall;
  coinche(argument: _coinche_CoincheRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_coinche_CoincheResponse__Output>): grpc.ClientUnaryCall;
  coinche(argument: _coinche_CoincheRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_coinche_CoincheResponse__Output>): grpc.ClientUnaryCall;
  coinche(argument: _coinche_CoincheRequest, callback: grpc.requestCallback<_coinche_CoincheResponse__Output>): grpc.ClientUnaryCall;
  
  EmitEvent(argument: _coinche_EmitEventRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_coinche_EmitEventResponse__Output>): grpc.ClientUnaryCall;
  EmitEvent(argument: _coinche_EmitEventRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_coinche_EmitEventResponse__Output>): grpc.ClientUnaryCall;
  EmitEvent(argument: _coinche_EmitEventRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_coinche_EmitEventResponse__Output>): grpc.ClientUnaryCall;
  EmitEvent(argument: _coinche_EmitEventRequest, callback: grpc.requestCallback<_coinche_EmitEventResponse__Output>): grpc.ClientUnaryCall;
  emitEvent(argument: _coinche_EmitEventRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_coinche_EmitEventResponse__Output>): grpc.ClientUnaryCall;
  emitEvent(argument: _coinche_EmitEventRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_coinche_EmitEventResponse__Output>): grpc.ClientUnaryCall;
  emitEvent(argument: _coinche_EmitEventRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_coinche_EmitEventResponse__Output>): grpc.ClientUnaryCall;
  emitEvent(argument: _coinche_EmitEventRequest, callback: grpc.requestCallback<_coinche_EmitEventResponse__Output>): grpc.ClientUnaryCall;
  
  FetchEvents(argument: _coinche_FetchEventsRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_coinche_FetchEventsResponse__Output>): grpc.ClientUnaryCall;
  FetchEvents(argument: _coinche_FetchEventsRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_coinche_FetchEventsResponse__Output>): grpc.ClientUnaryCall;
  FetchEvents(argument: _coinche_FetchEventsRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_coinche_FetchEventsResponse__Output>): grpc.ClientUnaryCall;
  FetchEvents(argument: _coinche_FetchEventsRequest, callback: grpc.requestCallback<_coinche_FetchEventsResponse__Output>): grpc.ClientUnaryCall;
  fetchEvents(argument: _coinche_FetchEventsRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_coinche_FetchEventsResponse__Output>): grpc.ClientUnaryCall;
  fetchEvents(argument: _coinche_FetchEventsRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_coinche_FetchEventsResponse__Output>): grpc.ClientUnaryCall;
  fetchEvents(argument: _coinche_FetchEventsRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_coinche_FetchEventsResponse__Output>): grpc.ClientUnaryCall;
  fetchEvents(argument: _coinche_FetchEventsRequest, callback: grpc.requestCallback<_coinche_FetchEventsResponse__Output>): grpc.ClientUnaryCall;
  
  JoinGame(argument: _coinche_JoinRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_coinche_JoinResponse__Output>): grpc.ClientUnaryCall;
  JoinGame(argument: _coinche_JoinRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_coinche_JoinResponse__Output>): grpc.ClientUnaryCall;
  JoinGame(argument: _coinche_JoinRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_coinche_JoinResponse__Output>): grpc.ClientUnaryCall;
  JoinGame(argument: _coinche_JoinRequest, callback: grpc.requestCallback<_coinche_JoinResponse__Output>): grpc.ClientUnaryCall;
  joinGame(argument: _coinche_JoinRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_coinche_JoinResponse__Output>): grpc.ClientUnaryCall;
  joinGame(argument: _coinche_JoinRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_coinche_JoinResponse__Output>): grpc.ClientUnaryCall;
  joinGame(argument: _coinche_JoinRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_coinche_JoinResponse__Output>): grpc.ClientUnaryCall;
  joinGame(argument: _coinche_JoinRequest, callback: grpc.requestCallback<_coinche_JoinResponse__Output>): grpc.ClientUnaryCall;
  
  LeaveGame(argument: _coinche_LeaveRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_coinche_LeaveResponse__Output>): grpc.ClientUnaryCall;
  LeaveGame(argument: _coinche_LeaveRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_coinche_LeaveResponse__Output>): grpc.ClientUnaryCall;
  LeaveGame(argument: _coinche_LeaveRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_coinche_LeaveResponse__Output>): grpc.ClientUnaryCall;
  LeaveGame(argument: _coinche_LeaveRequest, callback: grpc.requestCallback<_coinche_LeaveResponse__Output>): grpc.ClientUnaryCall;
  leaveGame(argument: _coinche_LeaveRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_coinche_LeaveResponse__Output>): grpc.ClientUnaryCall;
  leaveGame(argument: _coinche_LeaveRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_coinche_LeaveResponse__Output>): grpc.ClientUnaryCall;
  leaveGame(argument: _coinche_LeaveRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_coinche_LeaveResponse__Output>): grpc.ClientUnaryCall;
  leaveGame(argument: _coinche_LeaveRequest, callback: grpc.requestCallback<_coinche_LeaveResponse__Output>): grpc.ClientUnaryCall;
  
  SubscribeEvents(argument: _coinche_SubscribeEventsRequest, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_coinche_GameEvent__Output>;
  SubscribeEvents(argument: _coinche_SubscribeEventsRequest, options?: grpc.CallOptions): grpc.ClientReadableStream<_coinche_GameEvent__Output>;
  subscribeEvents(argument: _coinche_SubscribeEventsRequest, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_coinche_GameEvent__Output>;
  subscribeEvents(argument: _coinche_SubscribeEventsRequest, options?: grpc.CallOptions): grpc.ClientReadableStream<_coinche_GameEvent__Output>;
  
}

export interface CoincheServiceHandlers extends grpc.UntypedServiceImplementation {
  Coinche: grpc.handleUnaryCall<_coinche_CoincheRequest__Output, _coinche_CoincheResponse>;
  
  EmitEvent: grpc.handleUnaryCall<_coinche_EmitEventRequest__Output, _coinche_EmitEventResponse>;
  
  FetchEvents: grpc.handleUnaryCall<_coinche_FetchEventsRequest__Output, _coinche_FetchEventsResponse>;
  
  JoinGame: grpc.handleUnaryCall<_coinche_JoinRequest__Output, _coinche_JoinResponse>;
  
  LeaveGame: grpc.handleUnaryCall<_coinche_LeaveRequest__Output, _coinche_LeaveResponse>;
  
  SubscribeEvents: grpc.handleServerStreamingCall<_coinche_SubscribeEventsRequest__Output, _coinche_GameEvent>;
  
}

export interface CoincheServiceDefinition extends grpc.ServiceDefinition {
  Coinche: MethodDefinition<_coinche_CoincheRequest, _coinche_CoincheResponse, _coinche_CoincheRequest__Output, _coinche_CoincheResponse__Output>
  EmitEvent: MethodDefinition<_coinche_EmitEventRequest, _coinche_EmitEventResponse, _coinche_EmitEventRequest__Output, _coinche_EmitEventResponse__Output>
  FetchEvents: MethodDefinition<_coinche_FetchEventsRequest, _coinche_FetchEventsResponse, _coinche_FetchEventsRequest__Output, _coinche_FetchEventsResponse__Output>
  JoinGame: MethodDefinition<_coinche_JoinRequest, _coinche_JoinResponse, _coinche_JoinRequest__Output, _coinche_JoinResponse__Output>
  LeaveGame: MethodDefinition<_coinche_LeaveRequest, _coinche_LeaveResponse, _coinche_LeaveRequest__Output, _coinche_LeaveResponse__Output>
  SubscribeEvents: MethodDefinition<_coinche_SubscribeEventsRequest, _coinche_GameEvent, _coinche_SubscribeEventsRequest__Output, _coinche_GameEvent__Output>
}
