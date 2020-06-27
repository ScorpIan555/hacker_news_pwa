import {
  Resolver,
  Mutation,
  Arg,
  Ctx,
  UseMiddleware,
  // Query,
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

  @Mutation(() => Boolean) // look at updateLink and copy over what's needed out of that...
  async deleteLink(@Arg('id', () => Int) id: number) {
    await Link.delete({ id });
    return true;
  }

  @Mutation(() => Link)
  @UseMiddleware(isAuth)
  async voteUp(
    @Ctx() { payload }: MyContext,
    @Arg('id', () => Int) id: number
    // @Arg('userId', () => Int) userId: number
    // @Arg('input', () => LinkUpdateInput) input: LinkUpdateInput
  ) {
    console.log('payload:::', payload);
    // type LinkResult
    let link: Link | undefined = await Link.findOne({ id });
    let user = payload;
    console.log('payload.user:::', user);
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
        let res = await Link.update({ id }, input);
        console.log('voteUp.res:::', res);
        // console.log('newLink:::', newLink);
        // return newLink;
        return { id, votes };
      } catch (error) {
        console.log('error writing to db');
        console.log('error::: ', error);
        return false;
      }
    } else {
      console.log('vote not successful'!);
      return false;
    }
  }

  // @Query(() => [Link])
  // async linkFeed(): Promise<[Link]> {
  //   const linkFromLinks: any = await Link.find();
  //   console.log('linkFromLinks:::', linkFromLinks);
  //   return linkFromLinks;
  // }
}
