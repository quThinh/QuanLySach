
var express = require('express');
var router = express.Router();
var turnIntoID = require('mongodb').ObjectId;
var uploadspModel = require('../model/uploadsp')
var sanpham;
const { MongoClient } = require('mongodb');
// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/qlsach');
var datacantim = {};
var sanphamyeuthich = [];
/* GET home page. */
router.get('/', function (req, res, next) {
  uploadspModel.find({}, function (error, dulieu) {
    res.render('index', { data: dulieu });
  })
});

/* Get timkiemten page */
router.get('/timkiemten', function (req, res, next) {
  uploadspModel.find({}, function (error, dulieu) {
    res.render('timkiemten', { data: dulieu });
  })
});

/* Get key-word from customer from timkiemten page*/
router.post('/timkiemten', function (req, res, next) {
  var ten = req.body.ten;
  uploadspModel.find({}, function (error, dulieu) {
    var dataFil = dulieu.filter(function (item) {
      return item.ten.includes(ten);
    })
    res.render('timkiemtheoten', { data: dataFil, ten: ten });
  })
});

/* Get timkiemtheoten page */
router.get('/timkiemtheoten', function (req, res, next) {
  res.render('timkiemtheoten');
});

/* Get about page */
router.get('/about', function (req, res, next) {
  res.render('about');
});

/* Get our-team page */
router.get('/our-team', function (req, res, next) {
  res.render('our-team');
});

/* Get services page */
router.get('/about', function (req, res, next) {
  res.render('about');
});

/* Get bando page */
router.get('/bando', function (req, res, next) {
  res.render('bando');
});


/* GET detail. */
router.get('/chi-tiet/*.:idsanpham', function (req, res, next) {
  res.cookie('idsanpham', req.params.idsanpham)
  if (sanphamyeuthich.indexOf(req.params.idsanpham) == -1) {
    sanphamyeuthich.unshift(req.params.idsanpham)
  }
  else {
    sanphamyeuthich.splice(sanphamyeuthich.indexOf(req.params.idsanpham), 1);
    sanphamyeuthich.unshift(req.params.idsanpham)
  }
  uploadspModel.find({}, function (error, dulieu) {
    res.render('chitietsanpham', { data: dulieu, idsanpham: req.params.idsanpham });
  })
});

router.get('/sanphamyeuthich', function (req, res, next) {
  uploadspModel.find({}, function (error, dulieu) {
    res.render('sanphamyeuthich', { data: dulieu, arrayId: sanphamyeuthich });
  })
});



module.exports = router;
