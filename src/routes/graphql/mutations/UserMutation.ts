import { GraphQLBoolean, GraphQLNonNull } from 'graphql';
import {
  ChangeUser,
  ChangeUserInputType,
  CreateUser,
  CreateUserInputType,
  UserType,
} from '../types/UserType.js';
import { Context } from '../types/types.js';
import { UUIDType } from '../types/uuid.js';

export const UserMutations = {
  createUser: {
    type: UserType,
    description: 'Crate a user',
    args: {
      dto: { type: new GraphQLNonNull(CreateUserInputType) },
    },
    resolve: async (_, { dto }: CreateUser, { prisma }: Context) =>
      await prisma.user.create({ data: dto }),
  },

  deleteUser: {
    type: GraphQLBoolean,
    description: 'Delete a user',
    args: {
      id: { type: new GraphQLNonNull(UUIDType) },
    },
    resolve: async (_, { id }: { id: string }, { prisma }: Context) => {
      await prisma.user.delete({ where: { id } });
      return null;
    },
  },

  changeUser: {
    type: UserType,
    description: 'Change a user',
    args: {
      id: { type: new GraphQLNonNull(UUIDType) },
      dto: { type: new GraphQLNonNull(ChangeUserInputType) },
    },
    resolve: async (_, { id, dto }: ChangeUser, { prisma }: Context) =>
      await prisma.user.update({
        where: { id },
        data: dto,
      }),
  },

  subscribeTo: {
    type: UserType,
    args: {
      userId: { type: new GraphQLNonNull(UUIDType) },
      authorId: { type: new GraphQLNonNull(UUIDType) },
    },
    resolve: async (
      _,
      { userId, authorId }: { userId: string; authorId: string },
      { prisma }: Context,
    ) => {
      return await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          userSubscribedTo: {
            create: {
              authorId: authorId,
            },
          },
        },
      });
    },
  },

  unsubscribeFrom: {
    type: GraphQLBoolean,
    args: {
      userId: { type: new GraphQLNonNull(UUIDType) },
      authorId: { type: new GraphQLNonNull(UUIDType) },
    },
    resolve: async (
      _,
      { userId, authorId }: { userId: string; authorId: string },
      { prisma }: Context,
    ) => {
      await prisma.subscribersOnAuthors.delete({
        where: {
          subscriberId_authorId: {
            subscriberId: userId,
            authorId: authorId,
          },
        },
      });
      return true;
    },
  },
};
