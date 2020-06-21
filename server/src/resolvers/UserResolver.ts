import {
  Resolver,
  Query,
  Mutation,
  Arg,
  ObjectType,
  Field,
  Ctx,
  UseMiddleware,
  Int,
} from 'type-graphql';
import { hash, compare } from 'bcryptjs';
import { User } from '../entity/User';
import { MyContext } from '../lib/interfaces/MyContext';
import {
  createRefreshToken,
  createAccessToken,
} from '../middleware/jwTokenMiddleware';
import { isAuth } from '../middleware/isAuthMiddleware';
import { sendRefreshToken } from '../sendRefreshToken';
import { getConnection } from 'typeorm';
import { verify } from 'jsonwebtoken';

// import {AuthenticationError } from 'apollo-server-express'

@ObjectType()
class LoginResponse {
  @Field()
  accessToken: string;
  @Field(() => User)
  user: User;
}

@Resolver()
export class UserResolver {
  @Query(() => String)
  hello() {
    return 'hi!';
  }

  @Query(() => String)
  @UseMiddleware(isAuth)
  bye(@Ctx() { payload }: MyContext) {
    console.log('UserResolver.Query.bye.payload:::', payload);
    return `your user id is: ${payload!.userId}`;
  }

  @Query(() => [User])
  users() {
    return User.find();
  }

  @Query(() => User, { nullable: true })
  async me(@Ctx() context: MyContext) {
    // can probably strike the 'async' after coding is done
    const authorization = context.req.headers['authorization'];
    console.log('authorization:::', authorization);

    if (!authorization) {
      return null;
    }

    try {
      const token = authorization.split(' ')[1];
      const payload: any = verify(token, process.env.ACCESS_TOKEN_SECRET!);
      console.log('UserResolver.payload:::', payload);
      const user = await User.findOne(payload.userId);
      console.log('UserResolver.payload.user:::', user);

      return user;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() { res }: MyContext) {
    sendRefreshToken(res, '');

    return true;
  }

  // @Mutation(() => String)

  @Mutation(() => Boolean)
  async revokeRefreshTokensForUser(@Arg('userId', () => Int) userId: number) {
    await getConnection()
      .getRepository(User)
      .increment({ id: userId }, 'tokenVersion', 1);

    return true;
  }

  @Mutation(() => LoginResponse)
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() { res }: MyContext
  ): Promise<LoginResponse> {
    const user = await User.findOne({ where: { email } });
    console.log('UserResolver.login.user:::', user);

    // need to fix these errors
    // https://www.apollographql.com/docs/apollo-server/data/errors/

    if (!user) {
      throw new Error('could not find user');
    }

    const valid = await compare(password, user.password);

    if (!valid) {
      throw new Error('bad password');
    }

    // login successful

    sendRefreshToken(res, createRefreshToken(user));

    return {
      accessToken: createAccessToken(user),
      user,
    };
  }

  @Mutation(() => LoginResponse)
  async register(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() { res }: MyContext
  ) {
    const hashedPassword = await hash(password, 12);

    try {
      await User.insert({
        email,
        password: hashedPassword,
      });
    } catch (err) {
      console.log(err);
      return false;
    }

    // in order to log in user after registration, we need to return a user value
    //    after checking the ORM, it looks like we do need to make this 2nd call :/
    try {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        throw new Error('could not find user');
      }
      sendRefreshToken(res, createRefreshToken(user));

      return {
        accessToken: createAccessToken(user),
        user,
      };
    } catch (err) {
      console.log('error::', err);
      return err;
    }
  }

  // build this out from the clientside first...
  @Mutation(() => Boolean)
  async voteUp(
    @Arg('id', () => Int) id: number,
    // @Arg('userId', () => Int) userId: number)
    @Ctx() { payload }: MyContext
  ) {
    // const linksUserHasVotedFor = User.find({id:})
    console.log('voteUp.payload:::', payload);
    try {
      // const { linksUserHasVotedFor } = payload;
      console.log('link id:::', id);
      // console.log('linksUserHasVotedFor:::  ', linksUserHasVotedFor);
      return true;
    } catch (error) {
      console.log(error);
      console.error(error);
      return false;
    }
  }
}
