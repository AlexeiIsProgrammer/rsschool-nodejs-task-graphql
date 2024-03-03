import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { GraphQLObjectType, GraphQLSchema, graphql, parse, validate } from 'graphql';

import { ProfileMutations } from './mutations/ProfileMutations.js';
import { PostMutations } from './mutations/PostMutations.js';
import { UserMutations } from './mutations/UserMutation.js';
import { MemberQueries } from './queries/MemberQueries.js';
import { ProfileQueries } from './queries/ProfileQueries.js';
import { PostQueries } from './queries/PostQueries.js';
import { UserQueries } from './queries/UserQueries.js';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import depthLimit from 'graphql-depth-limit';

const Query = new GraphQLObjectType({
  name: 'Query',
  description: 'Query',
  fields: () => ({
    ...UserQueries,
    ...PostQueries,
    ...ProfileQueries,
    ...MemberQueries,
  }),
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Mutation',
  fields: () => ({
    ...UserMutations,
    ...PostMutations,
    ...ProfileMutations,
  }),
});

const appScheme = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    handler: async ({ body: { query, variables } }) => {
      const errors = validate(appScheme, parse(query), [depthLimit(5)]);

      if (errors.length) {
        return { errors };
      }

      return await graphql({
        schema: appScheme,
        source: query,
        variableValues: variables,
      });
    },
  });
};

export default plugin;
