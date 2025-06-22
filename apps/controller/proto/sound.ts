import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { SoundServiceClient as _coinche_SoundServiceClient, SoundServiceDefinition as _coinche_SoundServiceDefinition } from './coinche/SoundService';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  coinche: {
    PlaySoundRequest: MessageTypeDefinition
    PlaySoundResponse: MessageTypeDefinition
    SoundService: SubtypeConstructor<typeof grpc.Client, _coinche_SoundServiceClient> & { service: _coinche_SoundServiceDefinition }
  }
}

