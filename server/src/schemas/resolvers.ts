import User from '../models/User.js';
import { signToken, AuthenticationError } from '../utils/auth.js';

const resolvers = {
  Query: {
    me: async (_parent: any, _args: any, context: any) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('savedBooks');
      }
      throw new AuthenticationError('You need to be logged in.');
    },
  },
  Mutation: {
    addUser: async (_parent: any, { input }: { input: { username: string; email: string; password: string } }) => {
      const user = await User.create(input);
    
      // Pass the `user` object to signToken
      const token = signToken(user.username, user.email, user._id);

    
      return { token, user };
    },

    login: async (_parent: any, { email, password }: { email: string; password: string }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Can't find this user.");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Wrong password.');
      }

      const token = signToken(user.username, user.email, user._id);


      return { token, user };
    },

    saveBook: async (_parent: any, { input }: { input: { bookId: string; authors: string[]; description: string; title: string; image: string; link: string } }, context: any) => {
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in.');
      }

      const updatedUser = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $addToSet: { savedBooks: input } },
        { new: true, runValidators: true }
      );

      return updatedUser;
    },

    removeBook: async (_parent: any, { bookId }: { bookId: string }, context: any) => {
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in.');
      }

      const updatedUser = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { savedBooks: { bookId } } },
        { new: true }
      );

      return updatedUser;
    },
  },
};

export default resolvers;
