import {
  GraphQLFloat,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import { UUIDType } from './uuid.js';
import { ProfileType } from './ProfileType.js';
import { Context } from './types.js';
import { PostType } from './PostType.js';

export type User = {
  id: string;
  name: string;
  balance: number;
};

type SubscriberId = {
  subscriberId: string;
  authorId: string;
};

export type Subscription = {
  subscribedToUser: SubscriberId[];
} & User;

export type Author = {
  userSubscribedTo: SubscriberId[];
} & User;

export type CreateUser = {
  dto: Omit<User, 'id'>;
};

export type ChangeUser = CreateUser & { id: string };

export const UserType: GraphQLObjectType = new GraphQLObjectType({
  name: 'User',
  description: 'Just a user',
  fields: () => ({
    id: { type: UUIDType },
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },

    profile: {
      type: ProfileType,
      resolve: async ({ id }: User, _, { loaders: { profileLoader } }: Context) =>
        profileLoader.load(id),
    },

    posts: {
      type: new GraphQLList(PostType),
      resolve: async ({ id }: User, _, { loaders: { postsLoader } }: Context) =>
        postsLoader.load(id),
    },

    userSubscribedTo: {
      type: new GraphQLList(UserType),
      resolve: async (
        { id }: User,
        _,
        { loaders: { userSubscribedToLoader } }: Context,
      ) => userSubscribedToLoader.load(id),
    },

    subscribedToUser: {
      type: new GraphQLList(UserType),
      resolve: async ({ id }: User, _, { loaders: { subscribedToUser } }: Context) =>
        subscribedToUser.load(id),
    },
  }),
});

export const CreateUserInputType = new GraphQLInputObjectType({
  name: 'CreateUserInput',
  fields: () => ({
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: new GraphQLNonNull(GraphQLFloat) },
  }),
});

export const ChangeUserInputType = new GraphQLInputObjectType({
  name: 'ChangeUserInput',
  fields: () => ({
    id: { type: UUIDType },
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
  }),
});
