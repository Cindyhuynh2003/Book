var express = require('express');
var router = express.Router();
var db = require('./../models/database');

//Hiện tất cả sản phẩm
router.get('/', function (req, res, next) {
    let sql = `SELECT idSach, tenSach, moTa, urlHinh, capnhat, gia FROM sach limit 16`;
    db.query(sql, function (err, data) {
        if (err) throw err;
        res.json(data);
    });
});

router.get('/all', function (req, res, next) {
    let sql = `SELECT idSach, tenSach, moTa, urlHinh, capnhat, gia FROM sach limit 16`;
    db.query(sql, function (err, data) {
        if (err) throw err;
        res.json(data);
    });
});
//  Hiện sản phẩm mới
router.get('/new', function (req, res, next) {
    let sql = `SELECT idSach, tenSach, moTa, urlHinh, capnhat, gia FROM sach where spmoi=1 limit 10`;
    db.query(sql, function (err, data) {
        if (err) throw err;
        res.json(data);
    });
});

// Hiện sản phẩm hot
router.get('/hot', function (req, res, next) {
    let sql = `SELECT idSach, tenSach, moTa, urlHinh, capnhat, gia FROM sach where sphot=1 limit 10`;
    db.query(sql, function (err, data) {
        if (err) throw err;
        res.json(data);
    });
});

// hiện sản phẩm xem nhiều
router.get('/xemnhieu', function (req, res, next) {
    let sql = `SELECT idSach, tenSach, moTa, urlHinh, capnhat, gia,giagoc FROM sach where spxemnhieu=1 limit 10`;
    db.query(sql, function (err, data) {
        if (err) throw err;
        res.json(data);
    });
});

//  hiện sản phẩm theo loại
router.get('/loai/:id', function (req, res, next) {
    let id = req.params.id;
    let sql = 'SELECT idSach, tenSach, moTa, urlHinh, capnhat, gia, giagoc FROM sach WHERE idLoai = ?';
    db.query(sql, id, (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Lỗi khi truy vấn CSDL' });
        }
        if (data.length === 0) {
            return res.status(404).json({ error: 'Không tìm thấy sản phẩm thuộc loại = ' + id });
        }
        res.json(data);
    });
});

// Hiện chi tiết 1 sản phẩm
router.get('/:id', function (req, res, next) {
    let id = req.params.id;
    let sql = 'SELECT idSach, tenSach, moTa, urlHinh, capnhat, gia, giagoc FROM sach WHERE idSach = ?';
    db.query(sql, id, (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Lỗi khi truy vấn CSDL' });
        }
        if (data.length === 0) {
            return res.status(404).json({ error: 'Không tìm thấy sản phẩm có = ' + id });
        }
        res.json(data);
    });
});
module.exports = router;