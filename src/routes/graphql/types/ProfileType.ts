import {
  GraphQLBoolean,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
} from 'graphql';
import { UUIDType } from './uuid.js';
import { MemberType } from '../types/MemberType.js';
import { Context } from './types.js';
import { MemberTypeId as MemberTypeIdGraph } from './MemberTypeId.js';
import { MemberTypeId } from '../../member-types/schemas.js';

export type Profile = {
  id: string;
  isMale: boolean;
  yearOfBirth: number;
  userId: string;
  memberTypeId: MemberTypeId;
};

export type CreateProfile = {
  dto: Omit<Profile, 'id'>;
};

export type ChangeProfile = { id: string } & {
  dto: Omit<Profile, 'id, userId'>;
};

export const ProfileType = new GraphQLObjectType({
  name: 'Profile',
  description: 'Just a profile',
  fields: () => ({
    id: { type: UUIDType },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    userId: { type: UUIDType },
    memberTypeId: { type: MemberTypeIdGraph },

    memberType: {
      type: MemberType,
      resolve: async (parent: Profile, _, { loaders: { memberTypeLoader } }: Context) =>
        memberTypeLoader.load(parent.memberTypeId),
    },
  }),
});

export const CreateProfileInputType = new GraphQLInputObjectType({
  name: 'CreateProfileInput',
  fields: () => ({
    isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
    yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },
    userId: { type: new GraphQLNonNull(UUIDType) },
    memberTypeId: { type: new GraphQLNonNull(MemberTypeIdGraph) },
  }),
});

export const ChangeProfileInputType = new GraphQLInputObjectType({
  name: 'ChangeProfileInput',
  fields: () => ({
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    memberTypeId: { type: MemberTypeIdGraph },
  }),
});
