import { Resolver, Query } from "type-graphql";
import { Link } from "../entity";

@Resolver()
export class LinkFeedResolver {
  @Query(() => [Link])
  linkFeed() // @Arg("url", () => String) url: string,
  // @Arg("description", () => String) description: string
  {
    const linkFeed = Link.find();
    return linkFeed;
  }
}
