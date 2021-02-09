import { compare, hash } from 'bcryptjs';
import { verify } from 'jsonwebtoken';
import {
  Arg,


  Ctx, Field,


  Int, Mutation,

  ObjectType, Query, Resolver,






  UseMiddleware
} from 'type-graphql';
import { getConnection } from 'typeorm';
import { User } from '../entity/User';
import { MyContext } from '../lib/interfaces/MyContext';
import { isAuth } from '../middleware/isAuthMiddleware';
import {
  createAccessToken, createRefreshToken
} from '../middleware/jwTokenMiddleware';
import { sendRefreshToken } from '../sendRefreshToken';

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



  
  @Mutation(() => Boolean)
  // @UseMiddleware(isAuth)
  async updateLinksArray(
    @Arg('id', () => Int) id: number,
    @Arg('linkId', () => Int) linkId: number, // this was userId originally, double-check
    @Arg('email') email: string,
    @Ctx() { payload }: MyContext
    // @Ctx() { payload }: MyContext
  ) {
    console.log('id, userId, email:::', linkId, id, email);
    console.log('payload:::', payload);

    //  return user
    try {
      const user = await User.findOne({ where: { email } });
      console.log('UserResolver.user:::', user);

      // typecheck user object, eliminate undefined/null objects
      if (!user) {
        throw new Error('could not find user');
      }
      // destructure out linksArray field from user object
      const { linksArray } = user;

      console.log('user object::: ', user, linksArray);

      if (linksArray.length === 0) {
        linksArray.push(linkId);
        console.log('linksArray::: ', linksArray);
        await User.update({ id }, { linksArray: linksArray });
        return true;
      }

      if (linksArray.length > 0) {
        let idCheck = linksArray.includes(linkId);
        // console.log('linksArray:::', linksArray);
        // console.log('linksArray:::', typeof linksArray);
        // console.log('linksrray isArray?::', Array.isArray(linksArray))
        // console.log('idCheck:::', idCheck);
        // console.log('idCheck-typeof:::', typeof idCheck)
        //
        //
        if (idCheck === false) {
          linksArray.push(linkId);
          console.log('linksArray.idCheck was false::: ', linksArray);
          await User.update({ id }, { linksArray: linksArray });
          return true;
        }
        //
        //
        if (idCheck === true) {
          // alert('this item exists already in this array ');
          console.log('linksArray::: ', linksArray);
          return false; // @TODO look into sending back a message to pass to client
        }
      } else {
        console.log('ELSE!!! WTF????');
        return false;
      }

      return true;
    } catch (err) {
      console.log('error::', err);
      return false;
    }
  }



  // removeLinkFromLinksArray
  @Mutation(() => Boolean)
  // @UseMiddleware(isAuth)
  async removeLinkFromLinksArray(
    @Arg('id', () => Int) id: number,
    @Arg('linkId', () => Int) linkId: number, // this was userId originally, double-check
    @Arg('email') email: string,
    @Ctx() { payload }: MyContext
    // @Ctx() { payload }: MyContext
  ) {
    console.log('removeLinkFromLinksArray.id, userId, email:::', linkId, id, email);
    console.log('removeLinkFromLinksArray.payload:::', payload);

    //  return user
    try {
      const user = await User.findOne({ where: { email } });
      console.log('removeLinkFromLinksArray.UserResolver.user:::', user);

      // typecheck user object, eliminate undefined/null objects
      if (!user) {
        throw new Error('could not find user');
      }
      // destructure out linksArray field from user object
      const { linksArray } = user;

      console.log('removeLinkFromLinksArray.user object::: ', user, linksArray);

      // if (linksArray.length === 0) {
      //   linksArray.push(linkId);
      //   console.log('linksArray::: ', linksArray);
      //   await User.update({ id }, { linksArray: linksArray });
      //   return true;
      // }

      if (linksArray.length > 0) {
        let idCheck = linksArray.includes(linkId);
        // console.log('linksArray:::', linksArray);
        // console.log('linksArray:::', typeof linksArray);
        // console.log('linksrray isArray?::', Array.isArray(linksArray))
        // console.log('idCheck:::', idCheck);
        // console.log('idCheck-typeof:::', typeof idCheck)
        //
        //
        // if (idCheck === false) {
        //   linksArray.push(linkId);
        //   console.log('linksArray.idCheck was false::: ', linksArray);
        //   await User.update({ id }, { linksArray: linksArray });
        //   return true;
        // }
        //
        //
        if (idCheck === true) {
          // alert('this item exists already in this array ');
          // console.log('removeLinkFromLinksArray.linksArray::: ', linksArray);

          // linksArray.push(linkId);
          // console.log('linksArray.idCheck was false::: ', linksArray);
          // await User.update({ id }, { linksArray: linksArray });
          // linksArray.filter(linkId)
          // return true; // @TODO look into sending back a message to pass to client

          try {
            console.log('removeLinkFromLinksArray.linksArray::: ', linksArray);

          // const filterArrayFunction = (linksArray: any, linkId:any) => {
          //   const filt =  linksArray !== linkId
          // }

          function checkAdult(linkId:any) {
            console.log('checkAdult::', linkId, linksArray);
            return linksArray === linkId;
          }

          const filteredArray = linksArray.filter(checkAdult);
          console.log('linksArray.idCheck was false::: ', linksArray);
          console.log('filteredArray.idCheck was false::: ', filteredArray);
          await User.update({ id }, { linksArray: filteredArray });
          // linksArray.filter(linkId)
          return true; // @TODO look into sending back a message to pass to client
          } catch (err) {
            console.log('error::', err);
            return false;
          }
        }
      } else {
        console.log('ELSE!!! WTF????');
        return false;
      }

      return true;
    } catch (err) {
      console.log('error::', err);
      return false;
    }
  }

}
