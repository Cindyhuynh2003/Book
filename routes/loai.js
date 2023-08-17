var express = require('express');
var router = express.Router();
var db = require('../models/database');

//Hiện tất cả sản phẩm
router.get('/listloai', function (req, res, next) {
    let sql = `SELECT tenLoai FROM loai`;
    db.query(sql, function (err, data) {
        if (err) throw err;
        res.json(data);
    });
});
module.exports = router;