// require("dotenv").config();
// var express = require("express");
// var exphbs = require("express-handlebars");

// var db = require("./models");

// var app = express();
// var PORT = process.env.PORT || 3000;

// // Middleware
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());
// app.use(express.static("public"));

// // Handlebars
// app.engine(
//   "handlebars",
//   exphbs({
//     defaultLayout: "main"
//   })
// );
// app.set("view engine", "handlebars");

// // Routes
// require("./routes/apiRoutes")(app);
// require("./routes/htmlRoutes")(app);

// var syncOptions = { force: false };

// // If running a test, set syncOptions.force to true
// // clearing the `testdb`
// if (process.env.NODE_ENV === "test") {
//   syncOptions.force = true;
// }

// // Starting the server, syncing our models ------------------------------------/
// db.sequelize.sync(syncOptions).then(function() {
//   app.listen(PORT, function() {
//     console.log(
//       "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
//       PORT,
//       PORT
//     );
//   });
// });

// module.exports = app;

require("dotenv").config();
var express = require("express");
var app = express();
var passport = require("passport");
var session = require("express-session");
var exphbs = require("express-handlebars");
var AuthController = require("./controllers/authcontroller");
app.use(
  express.urlencoded({
    extended: true
  })
);
app.use(express.json());

// For Passport
app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true
  })
); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

//For Handlebars
app.set("views", "./views");
app.engine(
  "hbs",
  exphbs({
    extname: ".hbs"
  })
);
app.set("view engine", ".hbs");

//Models
var models = require("./models");
var authController = new AuthController(models);
//Routes

var authRoute = require("./routes/auth.js")(
  app,
  passport,
  authController,
  models
);

//load passport strategies

require("./config/passport/passport.js")(passport, models.user);

//Sync Database

models.sequelize
  .sync()
  .then(function() {
    console.log("Nice! Database looks fine");
  })
  .catch(function(err) {
    console.log(err, "Something went wrong with the Database Update!");
  });

app.listen(5000, function(err) {
  if (!err) console.log("Site is live");
  else console.log(err);
});
