var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* GET shop page. */
router.get('/shop', function(req, res, next) {
  res.render('shop');
});
// GET CAT PAGE
router.get('/loai/:id', function(req, res, next) {
  let id = req.params.id;
  res.render('loai', {id:id});
});

// get trang thành viên
router.get('/thanhvien', function (req, res, next) {
  res.render("thanhvien");
});
// GET 1SP
router.get('/:id', function(req, res, next) {
  let id = req.params.id;
  res.render('book', {id:id});
});
module.exports = router;
