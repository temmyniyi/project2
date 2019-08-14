module.exports = function(app, passport, authController) {
  app.get("/", authController.signin);

  app.get("/account", authController.account);

  app.get("/home", authController.home);

  app.get("/logout", isLoggedIn, authController.logout);

  app.post(
    "/signup",
    passport.authenticate("local-signup", {
      successRedirect: "/home",

      failureRedirect: "/account"
    })
  );
  app.post(
    "/signin",
    passport.authenticate("local-signin", {
      successRedirect: "/home",
      failureRedirect: "/"
    })
  );
  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();

    res.redirect("/");
  }
};
