import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { CoincheServiceClient as _coinche_CoincheServiceClient, CoincheServiceDefinition as _coinche_CoincheServiceDefinition } from './coinche/CoincheService';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  coinche: {
    CoincheRequest: MessageTypeDefinition
    CoincheResponse: MessageTypeDefinition
    CoincheService: SubtypeConstructor<typeof grpc.Client, _coinche_CoincheServiceClient> & { service: _coinche_CoincheServiceDefinition }
    EmitEventRequest: MessageTypeDefinition
    EmitEventResponse: MessageTypeDefinition
    FetchEventsRequest: MessageTypeDefinition
    FetchEventsResponse: MessageTypeDefinition
    GameEvent: MessageTypeDefinition
    JoinRequest: MessageTypeDefinition
    JoinResponse: MessageTypeDefinition
    LeaveRequest: MessageTypeDefinition
    LeaveResponse: MessageTypeDefinition
    SubscribeEventsRequest: MessageTypeDefinition
  }
}

