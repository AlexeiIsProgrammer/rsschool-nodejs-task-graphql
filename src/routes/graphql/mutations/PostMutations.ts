import { GraphQLBoolean, GraphQLNonNull } from 'graphql';
import {
  ChangePost,
  ChangePostInputType,
  CreatePost,
  CreatePostInputType,
  PostType,
} from '../types/PostType.js';
import { Context } from '../types/types.js';
import { UUIDType } from '../types/uuid.js';
import { ProfileType } from '../types/ProfileType.js';

export const PostMutations = {
  createPost: {
    type: PostType,
    description: 'Create a post',
    args: {
      dto: { type: new GraphQLNonNull(CreatePostInputType) },
    },
    resolve: async (_, { dto }: CreatePost, { prisma }: Context) =>
      await prisma.post.create({ data: dto }),
  },

  deletePost: {
    type: GraphQLBoolean,
    description: 'Delete a profile',
    args: {
      id: { type: new GraphQLNonNull(UUIDType) },
    },
    resolve: async (_, { id }: { id: string }, { prisma }: Context) => {
      await prisma.post.delete({ where: { id } });
      return null;
    },
  },

  changePost: {
    type: ProfileType,
    description: 'Change a post',
    args: {
      id: { type: new GraphQLNonNull(UUIDType) },
      dto: { type: new GraphQLNonNull(ChangePostInputType) },
    },
    resolve: async (_, { id, dto }: ChangePost, { prisma }: Context) =>
      await prisma.post.update({
        where: { id },
        data: dto,
      }),
  },
};
