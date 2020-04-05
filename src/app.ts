import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import fetch from "node-fetch";
import passport from "passport";
import { Strategy } from "passport-oauth2";

var app = express();

const userDb = [];
const addUser = (user) => {
  userDb.push(user);
  return user;
};
const getUser = (id) => userDb.find((it) => it.internal_id === id);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new Strategy(
    {
      authorizationURL: "https://auth.sch.bme.hu/site/login",
      tokenURL: "https://auth.sch.bme.hu/oauth2/token",
      clientID: "72523506426915946950",
      clientSecret:
        "pQtciwevnTBZZWdbkr147eCzY6gpRkU82EZa24LfNN5mjXDKF5DBYG1wBWcT8xQy3qOujaPxoJZNhdYm",
      callbackURL: "http://localhost:8080/auth/oauth/callback",
      scope: ["basic", "displayName", "mail", "eduPersonEntitlement"],
    },
    async function (accessToken, refreshToken, profile, done) {
      const responseUser = await fetch(
        `https://auth.sch.bme.hu/api/profile?access_token=${accessToken}`
      ).then((res) => res.json());

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
