import { Resolver, Query } from "type-graphql";
import { Link } from "../entity";

@Resolver()
export class LinkFeedResolver {
  @Query(() => [Link])
  linkFeed() {
    const linkFeed = Link.find();
    return linkFeed;
  }
}
