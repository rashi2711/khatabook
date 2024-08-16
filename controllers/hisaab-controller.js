const { isLoggedIn } = require("../middlewares/auth-middleware");
const hisaabModel = require("../models/hisaab-models");
const userModel = require("../models/user-model");

module.exports.createHisaabController = async function(req, res) {
  let { title, description, editpermission, shareable, encrypted, passcode } = req.body;
  encrypted = encrypted === "on" ? true : false;
  shareable = shareable === "on" ? true : false;
  editpermission = editpermission === "on" ? true : false;

  try{
    let hisaabcreated = await hisaabModel.create({
      title,
      description,
      user: req.user._id,
      passcode,
      encrypted,
      shareable,
      editpermission
    });
  
    let user = await userModel.findOne({ email: req.user.email });
    user.hisaab.push(hisaabcreated._id);
    await user.save();
    res.redirect("/profile");
  }catch(err){
res.send(err.message)
  }
  
};

module.exports.hisaabPageController = async function(req, res) {
  res.render("create");
};

module.exports.deleteController = async function(req, res,next) {
  const id=req.params.id;
  const hisaab=await hisaabModel.findOne({
    _id:id,
    user:req.user.id,

  })
  if(!hisaab){
    return res.redirect("/profile")
  }
  await hisaabModel.deleteOne({
    _id:id
  })
  return res.redirect("/profile")
};
module.exports.editController = async function(req, res,next) {
  const id=req.params.id;
  const hisaab=await hisaabModel.findById(id);
  if(!hisaab){
    return res.redirect("/profile")
  }
 return res.render("edit",{isLoggedIn:true,hisaab})
};
module.exports.editPostController = async function(req, res,next) {
  const id=req.params.id;
  const hisaab=await hisaabModel.findById(id);
  if(!hisaab){
    return res.redirect("/profile")
  }
  hisaab.title=req.body.title;
  hisaab.description=req.body.description;
  hisaab.editpermission=req.body.editpermission == 'on' ? true:false;
  hisaab.shareable=req.body.shareable == 'on' ? true:false;
  hisaab.encrypted=req.body.encrypted == 'on' ? true:false;
  hisaab.passcode=req.body.passcode;

  await hisaab.save();
  return res.redirect("/profile")
};
module.exports.readHisaabController = async function(req, res,next) {
  const id=req.params.id;
  const hisaab=await hisaabModel.findOne({
    _id:id,
  })
  if(!hisaab){
    return res.redirect("/profile")
  }
  if(hisaab.encrypted){
    return res.render("passcode",{isLoggedIn:true,id})
  }
  return res.render("hisaab",{isLoggedIn:true,hisaab});
};
module.exports.readVerifiedHisaabController = async function(req, res,next) {
  const id=req.params.id;
  const hisaab=await hisaabModel.findOne({
    _id:id,
  })
  if(!hisaab){
    return res.redirect("/profile")
  }
  if(hisaab.passcode!==req.body.passcode){
    return res.redirect("/profile")  
  }
  return res.render("hisaab",{isLoggedIn:true,hisaab});
};

module.exports.verifyHisaabController = async function (req, res, next) {
  const id = req.params.id;
  const hisaab = await hisaabModel.findOne({
    _id: id,
  });

  if (!hisaab) {
    return res.redirect("/profile");
  }

  
  if (hisaab.encrypted) {
    return res.render("passcode", { isLoggedIn: true, id });
  }

  return res.render("hisaab", { isLoggedIn: true, hisaab });
};
