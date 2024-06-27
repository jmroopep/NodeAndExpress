const express = require("express");
const chalk = require("chalk");
const debug = require("debug")("app");
const morgan = require("morgan");
const path = require("path"); //don't have to npm install path, it is part of node
const passport = require("passport");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const PORT = process.env.PORT || 3000;
const app = express();
const sessionRouter = require("./src/routers/sessionRouter.js");
const adminRouter = require("./src/routers/adminRouter.js");
//const authRouter = require("./src/routers/authRouter.js");

//middleware
app.use(morgan("tiny")); //'combined' for lots
app.use(express.static(path.join(__dirname, "/public/"))); //this was to show static page, comment out now so it can make it to get
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser);
//app.use(session({ secret: "globomantics" }));

//after use for cookieParser and session, now you can configure passport, do this in
//separate module, make the module return a function that takes app because it needs app for the config
//require("./src/config/passport.js")(app);

//set variables in the context of the application
app.set("views", "./src/views");
app.set("view engine", "ejs");

//routers
app.use("/sessions", sessionRouter);
app.use("/admin", adminRouter);
//app.use("/auth", authRouter);

//now we are going to render the ejs page for the "get" instead of "send" string
//pass in object with title - this chunk renders the home page
app.get("/", (req, res) => {
  res.render("index", { title: "Globomantics", data: ["a", "b", "c"] });
});
// app.get('/', (req, res) => {
//     res.send('Hello from my app');
// });

app.listen(PORT, () => {
  debug(`Server listening on port ${chalk.green(PORT)}`);
});
