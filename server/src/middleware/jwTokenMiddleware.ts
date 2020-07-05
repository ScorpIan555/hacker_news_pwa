import { User } from '../entity/User';
import { sign } from 'jsonwebtoken';

export const createAccessToken = (user: User) => {
  console.log('createAccesstoken:::', user);
  return sign(
    {
      userId: user.id,
      userEmail: user.email,
      linksUserHasVotedFor: user.linksUserHasVotedFor,
    },
    process.env.ACCESS_TOKEN_SECRET!,
    {
      // expiresIn: "15m"
      expiresIn: '1d',
    }
  );
};

export const createRefreshToken = (user: User) => {
  console.log('createRefreshtoken:::', user);
  return sign(
    {
      userId: user.id,
      userEmail: user.email,
      tokenVersion: user.tokenVersion,
      linksUserHasVotedFor: user.linksUserHasVotedFor,
    },
    process.env.REFRESH_TOKEN_SECRET!,
    {
      expiresIn: '7d',
    }
  );
};
