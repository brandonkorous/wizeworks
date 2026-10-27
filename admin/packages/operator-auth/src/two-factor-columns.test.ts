import { twoFactor } from 'better-auth/plugins';
import { describe, expect, it } from 'vitest';

// The wize_admin tables live in the sparx database, and their migrations live in
// the sparx repo (wizeworks/packages/db/prisma/migrations). This app only talks
// to them, through Kysely, so nothing here notices when a Better Auth upgrade
// grows the twoFactor plugin's schema. 1.6.33 added `failedVerificationCount`
// and `lockedUntil`; every verify then failed with 42703 until sparx migration
// 20270530000037_two_factor_lockout_columns caught up.
//
// These lists are the columns those migrations create. If this fails after a
// Better Auth bump, add a migration in sparx FIRST, release it, then add the
// column here and ship the bump.

const OPERATOR_TWO_FACTOR_COLUMNS = [
  'id',
  'userId',
  'secret',
  'backupCodes',
  'verified',
  'failedVerificationCount',
  'lockedUntil',
];
const OPERATOR_TWO_FACTOR_USER_COLUMNS = ['twoFactorEnabled'];

const schema = twoFactor().schema;

describe('wize_admin has every column the twoFactor plugin writes', () => {
  it('platform_operator_two_factors', () => {
    expect(OPERATOR_TWO_FACTOR_COLUMNS).toEqual(
      expect.arrayContaining(Object.keys(schema.twoFactor.fields))
    );
  });

  it('platform_operators', () => {
    expect(OPERATOR_TWO_FACTOR_USER_COLUMNS).toEqual(
      expect.arrayContaining(Object.keys(schema.user.fields))
    );
  });
});
