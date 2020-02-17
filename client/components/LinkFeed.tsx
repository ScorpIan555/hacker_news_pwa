import * as React from "react";
import { useLinksQuery } from "../generated/graphql";
import { Item } from "../lib/interfaces/Item";

const LinkList: React.FunctionComponent<any> = ({ children }) => {
  console.log("LinkFeed.props.children:::", children);
  const { data, loading } = useLinksQuery();

  let body: any = null; // any needs to be switched to a generic here?

  if (loading) {
    body = <div>Loading....</div>;
  } else if (data) {
    let dataLinks: Array<object> = data.links;
    body = (
      <div>
        {dataLinks.map<object>(
          (item: Item): React.ReactElement<Item> => {
            console.log("item:::", item);

            return (
              <div>
                <p>{item.id}</p>
                <p>{item.url}</p>
                <p>{item.description}</p>
                <p>{item.postedBy} </p>
              </div>
            );
          }
        )}
      </div>
    );
  } else {
    body = <div>No links available</div>;
  }

  console.log("body:", body);
  console.log("type of data:::", data);

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
