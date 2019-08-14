var AuthController = function(models) {
  this.account = function(req, res) {
    res.render("account");
  };
  this.signin = function(req, res) {
    res.render("index");
  };
  this.home = function(req, res) {
    res.render("home");
  };
  this.logout = function(req, res) {
    req.session.destroy(function(err) {
      if (err) throw err;
      res.redirect("/");
    });
  };
};

module.exports = AuthController;
