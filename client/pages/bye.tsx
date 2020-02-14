import React from "react";
import { useByeQuery } from "../generated/graphql";

export default () => {
  const { data, loading, error } = useByeQuery({
    // fetchPolicy: "cache-first" // default, reminder to check this option for each query hook
  });

  if (loading) {
    return <div>loading...</div>;
  }

  if (error) {
    console.log(error);
    return <div>err</div>;
  }

  if (!data) {
    return <div>no data</div>;
  }

  return <div>{data.bye}</div>;
};
