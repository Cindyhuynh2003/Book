var express = require('express');
var router = express.Router();
var db = require('../models/database');

// THONG BAO DANG NHAP THANH CONG
router.get('/thanhcong', function(req, res){
    res.render("thanhcong.ejs");
});

//THONG BAO DOI PASS THANH CONG
router.get('/thanhcong1', function(req, res){
    res.render("thanhcong1.ejs");
});

// ĐANG kY
router.get('/dangky', function (req, res) {
    res.render("dangky.ejs");
});


//LUU
router.post('/luu', function (req, res) {
    let h = req.body.ho;
    let t = req.body.ten;
    let u = req.body.username;
    let p = req.body.password;
    let em = req.body.email;
    let fv = req.body.sothich;
    let ad = req.body.tinh;
    const bcrypt = require("bcrypt");
    var salt = bcrypt.genSaltSync(10);
    var pass_mahoa = bcrypt.hashSync(p, salt);
    let user_info = { ho: h, ten: t, username: u, password: pass_mahoa, email: em, sothich: fv, tinh: ad };
    let sql = 'INSERT INTO users SET ?';
    db.query(sql, user_info, (err, data) => {
        if (err) throw err
        res.redirect("/");
    });
});

// DANG NHAP
router.get('/dangnhap', function (req, res) {
    res.render("dangnhap.ejs");
});
// KT username pass
router.post('/dangnhap_', async function (req, res) {
    let u = req.body.username;
    let p = req.body.password;
    let sql = 'SELECT * FROM users WHERE username = ?';
    db.query(sql, [u], (err, rows) => {
        if (rows.length <= 0) { res.redirect("/thanhvien/dangnhap"); return; }
        let user = rows[0];
        let pass_fromdb = user.password;
        const bcrypt = require("bcrypt");
        var kq = bcrypt.compareSync(p, pass_fromdb);
        if (kq) {
            console.log("OK");
            var sess = req.session;  //initialize session variable
            sess.daDangNhap = true;
            sess.username = user.username;
            //res.redirect("/thanhvien/thanhcong");
            if (sess.back) {
                console.log(sess.back);
                res.redirect(sess.back);
            }
            else {
                res.redirect("/");
            }
        }
        else {
            console.log("Not OK");
            res.redirect("/thanhvien/dangnhap");
        }
    });
});

//GET DOWNLOAD
router.get('/download', function (req, res) {
    if (req.session.daDangNhap) {
        res.render("download.ejs", { un: req.session.username });
    }
    else {
        req.session.back = "/thanhvien/download"; //req.originalUrl
        res.redirect("/thanhvien/dangnhap");
    }
});


// KT đã đăng nhập chưa
router.get('/doimatkhau', function (req, res) {
    if (req.session.daDangNhap) {
        res.render("doimatkhau.ejs", { un: req.session.username });
    }
    else {
        req.session.back = "/thanhvien/doimatkhau";
        res.redirect("/thanhvien/dangnhap");
    }
});


// thực hiện đổi mật khẩu
router.post("/doimatkhau", async function (req, res) {
    let u = req.session.username;
    let mkcu = req.body.pa;
    let mkmoi = req.body.mkmoi;
    let xacnhan = req.body.xacnhan;

    // Kiểm tra các trường dữ liệu nhập vào
    if (mkmoi !== xacnhan) {
        res.render("doimatkhau.ejs", { error: "Xác nhận mật khẩu không đúng!" });
        return;
    }

    let sql = 'SELECT * FROM users WHERE username = ?';
    db.query(sql, [u], async (err, rows) => {
        if (rows.length <= 0) {
            res.redirect("/thanhvien/dangnhap");
            return;
        }
        let user = rows[0];
        let pass_fromdb = user.password;
        const bcrypt = require("bcrypt");
        if (!bcrypt.compareSync(mkcu, pass_fromdb)) {
            res.render("doimatkhau.ejs", { error: "Mật khẩu cũ không đúng!" });
            return;
        }
        var salt = bcrypt.genSaltSync(10);
        var pass_mahoa = bcrypt.hashSync(mkmoi, salt);
        sql = 'UPDATE users SET password = ? WHERE username = ?';
        await db.query(sql, [pass_mahoa, u]);
        res.redirect("/thanhvien/thanhcong1");
    });
});


// ĐĂNG XUẤT
router.get('/thoat', function (req, res) {
    req.session.destroy();
    res.redirect("/thanhvien/dangnhap");
});

module.exports = router;