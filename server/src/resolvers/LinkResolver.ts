import extractDomain from 'extract-domain';
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Int,
  Mutation,
  Resolver,
  UseMiddleware,
} from 'type-graphql';
import { Link } from '../entity';
import { MyContext, MyOtherContext } from '../lib/interfaces/MyContext';
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
  domain?: string;

  @Field(() => String, { nullable: true })
  description?: string;

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
    const postedBy: any = payload?.userEmail;
    const { url, description } = options;
    // const domain = getDomainFromUrlString(url)
    const domain = extractDomain(url);
    console.log('domain:::', domain);

    try {
      const link = await Link.create({
        url,
        description,
        domain,
        postedBy,
      }).save();

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
    @Arg('id', () => Int) id: number,
    @Arg('input', () => LinkUpdateInput) input: LinkUpdateInput
  ) {
    try {
      await Link.update({ id }, input);
      // return true if update successfull
      return true;
    } catch (error) {
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
    // @Ctx() { payload }: MyContext,
    @Arg('id', () => Int) id: number
  ) {
    // type LinkResult
    let link: Link | undefined = await Link.findOne({ id });

    // let user = payload;

    /*
      The user object will include an array of links the user's already voted for
      Could check that #id vs the #id here.

    */

    // if (link !== undefined && hasUserAlreadyVotedForThisLink === false) {
    if (link !== undefined) {
      let votes: number = link.votes;

      votes++;

      let input: VoteInput = {
        votes: votes,
      };

      try {
        await Link.update({ id }, input);

        // console.log('newLink:::', newLink);
        // return newLink;
        return { id, votes };
      } catch (error) {
        console.log('error::: ', error);
        return false;
      }
    } else {
      console.log('vote not successful'!);
      let votes = 0;
      return { id, votes };
    }
  }

  @Mutation(() => Link)
  @UseMiddleware(isAuth)
  async voteDown(
    @Ctx() { payload }: MyOtherContext,
    @Arg('id', () => Int) id: number
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

    if (link !== undefined) {
      let votes: number = link.votes;
      let newVotes: number = votes - 1;
      console.log('votes1:::', votes);

      console.log('votes2:::', votes);

      let input: VoteInput = {
        votes: newVotes,
      };

      try {
        let resLink = await Link.update({ id }, input);
        console.log('voteUp.res:::', resLink);
        // console.log('newLink:::', newLink);
        // return newLink;
        return { id, votes, user }; // I wanna see if there's a way to "join" these graphs in this way?
      } catch (error) {
        console.log('error writing to db');
        console.log('error::: ', error);
        return false;
      }
    } else {
      console.log('vote not successful'!);
      // let votes = link?.votes;
      let votes = 0;
      return { id, votes };
    }
  }
}
