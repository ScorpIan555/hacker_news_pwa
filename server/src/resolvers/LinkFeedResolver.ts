import { Resolver, Query } from 'type-graphql';
import { Link } from '../entity';

@Resolver()
export class LinkFeedResolver {
  @Query(() => [Link])
  async linkFeed() {
    const linkFeed = await Link.find();
    // console.log('linkFeeddde:::', linkFeed);
    return linkFeed;
  }
}
