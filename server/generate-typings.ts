import { GraphQLDefinitionsFactory } from '@nestjs/graphql'
import { join } from 'path';

const definitionsFactory = new GraphQLDefinitionsFactory();

definitionsFactory.generate({
    typePaths: ['src/schema/types/*.graphql', 'src/schema/enums/*.graphql', './src/schema/*.graphql'],
    path: join(process.cwd(), 'src/graphql.schema.ts'),
    emitTypenameField: true,
    debug: true
})