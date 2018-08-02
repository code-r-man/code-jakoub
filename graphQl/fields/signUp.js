import { GraphQLBoolean, GraphQLString, GraphQLNonNull } from 'graphql';

export default {
  description: `
    Registers a new user in the system.
    Currently this endpoint will always return 'New user registered'.
  `,
  type: GraphQLString,
  args: {
    username: {
      description: `\
        The username to register to the database.
      `,
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      description: `\
        The password for the new user.
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
  resolve: (_, { triggerError } = {}) => (
    triggerError ?
      Promise.reject('Internal Server Error') : Promise.resolve('New user registered')
  ),
};
