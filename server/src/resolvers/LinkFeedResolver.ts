import { Resolver, Query, Arg, Int } from 'type-graphql';
import { Link } from '../entity';

@Resolver()
export class LinkFeedResolver {
  @Query(() => [Link])
  async linkFeed(
    @Arg('limit', () => Int) limit: number,
    @Arg('skip', () => Int) skip: number
  ) {
    // const test:any = (await Link.find()).limit()

    // console.log('test:::', test)

    const linkFeed = await Link.find({
      order: {
        id: -1,
      },
      take: limit,
      skip: skip,
    });

    console.log('linkFeeddde.limit | skip:::', limit, skip);
    return linkFeed;
  }
}
