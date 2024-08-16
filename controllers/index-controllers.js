const jwt = require("jsonwebtoken");
const userModel = require("../models/user-model");
const hisaabModel = require("../models/hisaab-models");
const bcrypt = require("bcrypt");
const flash = require("connect-flash");

module.exports.landingpageController = function(req, res) {
    let message = req.flash("error");
    res.render("index", { loggedIn: false, error: message });
};

module.exports.registerPageController = function(req, res) {
    res.render("register");
};

module.exports.registerController = async function(req, res) {
    let { email, password, username, name } = req.body;
  
    try {
        let user = await userModel.findOne({ email });
        if (user) return res.send("You already have an account, please login");

        let salt = await bcrypt.genSalt(10);
        let hashedPassword = await bcrypt.hash(password, salt);

        user = await userModel.create({ email, name, username, password: hashedPassword });
        let token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_KEY);
        res.cookie("token", token);
        res.send("Account created successfully");
    } catch (err) {
        res.send(err.message);
    }
};

module.exports.loginController = async function(req, res) {
    let { email, password } = req.body;
    let user = await userModel.findOne({ email }).select("+password");
    if (!user) {
        req.flash("error", "You don't have an account, please create one");
        return res.redirect("/");
    }

    let result = await bcrypt.compare(password, user.password);
    if (result) {
        let token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_KEY);
        res.cookie("token", token);
        res.redirect("/profile");
    } else {
        req.flash("error", "Your details are incorrect");
        return res.redirect("/");
    }
};

module.exports.logoutController = async function(req, res) {
    res.cookie("token", "");
    return res.redirect("/");
};

module.exports.profileController = async function(req, res) {
    let byDate =Number(req.query.byDate)
    let {startDate,endDate} = req.query;
    byDate = byDate ? byDate : -1;
    startDate = startDate ? startDate : new Date("1970-01-01")
    endDate = endDate ? endDate : new Date();



    let user = await userModel.findOne({ email: req.user.email }).populate({
        path:"hisaab",
        match:{createdAt : {$gte : startDate,$lte: endDate}},
        options:{sort:{createdAt:byDate}}
    });
    res.render("profile", { user });
};

