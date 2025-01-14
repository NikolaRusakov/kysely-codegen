import type { Dialect as KyselyDialect } from 'kysely';
import { DataApiDriverConfig } from 'kysely-data-api/dist/cjs/data-api-driver';
import { DialectName } from '../generator';
import type { Introspector } from './introspector';

export type CreateKyselyDialectOptions = {
  dialectName?: DialectName;
  connectionString: string;
  connection?: DataApiDriverConfig;
  ssl?: boolean;
};

/**
 * A Dialect is the glue between the codegen and the specified database.
 */
export abstract class IntrospectorDialect {
  /**
   * The introspector for the dialect.
   */
  abstract readonly introspector: Introspector<any>;

  /**
   * Creates a Kysely dialect.
   */
  abstract createKyselyDialect(
    options: CreateKyselyDialectOptions,
  ): Promise<KyselyDialect>;
}
