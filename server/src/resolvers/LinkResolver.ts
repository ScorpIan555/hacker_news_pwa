import {
  Resolver,
  Mutation,
  Arg,
  Ctx,
  UseMiddleware,
  Query,
  Field,
  InputType,
  Int,
} from 'type-graphql';
import { Link } from '../entity';
import { MyContext } from '../lib/interfaces/MyContext';
import { isAuth } from '../middleware/isAuthMiddleware';

@InputType()
class LinkInput {
  @Field()
  url: string;

  @Field()
  description: string;
}

@InputType()
class LinkUpdateInput {
  @Field(() => String, { nullable: true })
  url?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  // @Field(() => [String], { nullable: true })
  // voters?: string[];

  @Field(() => Int, { nullable: true })
  votes?: number;
}

@InputType()
class VoteInput {
  @Field(() => String, { nullable: true })
  votes: number;
}

@Resolver()
export class LinkResolver {
  //
  // // // //
  // mutations
  @Mutation(() => Link)
  @UseMiddleware(isAuth)
  async createLink(
    @Ctx() { payload }: MyContext,
    @Arg('options', () => LinkInput) options: LinkInput
  ) {
    console.log('LinkResolver.payload (User) object:::', payload);
    const postedBy: any = payload?.userEmail;
    const { url, description } = options;

    try {
      const link = await Link.create({ url, description, postedBy }).save();
      console.log('LinkResolver.postedBy:::', postedBy);
      console.log('link:::', link);

      return link;
    } catch (error) {
      console.log(error);
      console.error(error);
      return false;
    }
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async updateLink(
    @Ctx() { payload }: MyContext,
    @Arg('id', () => Int) id: number,
    @Arg('input', () => LinkUpdateInput) input: LinkUpdateInput
  ) {
    console.log('LinkResolver.payload (User) object:::', payload);
    const updatedBy: any = payload?.userEmail;
    console.log('updatedBy:::', updatedBy);
    //
    // const link = await Link.update({ id }, input).save();
    try {
      await Link.update({ id }, input);
      // return true if update successfull
      return true;
    } catch (error) {
      console.log('LinkResolver.updateLink.error:::', error);
      console.error('LinkResolver.updateLink.error:::', error);
      return false;
    }
  }

  // @Mutation(() => Boolean) // look at updateLink and copy over what's needed out of that...
  // async deleteLink(@Arg('id', () => Int) id: number) {
  //   await Link.delete({ id });
  //   return true;
  // }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async voteForLink(
    @Ctx() { payload }: MyContext,
    @Arg('id', () => Int) id: number
    // @Arg('input', () => LinkUpdateInput) input: LinkUpdateInput
  ) {
    console.log('payload:::', payload);
    // type LinkResult
    let link: Link | undefined = await Link.findOne({ id });
    let user = payload;
    /*
      The user object will include an array of links the user's already voted for
      Could check that #id vs the #id here.

    */

    // let userId: number = parseInt(user.userId);

    if (link != undefined) {
      let votes: number = link.votes;
      console.log('votes1:::', votes);
      votes++;
      console.log('votes2:::', votes);

      let input: VoteInput = {
        votes: votes,
      };

      try {
        await Link.update({ id }, input);
        console.log('link:::', link);
        // console.log('newLink:::', newLink);
        // return newLink;
        return true;
      } catch (error) {
        console.log('error writing to db');
        console.log('error::: ', error);
        return false;
      }

      //   console.log('LinkResolver.input:::', input);
      //   return input;
      // } catch (error) {
      //   console.log('some kind of error:', error);
      //   let input: string = 'Error';
      //   return input;
      //   // aert('ERROR!   ' + error);
      // }

      // try {
      //   await Link.update({ id: userId }, link);
      //   // await Link.update({ id }, input);
      //   // return true if update successfull
      //   return true;
      // } catch (error) {
      //   console.log('LinkResolver.vote.error:::', error);
      //   console.error('LinkResolver.vote.error:::', error);
      //   return false;
      // }

      console.log('user', user);

      console.log('link:::', link);

      return true;
    } else {
      return false;
    }

    // console.log('vote payload:::', payload);
    // console.log('vote payload:::', payload?.userEmail);
    // console.log('type of link', typeof link);
    // console.log('type of link.voters', typeof link?.voters);
    // console.log('type of link.createdAt', typeof link?.createdAt);
    // // let user: any = payload?.userEmail;  // need the whole user obj becasue need to add something to track the votes
    // let user: any = payload;
    // console.log('link:::', link);
    // console.log('user:::', user);
    // let linkVoters = link?.voters;
    // console.log('linkVotes - type:::', typeof link?.voters);
    // console.log('linkVotes :::', linkVoters);

    // let linkV: any = link?.votes;
    // let voted: any = linkV + 1;
    // let votersArray: Array<string> = [];

    // votersArray = link?.voters != undefined ? link?.voters : ['fish'];
    // console.log('votersArray - 1:::', votersArray);
    // console.log('type of votersArray - 1:::', typeof votersArray);
    // // console.log(
    // //   'user.userEmail in votersArray???',
    // //   user.userEmail in votersArray
    // // );

    // {
    //   user.userEmail in votersArray
    //     ? console.log('error, user already voted for this')
    //     : votersArray.push(user.userEmail);
    // }

    // // {
    // //   link?.voters != undefined
    // //     ?
    // //     : votersArray.push(user.userEmail);
    // // }

    // // let linkVotesArray = linkVotes?.split(',');
    // // let newCount = linkVotesArray?.push(user);
    // // let newCount = linkVotes;

    // console.log('linkV::', linkV);
    // console.log('voted::', voted);
    // console.log('Link::', link);
    // console.log('user:::', user);

    // // return newCount;
    // return true;
  }

  @Query(() => [Link])
  async links(): Promise<[Link]> {
    const linkFromLinks: any = await Link.find();
    // console.log('linkFromLinks:::', linkFromLinks);
    return linkFromLinks;
  }
}
