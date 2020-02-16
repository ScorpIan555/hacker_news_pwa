import * as React from "react";
// import { useQuery } from "apollo-react-hooks";

// type Props = {
//   items?: String?
// };

const LinkList: React.FunctionComponent<any> = ({ children }) => {
  console.log("LinkFeed.props.children:::", children);
  return (
    <div>
      <p>Link</p>
      <p>Link</p>
      <p>Link</p>
      <p>Link</p>
    </div>
  );
};

export default LinkList;
