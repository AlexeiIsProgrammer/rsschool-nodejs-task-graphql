import { GraphQLList, GraphQLNonNull } from 'graphql';
import { ProfileType } from '../types/ProfileType.js';
import { Context } from '../types/types.js';
import { UUIDType } from '../types/uuid.js';

export const ProfileQueries = {
  profiles: {
    type: new GraphQLList(ProfileType),
    resolve: (_parent, _args, { prisma }: Context) => prisma.profile.findMany(),
  },

  profile: {
    type: ProfileType,
    args: {
      id: { type: new GraphQLNonNull(UUIDType) },
    },
    resolve: async (_, { id }: { id: string }, { prisma }: Context) =>
      await prisma.profile.findUnique({
        where: { id },
      }),
  },
};
