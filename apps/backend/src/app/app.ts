import createError from 'http-errors';
import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import Knex from 'knex';
import { Model } from 'objection';
import logger from 'morgan';
import fetch from 'node-fetch';
import passport from 'passport';
import { Strategy } from 'passport-oauth2';
import { Strategy as JwtStrategy } from 'passport-jwt';
import dotenv from 'dotenv';
import cors from 'cors';
import jsonwebtoken from 'jsonwebtoken';
const dbConfig = require('../../knexfile');

import { User } from './components/user/user';
import { createUser, updateLeader } from './components/user/user.service';

import userRouter from './components/user/user.routes';
import groupRouter from './components/group/group.routes';
import achievementRouter from './components/achievement/achievement.routes';

dotenv.config();

const knex = Knex(dbConfig.development);
Model.knex(knex);

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  })
);
app.use(passport.initialize());
//app.use(passport.session());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

// main authentication, our app will rely on it
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: function (req) {
        // tell passport to read JWT from cookies
        let token = null;
        if (req && req.cookies) {
          token = req.cookies[process.env.JWT_COOKIE_NAME];
        }
        return token;
      },
      secretOrKey: process.env.JWT_SECRET_KEY,
    },
    async function (jwtPayload, done) {
      //console.log('JWT BASED AUTH GETTING CALLED'); // called everytime a protected URL is being served
      const user = await User.query().findOne({
        authSchId: jwtPayload.data,
      });

      if (user) {
        return done(null, user);
      } else {
        // user account doesnt exists in the DATA
        return done(null, false);
      }
    }
  )
);

passport.use(
  new Strategy(
    {
      authorizationURL: 'https://auth.sch.bme.hu/site/login',
      tokenURL: 'https://auth.sch.bme.hu/oauth2/token',
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: 'http://localhost:8080/auth/oauth/callback',
      scope: ['basic', 'displayName', 'mail', 'eduPersonEntitlement'],
    },
    async function (accessToken, refreshToken, profile, done) {
      const responseUser = await fetch(
        `https://auth.sch.bme.hu/api/profile?access_token=${accessToken}`
      ).then((res) => res.json());

      const user = await User.query().findOne({
        authSchId: responseUser.internal_id,
      });

      if (user) {
        await updateLeader(user, responseUser.eduPersonEntitlement);
        done(null, user);
      } else {
        const newUser = await createUser(responseUser);
        await updateLeader(newUser, responseUser.eduPersonEntitlement);
        done(null, newUser);
      }
    }
  )
);

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: any, done) => {
  const user = await User.query().findOne({ id });
  done(null, user);
});

app.get('/login', passport.authenticate('oauth2'));
app.get(
  '/auth/oauth/callback',
  passport.authenticate('oauth2', { failureRedirect: '/' }),
  async (req, res) => {
    const user = req.user;
    const token = jsonwebtoken.sign(
      {
        data: user['authSchId'],
      },
      process.env.JWT_SECRET_KEY
    );
    res.cookie(process.env.JWT_COOKIE_NAME, token, {
      maxAge: 2 * 60 * 60 * 1000,
    });
    console.log(user);
    const groupIds = (
      await User.relatedQuery('leader')
        .for((user as User)?.id)
        .select('id')
    ).reduce(
      (acc, curr) => [...acc, curr.id],
      (user as User)?.admin ? [0] : []
    );
    res.cookie(process.env.ROLE_COOKIE_NAME, groupIds.toString(), {
      maxAge: 2 * 60 * 60 * 1000,
    });
    res.redirect(process.env.FRONTEND_URL);
  }
);

app.use(passport.authenticate('jwt', { session: false }));
app.use('/users', userRouter);
app.use('/groups', groupRouter);
app.use('/achievement', achievementRouter);

app.use('/', (req, res, next) => res.send('Hello'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err,
  });
});

export default app;
