import { NextPageContext } from "next/dist/next-server/lib/utils";

// import { NextPageContext } from "next-server/dist/lib/utils"

export const isServer = ({ req, res }: NextPageContext): boolean =>
  !!req && !!res;
