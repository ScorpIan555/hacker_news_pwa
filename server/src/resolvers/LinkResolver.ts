import {
  Resolver,
  Mutation,
  Arg,
  Ctx,
  UseMiddleware,
  Query,
  Field,
  InputType,
  Int
} from "type-graphql";
import { Link } from "../entity";
import { MyContext } from "../MyContext";
import { isAuth } from "../middleware/isAuthMiddleware";

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
    @Arg("options", () => LinkInput) options: LinkInput
  ) {
    console.log("LinkResolver.payload (User) object:::", payload);
    const postedBy: any = payload?.userEmail;
    const { url, description } = options;

    try {
      const link = await Link.create({ url, description, postedBy }).save();
      console.log("LinkResolver.postedBy:::", postedBy);
      console.log("link:::", link);

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
    @Arg("id", () => Int) id: number,
    @Arg("input", () => LinkUpdateInput) input: LinkUpdateInput
  ) {
    console.log("LinkResolver.payload (User) object:::", payload);
    const updatedBy: any = payload?.userEmail;
    console.log("updatedBy:::", updatedBy);
    //
    // const link = await Link.update({ id }, input).save();
    try {
      await Link.update({ id }, input);
      // return true if update successfull
      return true;
    } catch (error) {
      console.log("LinkResolver.updateLink.error:::", error);
      console.error("LinkResolver.updateLink.error:::", error);
      return false;
    }
  }

  @Mutation(() => Boolean)
  async deleteLink(@Arg("id", () => Int) id: number) {
    await Link.delete({ id });
    return true;
  }

  @Query(() => [Link])
  async links(): Promise<[Link]> {
    const linkFromLinks: any = await Link.find();
    console.log("linkFromLinks:::", linkFromLinks);
    return linkFromLinks;
  }
}
