import { GraphQLFloat, GraphQLInt, GraphQLObjectType } from 'graphql';
import { MemberTypeId as MemberTypeIdGraph } from './MemberTypeId.js';
import { MemberTypeId } from '../../member-types/schemas.js';

export type Member = {
  id: MemberTypeId;
  discount: number;
  postsLimitPerMonth: number;
};

export const MemberType = new GraphQLObjectType({
  name: 'MemberType',
  description: 'Just a member',
  fields: () => ({
    id: { type: MemberTypeIdGraph },
    discount: { type: GraphQLFloat },
    postsLimitPerMonth: { type: GraphQLInt },
  }),
});
