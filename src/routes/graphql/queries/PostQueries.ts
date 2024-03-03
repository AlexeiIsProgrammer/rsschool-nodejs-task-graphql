import { GraphQLList, GraphQLNonNull } from 'graphql';
import { PostType } from '../types/PostType.js';
import { Context } from '../types/types.js';
import { UUIDType } from '../types/uuid.js';

export const PostQueries = {
  posts: {
    type: new GraphQLList(PostType),
    resolve: (_parent, _args, { prisma }: Context) => prisma.post.findMany(),
  },

  post: {
    type: PostType,
    args: {
      id: { type: new GraphQLNonNull(UUIDType) },
    },
    resolve: async (_, { id }: { id: string }, { prisma }: Context) =>
      await prisma.post.findUnique({
        where: { id },
      }),
  },
};
