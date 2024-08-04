var express = require('express');
var router = express.Router();
const usermodel = require('./users');
const { name } = require('ejs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/flash', function(req, res, next) {
  req.flash("age",34);
  req.flash("name","yaseen");
  res.send("dahak lay bhai");
  // res.render('index');
});
router.get('/checkar', function(req, res, next) {
  
  res.send('be kay terminal pay dahak choco');
  console.log(req.flash(["age"]),req.flash(["name"]));

});

router.get('/create',async function (req, res){
  let usercreate = await usermodel.create({
    uname: "shazi1",
    name: "shahzieb",
    description: "i in school",
    categories:['math','science','physics']
  });
  res.send(usercreate);
});
router.get('/showdata',async function (req, res) {
  let regx = new RegExp('^shazi$','i')
  let data = await usermodel.find({categories: { $all: ["laravel"] } });
  res.send(data);
  
});
router.get('/todaydata', async function (req, res) {
  let d1 = new Date('2024-08-04');
  let d2 = new Date('2024-08-05');
  let data = await usermodel.find({createdDate:{$gt: d1,$lt: d2}});
  res.send(data);
  
});
router.get('/valid', async function (req, res) {
  let data = await usermodel.find({categories:{$exists:true} });
  res.send(data);
  
});
router.get('/length', async function(req, res){
  let data = await usermodel.find({
    $expr:{
       $and:
      [
        {$gte: [{$strLenCP:'$name'},3]},
        {$lte: [{$strLenCP:'$name'},6]}
   ]
  }
});
res.send(data);
});
module.exports = router;
