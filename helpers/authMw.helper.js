const authMw = (req, res, next) => {
    req.isAuthenticated() ? next() : res.redirect("/login");
  };

export default authMw;
