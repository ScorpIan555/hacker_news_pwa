import { sign } from 'jsonwebtoken';
import { User } from '../entity/User';

export const createAccessToken = (user: User) => {
  console.log('createAccesstoken:::', user);
  return sign(
    {
      userId: user.id,
      userEmail: user.email,
      linksArray: user.linksArray,
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
      linksArray: user.linksArray,
    },
    process.env.REFRESH_TOKEN_SECRET!,
    {
      expiresIn: '7d',
    }
  );
};
