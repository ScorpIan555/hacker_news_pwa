import * as React from "react";

// type Props = {
//   items?: String?
// };

const LinkList: React.FunctionComponent<any> = ({ children }) => {
  console.log("Layout.props.children:::", children);
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
