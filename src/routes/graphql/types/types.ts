import { PrismaClient } from '@prisma/client';
import DataLoader from 'dataloader';
import { Profile } from './ProfileType.js';
import { Author, Subscription, User } from './UserType.js';
import { Member } from './MemberType.js';
import { Post } from './PostType.js';

export type Loaders = {
  postsLoader: DataLoader<string, Post[]>;
  profileLoader: DataLoader<string, Profile>;
  userLoader: DataLoader<string, User>;
  userSubscribedToLoader: DataLoader<string, Author[]>;
  subscribedToUser: DataLoader<string, Subscription[]>;
  memberTypeLoader: DataLoader<string, Member>;
};

export type Context = {
  prisma: PrismaClient;
  loaders: Loaders;
};
