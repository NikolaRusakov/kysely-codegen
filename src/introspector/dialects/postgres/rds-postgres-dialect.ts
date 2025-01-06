import { DataApiDialect } from 'kysely-data-api';
import { DialectName } from '../../../generator';
import type { CreateKyselyDialectOptions } from '../../dialect';
import { IntrospectorDialect } from '../../dialect';
import { DateParser, DEFAULT_DATE_PARSER } from './date-parser';
import { DEFAULT_NUMERIC_PARSER, NumericParser } from './numeric-parser';
import { PostgresIntrospector } from './postgres-introspector';

type RDSPostgresDialectOptions = {
  dateParser?: DateParser;
  defaultSchemas?: string[];
  domains?: boolean;
  numericParser?: NumericParser;
  partitions?: boolean;
};

export class RDSPostgresIntrospectorDialect extends IntrospectorDialect {
  protected readonly options: RDSPostgresDialectOptions;
  override readonly introspector: PostgresIntrospector;

  constructor(options?: RDSPostgresDialectOptions) {
    super();

    this.introspector = new PostgresIntrospector({
      defaultSchemas: options?.defaultSchemas,
      domains: options?.domains,
      partitions: options?.partitions,
    });
    this.options = {
      dateParser: options?.dateParser ?? DEFAULT_DATE_PARSER,
      defaultSchemas: options?.defaultSchemas,
      domains: options?.domains ?? true,
      numericParser: options?.numericParser ?? DEFAULT_NUMERIC_PARSER,
    };
  }

  async createKyselyDialect(options: CreateKyselyDialectOptions) {
    if (options.connection == null) {
      throw new Error('missing RDS Data-api config');
    }

    const dataApi = new DataApiDialect({
      mode: this.parseModeOption(options.dialectName),
      driver: {
        ...options.connection,
      },
    });

    return dataApi;
  }

  parseModeOption(dialectName?: DialectName) {
    switch (dialectName) {
      case 'rds-mysql':
        return 'mysql';
      case 'rds-postgres':
        return 'postgres';
      default:
        return 'postgres';
    }
  }
}
