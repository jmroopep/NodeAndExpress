const express = require("express");
const debug = require("debug")("app:authRouter");
const { MongoClient } = require("mongodb");
const passport = require("passport");

const authRouter = express.Router();

authRouter.route("/signUp").post((req, res) => {
  const { username, password } = req.body;
  const url =
    "mongodb+srv://janeaquafina:PSofAKVbDXNtqowd@globomantics.84ky1vy.mongodb.net/?retryWrites=true&w=majority";
  const dbName = "globomantics";

  (async function addUser() {
    let client;
    try {
      client = await MongoClient.connect(url);
      const db = client.db(dbName);
      const user = { username, password };
      const results = await db.collection("users").insertOne(user);
      debug(results);
      const savedUser = await db
        .collection("users")
        .findOne({ _id: results.insertedId });
      //now that user is created, log them in
      req.login(savedUser, () => {
        res.redirect("/auth/profile");
      });
    } catch (error) {
      debug(error);
    }
    client.close();
  })();
});

authRouter
  .route("/signIn")
  .get((req, res) => {
    res.render("signin");
  })
  .post(
    passport.authenticate("local", {
      successRedirect: "/auth/profile",
      failureMessage: "/",
    })
  );

authRouter.route("/profile").get((req, res) => {
  res.json(req.user);
});

module.exports = authRouter;
