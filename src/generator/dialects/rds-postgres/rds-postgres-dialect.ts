import type { DateParser } from '../../../introspector/dialects/postgres/date-parser';
import type { NumericParser } from '../../../introspector/dialects/postgres/numeric-parser';
import { RDSPostgresIntrospectorDialect } from '../../../introspector/dialects/postgres/rds-postgres-dialect';
import type { GeneratorDialect } from '../../dialect';
import { RDSPostgresAdapter } from './rds-postgres-adapter';

type RDSPostgresDialectOptions = {
  dateParser?: DateParser;
  defaultSchemas?: string[];
  domains?: boolean;
  numericParser?: NumericParser;
  partitions?: boolean;
};

export class RDSPostgresDialect
  extends RDSPostgresIntrospectorDialect
  implements GeneratorDialect
{
  readonly adapter: RDSPostgresAdapter;

  constructor(options?: RDSPostgresDialectOptions) {
    super(options);

    this.adapter = new RDSPostgresAdapter({
      dateParser: this.options.dateParser,
      numericParser: this.options.numericParser,
    });
  }
}
