import { GraphQLList, GraphQLNonNull } from 'graphql';
import { MemberType } from '../types/MemberType.js';
import { Context } from '../types/types.js';
import { MemberTypeId } from '../types/MemberTypeId.js';

export const MemberQueries = {
  memberTypes: {
    type: new GraphQLList(MemberType),
    resolve: (_, _args, { prisma }: Context) => prisma.memberType.findMany(),
  },

  memberType: {
    type: MemberType,
    args: {
      id: { type: new GraphQLNonNull(MemberTypeId) },
    },
    resolve: async (_, { id }: { id: string }, { prisma }: Context) =>
      await prisma.memberType.findUnique({
        where: { id },
      }),
  },
};
