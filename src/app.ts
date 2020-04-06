import createError from "http-errors";
import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from 'body-parser'
import logger from "morgan";
import fetch from "node-fetch";
import passport from "passport";
import { Strategy } from "passport-oauth2";
import dotenv from "dotenv";

dotenv.config();

var app = express();

const userDb = [];
const addUser = (user) => {
  userDb.push(user);
  return user;
};
const getUser = (id) => userDb.find((it) => it.internal_id === id);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new Strategy(
    {
      authorizationURL: "https://auth.sch.bme.hu/site/login",
      tokenURL: "https://auth.sch.bme.hu/oauth2/token",
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:8080/auth/oauth/callback",
      scope: ["basic", "displayName", "mail", "eduPersonEntitlement"],
    },
    async function (accessToken, refreshToken, profile, done) {
      const responseUser = await fetch(
        `https://auth.sch.bme.hu/api/profile?access_token=${accessToken}`
      ).then((res) => res.json());
      console.log(responseUser);
      const user = getUser(responseUser.internal_id);

      if (user) {
        done(null, user);
      } else {
        const u = addUser(responseUser);
        done(null, u);
      }
    }
  )
);

passport.serializeUser((user: any, done) => {
  done(null, user.internal_id);
});

passport.deserializeUser(async (id, done) => {
  const user = getUser(id);
  done(null, user);
});

app.get("/login", passport.authenticate("oauth2"));
app.get(
  "/auth/oauth/callback",
  passport.authenticate("oauth2", { failureRedirect: "/" }),
  (req, res) => res.redirect(req.session.returnTo || "/")
);

app.use("/", (req, res, next) => res.send("Hello"));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export default app;
