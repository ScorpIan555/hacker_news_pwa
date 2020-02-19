import * as React from 'react';
import { useLinksQuery } from '../generated/graphql';
import { IItem } from '../lib/interfaces/IItem';

interface Props {}

const LinkList: React.FunctionComponent<Props> = ({ children }) => {
  console.log('LinkFeed.props.children:::', children);
  const { data, loading } = useLinksQuery();

  let body = <div>Initial value</div>; // any needs to be switched to a generic here?

  if (loading) {
    body = <div>Loading....</div>;
  } else if (data) {
    let dataLinks: Array<object> = data.links;
    body = (
      <div>
        {dataLinks.map<object>(
          (item: IItem): React.ReactElement<IItem> => {
            console.log('item:::', item);

            return (
              <ul>
                <li>{item.id}</li>
                <li>{item.url}</li>
                <li>{item.description}</li>
                <li>{item.postedBy} </li>
              </ul>
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

export default LinkList;
