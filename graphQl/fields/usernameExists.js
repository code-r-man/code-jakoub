import { GraphQLBoolean, GraphQLString, GraphQLNonNull } from 'graphql';

export default {
  description: `\
    Checks if a given username already exists or not.
    Current implementation will return always false except for username = 'admin', in which case 
    will return true.
  `,
  type: GraphQLBoolean,
  args: {
    username: {
      description: `\
      The username to check
      `,
      type: new GraphQLNonNull(GraphQLString),
    },
    triggerError: {
      description: `\
        Forces an error to be returned from this endpoint, useful for implementation purposes.
      `,
      type: GraphQLBoolean,
    },
  },
  resolve: (_, { username, triggerError } = {}) => (
    triggerError ?
      Promise.reject('Internal Server Error') : Promise.resolve(username !== 'admin')
  ),
};
