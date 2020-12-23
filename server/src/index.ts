import 'dotenv/config';
import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { UserResolver, LinkFeedResolver, LinkResolver } from './resolvers';
import { createConnection } from 'typeorm';
import cookieParser from 'cookie-parser';
import { verify } from 'jsonwebtoken';
import cors from 'cors';
import { User } from './entity';
import { sendRefreshToken } from './sendRefreshToken';
import {
  createAccessToken,
  createRefreshToken,
} from './middleware/jwTokenMiddleware';

(async () => {
  const app = express();
  app.use(
    cors({
      origin: `${process.env.ORIGIN}` , // need to replace with env variable
      credentials: true,
    })
  );
  app.use(cookieParser());
  // app.get("/", (_req, res) => res.send("hello"));
  app.post('/refresh_token', async (req, res) => {
    const token = req.cookies.jid;
    if (!token) {
      return res.send({ ok: false, accessToken: '' });
    }

    let payload: any = null;
    try {
      payload = verify(token, process.env.REFRESH_TOKEN_SECRET!);
    } catch (err) {
      console.log(err);
      return res.send({ ok: false, accessToken: '' });
    }

    // token is valid and
    // we can send back an access token
    const user = await User.findOne({ id: payload.userId });
    console.log('index.user:::', user);
    console.log('index.user:::', payload);
    // const link: any = await Link.findOne({ id: payload.linkId });
    // const feed: any = await Link.find();
    // console.log("feed:::", feed);
    // console.log("feed:::", link);
    // console.log('Link:::', Link);
    // console.log('Link:::', LinkFeed);

    if (!user) {
      return res.send({ ok: false, accessToken: '' });
    }

    if (user.tokenVersion !== payload.tokenVersion) {
      return res.send({ ok: false, accessToken: '' });
    }

    sendRefreshToken(res, createRefreshToken(user));

    return res.send({ ok: true, accessToken: createAccessToken(user) });
  });

  await createConnection();

  // const schema = await buildSchema({
  //   resolvers: [UserResolver, LinkFeedResolver]
  // });

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, LinkFeedResolver, LinkResolver],
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  apolloServer.applyMiddleware({ app, cors: false });

  const PORT = 4040;

  app.listen(PORT, () => {
    // need to figure out how to host this on heroku or something
    console.log('express server started');
    console.log(`running on http://localhost:${PORT}/graphql`);
    console.log(`process.env:::`, process.env.NODE_ENV)
    console.log(`process.env::: + ${process.env.ORIGIN}`)
  });
})();

// createConnection().then(async connection => {

//     console.log("Inserting a new user into the database...");
//     const user = new User();
//     user.firstName = "Timber";
//     user.lastName = "Saw";
//     user.age = 25;
//     await connection.manager.save(user);
//     console.log("Saved a new user with id: " + user.id);

//     console.log("Loading users from the database...");
//     const users = await connection.manager.find(User);
//     console.log("Loaded users: ", users);

//     console.log("Here you can setup and run express/koa/any other framework.");

// }).catch(error => console.log(error));
