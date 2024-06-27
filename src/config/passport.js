const passport = require("passport");
require("./strategies/local.strategy.js")();

module.exports = function passportConfig(app) {
  app.use(passport.initialize());
  app.use(passport.session()); //that is why session has to be established before this config is called in app.js

  //serialize entire user and put it on the session (note, usually you just serialize the userid and get it in the deserialize)
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });
};
