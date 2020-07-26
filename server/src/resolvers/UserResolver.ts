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
  @Mutation(() => User)
  async updateLinksUserHasVotedForField(
    @Arg('id', () => Int) id: number,
    @Arg('userId', () => Int) userId: number,
    @Arg('email') email: string,
    @Ctx() { payload }: MyContext
  ) {
    try {
      // console.log('updateLinksUserHasVotedForField.id:::', id);
      console.log('updateLinksUserHasVotedForField.payload:::', payload);
      console.log('id & email & userId', id, email, userId);
      // console.log(
      //   'updateLinksUserHasVotedForField.payload:::',
      //   payload.userEmail
      // );
      // if (payload != undefined) {
      //   let { userEmail } = payload;

      const user: User | undefined = await User.findOne({ where: { email } });

      // https://stackoverflow.com/questions/47792808/typeorm-update-item-and-return-it

      if (user != undefined) {
        console.log('UserResolver.login.user:::', user);
        let { linksUserHasVotedFor } = user;
        console.log(
          'UserResolver.user.linksUserHasVotedFor:::',
          linksUserHasVotedFor
        );

        let input: any = {
          linksUserHasVotedFor: linksUserHasVotedFor,
        };
        /*

          Right here, 
          1) need to actually add the bit that'll insert the link id into the field
          2) double check that it's inserted correctly
          3) return newly-updated user object
          4) double-check that this is going back out to the client if/as needed.


        */

        if (linksUserHasVotedFor === '[]') {
          let userIdString: string = userId.toString();
          console.log('userIdString', userIdString);
          try {
            // let res = await User.update({ id: userIdString }, input);
            console.log(' id ????::', id, userId);
            input = {
              linksUserHasVotedFor: '[' + id + ']',
            };
            let res = await User.update({ id: userId }, input);
            let find = await User.findOne(userId);
            // console.log('linkUserhasVotedFor.res::', res);
            console.log('linkUserhasVotedFor.res::', res);
            console.log('find:::', find);
            return find;
          } catch (error) {
            console.log('linksUserHasVotedFor.error', error);
            console.error(error);
          }
        }

        console.log(
          'linksUserHAsVotedFor.length::',
          linksUserHasVotedFor.length
        );

        if (
          typeof linksUserHasVotedFor === 'string' &&
          linksUserHasVotedFor.length > 3
        ) {
          console.log(
            'length of linksUserHAsVotedFor',
            linksUserHasVotedFor.length
          );
          console.log('linksUserHAsVotedFor', linksUserHasVotedFor);

          // input = {
          //   linksUserHasVotedFor: '[' + id + ']',
          // };

          //
          //
          //
          //
          // paste the code form LinkREsolver here

          //
          //

          let linksUserAlreadyVotedFor = user.linksUserHasVotedFor;
          console.log('linksUserAlreadyVotedFor1', linksUserAlreadyVotedFor);
          console.log(
            'linksUserAlreadyVotedFor1',
            typeof linksUserAlreadyVotedFor
          );
          let linksUserAlreadyVotedForArray: Array<string> = linksUserAlreadyVotedFor
            .slice(0, linksUserAlreadyVotedFor.length)
            .split(',');
          console.log(
            'linksUserAlreadyVotedFor2',
            linksUserAlreadyVotedForArray
          );
          console.log(
            'linksUserAlreadyVotedFor2',
            typeof linksUserAlreadyVotedForArray
          );

          console.log(
            'linksUserAlreadyVotedForArray::: is array?  ',
            linksUserAlreadyVotedForArray instanceof Array
          );

          let hasUserAlreadyVotedForThisLink: boolean = linksUserAlreadyVotedForArray.includes(
            id.toString()
          );

          if (hasUserAlreadyVotedForThisLink === false) {
            console.log(
              'ok, we are getting close',
              linksUserAlreadyVotedForArray
            );

            //
            /*
              1)  need to check to make sure user hasn't voted for this link yet
              2) need to add the new member to the array
              3) need to convert the array into a string, then return it 
            */
              
            //
            try {
              input = {
                linksUserHasVotedFor: linksUserAlreadyVotedForArray,
              };
              let res = await User.update({ id: userId }, input);
              let find = await User.findOne(userId);
              // console.log('linkUserhasVotedFor.res::', res);
              console.log('linkUserhasVotedFor.res::', res);
              console.log('find:::', find);
              return { id: userId, email, linksUserHasVotedFor };
            } catch (error) {
              console.log('linksUserHasVotedFor.error', error);
              console.error(error);
            }
          } // if(hasUser... === false)
        }
        console.log(
          'line 253 error in User Resolver!!  field didnt meet either criteria'
        );
        return user;
      } else {
        console.log('Error: User not found:::   , ', user);
        throw Error('could not retreive user');
      }
    } catch (err) {
      // let { userEmail, userId, linksUserHasVotedFor } = payload;
      // let user: any = {
      //   id: userId,
      //   email: userEmail,
      //   linksUserHasVotedFor: linksUserHasVotedFor,
      // };
      console.log('error trying to update linksUserHasVotedForField');
      console.error(err);
      return err;
    }
  }

  // // build this out from the clientside first...
  // @Mutation(() => Boolean)
  // async voteUp(
  //   @Arg('id', () => Int) id: number,
  //   // @Arg('userId', () => Int) userId: number)
  //   @Ctx() { payload }: MyContext
  // ) {
  //   // const linksUserHasVotedFor = User.find({id:})
  //   console.log('voteUp.payload:::', payload);
  //   try {
  //     // const { linksUserHasVotedFor } = payload;
  //     console.log('link id:::', id);
  //     // console.log('linksUserHasVotedFor:::  ', linksUserHasVotedFor);
  //     return true;
  //   } catch (error) {
  //     console.log(error);
  //     console.error(error);
  //     return false;
  //   }
  // }
}
