import { GraphQLFloat, GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';

import { UUIDType } from './uuid.js';
import { ProfileType } from './ProfileType.js';
import { Context } from './index.js';
import { PostType } from './PostType.js';

export type User = {
  id: string;
  name: string;
  balance: number;
};

export type Subscription = {
  subscribedToUser: {
    subscriberId: string;
    authorId: string;
  }[];
} & User;

export type Author = {
  userSubscribedTo: {
    subscriberId: string;
    authorId: string;
  }[];
} & User;

export const UserType: GraphQLObjectType = new GraphQLObjectType({
  name: 'User',
  description: 'This represents a user',
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
