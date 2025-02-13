import type { ByteArray } from 'viem';

export interface Message {
  message: string | ByteArray;
  messageHash: `0x${string}`;
  v: bigint;
  r: `0x${string}`;
  s: `0x${string}`;
  signature: `0x${string}`;
}
