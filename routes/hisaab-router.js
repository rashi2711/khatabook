const express = require("express");
const router = express.Router();
const { createHisaabController,hisaabPageController,readVerifiedHisaabController,readHisaabController,deleteController,editController,editPostController,verifyHisaabController} = require("../controllers/hisaab-controller");
const { isLoggedIn} = require('../middlewares/auth-middleware');

router.get("/create",isLoggedIn,hisaabPageController)
router.post("/create", isLoggedIn, createHisaabController);
router.get("/delete/:id",isLoggedIn,deleteController)
router.get("/edit/:id",isLoggedIn,editController)
router.post("/edit/:id",isLoggedIn,editPostController)
router.get("/view/:id",isLoggedIn,readHisaabController)
router.post("/verify/:id",isLoggedIn,readVerifiedHisaabController)
router.get("/verify/:id", isLoggedIn, verifyHisaabController);
router.get("/:id",readVerifiedHisaabController)

module.exports = router;

