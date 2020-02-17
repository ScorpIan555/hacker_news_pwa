import * as React from "react";
import { useLinksQuery } from "../generated/graphql";
// import { Item } from "../lib/interfaces/Item";

type Item = {
  // items?: String?
  id?: number;
  url?: string;
  description?: string;
  postedBy?: string;
};

const LinkList: React.FunctionComponent<any> = ({ children }) => {
  console.log("LinkFeed.props.children:::", children);
  const { data, loading } = useLinksQuery();

  // let body: any = null;
  let body: any = null;

  if (loading) {
    body = null;
  } else if (data) {
    let dataLinks: Array<object> = data.links;
    body = (
      <div>
        {dataLinks.map<object>(
          (item: any): React.ReactElement<Item> => {
            // console.log("item:::", item);
            // console.log("typeof item:::", typeof item);
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
    body = null;
  }

  console.log("body:", body);
  console.log("type of data:::", data);
  // if (data && typeof data.links === "object") {
  //   // return data.map((item: React.ReactNode) => <div>{item}</div>);
  //   <div>Data:::: {data}</div>;
  // } else {
  //   <div>Links Empty</div>;
  // }

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
