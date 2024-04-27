/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
  Context,
  Pda,
  PublicKey,
  Signer,
  TransactionBuilder,
  publicKey,
  transactionBuilder,
} from '@metaplex-foundation/umi';
import {
  Serializer,
  mapSerializer,
  struct,
  u32,
} from '@metaplex-foundation/umi/serializers';
import {
  ResolvedAccount,
  ResolvedAccountsWithIndices,
  getAccountMetasAndSigners,
} from '../shared';

// Accounts.
export type AdvanceNonceAccountInstructionAccounts = {
  nonceAccount: PublicKey | Pda;
  recentBlockhashesSysvar?: PublicKey | Pda;
  nonceAuthority: Signer;
};

// Data.
export type AdvanceNonceAccountInstructionData = { discriminator: number };

export type AdvanceNonceAccountInstructionDataArgs = {};

export function getAdvanceNonceAccountInstructionDataSerializer(): Serializer<
  AdvanceNonceAccountInstructionDataArgs,
  AdvanceNonceAccountInstructionData
> {
  return mapSerializer<
    AdvanceNonceAccountInstructionDataArgs,
    any,
    AdvanceNonceAccountInstructionData
  >(
    struct<AdvanceNonceAccountInstructionData>([['discriminator', u32()]], {
      description: 'AdvanceNonceAccountInstructionData',
    }),
    (value) => ({ ...value, discriminator: 4 })
  ) as Serializer<
    AdvanceNonceAccountInstructionDataArgs,
    AdvanceNonceAccountInstructionData
  >;
}

// Instruction.
export function advanceNonceAccount(
  context: Pick<Context, 'programs'>,
  input: AdvanceNonceAccountInstructionAccounts
): TransactionBuilder {
  // Program ID.
  const programId = context.programs.getPublicKey(
    'system',
    '11111111111111111111111111111111'
  );

  // Accounts.
  const resolvedAccounts = {
    nonceAccount: {
      index: 0,
      isWritable: true as boolean,
      value: input.nonceAccount ?? null,
    },
    recentBlockhashesSysvar: {
      index: 1,
      isWritable: false as boolean,
      value: input.recentBlockhashesSysvar ?? null,
    },
    nonceAuthority: {
      index: 2,
      isWritable: false as boolean,
      value: input.nonceAuthority ?? null,
    },
  } satisfies ResolvedAccountsWithIndices;

  // Default values.
  if (!resolvedAccounts.recentBlockhashesSysvar.value) {
    resolvedAccounts.recentBlockhashesSysvar.value = publicKey(
      'SysvarRecentB1ockHashes11111111111111111111'
    );
  }

  // Accounts in order.
  const orderedAccounts: ResolvedAccount[] = Object.values(
    resolvedAccounts
  ).sort((a, b) => a.index - b.index);

  // Keys and Signers.
  const [keys, signers] = getAccountMetasAndSigners(
    orderedAccounts,
    'programId',
    programId
  );

  // Data.
  const data = getAdvanceNonceAccountInstructionDataSerializer().serialize({});

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
