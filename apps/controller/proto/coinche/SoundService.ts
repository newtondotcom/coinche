// Original file: ../shared/grpc/sound.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { PlaySoundRequest as _coinche_PlaySoundRequest, PlaySoundRequest__Output as _coinche_PlaySoundRequest__Output } from '../coinche/PlaySoundRequest';
import type { PlaySoundResponse as _coinche_PlaySoundResponse, PlaySoundResponse__Output as _coinche_PlaySoundResponse__Output } from '../coinche/PlaySoundResponse';

export interface SoundServiceClient extends grpc.Client {
  PlaySound(argument: _coinche_PlaySoundRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_coinche_PlaySoundResponse__Output>): grpc.ClientUnaryCall;
  PlaySound(argument: _coinche_PlaySoundRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_coinche_PlaySoundResponse__Output>): grpc.ClientUnaryCall;
  PlaySound(argument: _coinche_PlaySoundRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_coinche_PlaySoundResponse__Output>): grpc.ClientUnaryCall;
  PlaySound(argument: _coinche_PlaySoundRequest, callback: grpc.requestCallback<_coinche_PlaySoundResponse__Output>): grpc.ClientUnaryCall;
  playSound(argument: _coinche_PlaySoundRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_coinche_PlaySoundResponse__Output>): grpc.ClientUnaryCall;
  playSound(argument: _coinche_PlaySoundRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_coinche_PlaySoundResponse__Output>): grpc.ClientUnaryCall;
  playSound(argument: _coinche_PlaySoundRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_coinche_PlaySoundResponse__Output>): grpc.ClientUnaryCall;
  playSound(argument: _coinche_PlaySoundRequest, callback: grpc.requestCallback<_coinche_PlaySoundResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface SoundServiceHandlers extends grpc.UntypedServiceImplementation {
  PlaySound: grpc.handleUnaryCall<_coinche_PlaySoundRequest__Output, _coinche_PlaySoundResponse>;
  
}

export interface SoundServiceDefinition extends grpc.ServiceDefinition {
  PlaySound: MethodDefinition<_coinche_PlaySoundRequest, _coinche_PlaySoundResponse, _coinche_PlaySoundRequest__Output, _coinche_PlaySoundResponse__Output>
}
