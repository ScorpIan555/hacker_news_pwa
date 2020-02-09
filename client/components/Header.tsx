import React from "react";
import { useMeQuery, useLogoutMutation } from "../generated/graphql";
import Link from "next/link";
import { setAccessToken } from "../lib/accessToken";

interface Props {}

export const Header: React.FC<Props> = () => {
  const { data, loading } = useMeQuery();
  const [logout, { client }] = useLogoutMutation();

  let body: any = null;

  if (loading) {
    body = null;
  } else if (data && data.me) {
    body = <div>you are logged in as: {data.me.email}</div>;
  } else {
    body = <div>not logged in</div>;
  }

  return (
    <header>
      <nav className="container">
        <div className="item">
          <Link href="/">
            <a>Home</a>
          </Link>{" "}
          |{" "}
        </div>
        <div className="item">
          <Link href="/register">
            <a>Register</a>
          </Link>{" "}
          |{" "}
        </div>
        <div className="item">
          <Link href="/login">
            <a>Login</a>
          </Link>{" "}
          |{" "}
        </div>
        <div className="item">
          <Link href="/bye">
            <a>bye</a>
          </Link>{" "}
          |{" "}
        </div>
        <div className="">
          {!loading && data && data.me ? (
            <button
              className="item login"
              onClick={async () => {
                await logout();
                setAccessToken("");
                await client!.resetStore();
              }}
            >
              logout
            </button>
          ) : null}
        </div>
      </nav>
      {body}
      <style jsx>{`
        // component global
        background-color: blue;
        color: white;
        width: 100%;
        height: 50px;
        margin: 0px;
        padding: 0px;
        // flex: 1;
        // flex-direction: column

        // classes
        .container {
          display: flex;
        }

        .item {
          flex-basis: ;
        }

        .login {
          order: 0;
          align-self: flex-end;
          width: 20%;
        }
      `}</style>
    </header>
  );
};
