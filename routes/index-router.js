const express = require('express');
const router = express.Router();

const {
  landingpageController,
  registerPageController,
  registerController,
  loginController,
  logoutController,
  profileController
} = require('../controllers/index-controllers');

const { isLoggedIn, redirectifLoggedIn} = require('../middlewares/auth-middleware');



router.get("/", redirectifLoggedIn, landingpageController);
router.get("/register", registerPageController);
router.post("/register", registerController);
router.post("/login", loginController);
router.get("/logout", logoutController);
router.get("/profile", isLoggedIn, profileController);

module.exports = router;
