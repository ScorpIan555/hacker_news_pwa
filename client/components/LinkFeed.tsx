import * as React from 'react';
import { useLinksQuery } from '../generated/graphql';
import { IItem } from '../lib/typescript/IItem';

interface Props {}

const LinkFeed: React.FunctionComponent<Props> = ({ children }) => {
  console.log('LinkFeed.props.children:::', children);
  const { data, loading } = useLinksQuery();

  let body = <div></div>;

  if (loading) {
    body = <div>Loading....</div>;
  } else if (data) {
    let dataLinks: Array<object> = data.links;
    body = (
      <div>
        {dataLinks.map<object>(
          (item: IItem): React.ReactElement<IItem> => {
            // item.key = `key-${id}`;
            // console.log('item:::', item);

            return (
              <li key={`key + ${item.id}`}>
                <p>{item.id}</p>
                <p>{item.url}</p>
                <p>{item.description}</p>
                <p>{item.postedBy} </p>
              </li>
            );
          }
        )}
      </div>
    );
  } else {
    body = <div>No links available</div>;
  }

  console.log('body:', body);
  console.log('type of data:::', data);

  return (
    <div>
      <div>Link Feed Container</div>
      <div>Link Feed Container</div>
      <div>Link Feed Container</div>
      <div>Link Feed Container</div>
      <div>{body}</div>
    </div>
  );
};

export default LinkFeed;
