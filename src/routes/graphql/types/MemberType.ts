import { GraphQLFloat, GraphQLInt, GraphQLObjectType } from 'graphql';
import { MemberTypeId } from './MemberTypeId.js';

export type Member = {
  id: 'basic' | 'business';
  discount: number;
  postsLimitPerMonth: number;
};

export const MemberType = new GraphQLObjectType({
  name: 'MemberType',
  description: 'Just a member',
  fields: () => ({
    id: { type: MemberTypeId },
    discount: { type: GraphQLFloat },
    postsLimitPerMonth: { type: GraphQLInt },
  }),
});
