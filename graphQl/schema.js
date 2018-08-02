import {
  GraphQLObjectType,
  GraphQLSchema,
} from 'graphql';
import usernameExists from 'graphQl/fields/usernameExists';
import signUp from 'graphQl/fields/signUp';

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    description: `
      This is the root query...
      `,
    fields: {
      usernameExists,
    },
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    description: `
      This is the root mutation...
    `,
    fields: {
      signUp,
    },
  }),
});
