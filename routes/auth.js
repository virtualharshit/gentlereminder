const router = require("express").Router();

const passport = require("passport");

router.get("/login/success", (req, res) => {
  //   if (req.user) {
  res.status(200).json({
    success: true,
    message: "login success",
    user: req.user,
  });
  //   }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "login failure",
  });
});

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.log("error", err);
      return res
        .status(500)
        .json({ status: false, message: "Something bad happen" });
    }
    return res
      .status(200)
      .json({ status: true, message: "Logout Successfully" });
  });
});
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

module.exports = router;
