var express = require('express');
const { Collection } = require('mongoose');
var router = express.Router();
const multer = require('multer')
var turnIntoID = require('mongodb').ObjectId;
const { MongoClient } = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
var datas = [];
var check = 0;
var idcansua;

// Database Name
const dbName = 'qlsach';
const dbName2 = 'account';
var daDangNhap = false;

//Path upload images and file's name
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + '-' + file.originalname)
  }
})


//check image 's file-type
function checkFileUpload(req, file, cb) {
  if (!file.originalname.match(/\.(jpg|png|gif|jpeg)$/)) {
    cb(new Error('Loi'))
  }
  else {
    cb(null, true)
  }

}

const upload = multer({ storage: storage, fileFilter: checkFileUpload })

// upload images
router.post('/themanh', upload.array('anhsp'), function (req, res, next) {
  if (req.session.daDangNhap) {
    if (req.files.length < 3) {
      res.render('nhapanhfailed')
    }
    else {
      var anhs = []
      for (var i = 0; i < 3; i++) {
        anhs.push("views\\form\\" + req.files[i].path);
      }
      var dulieu03 = {
        "ten": datas.ten,
        "khachhang": datas.khachhang,
        "giatien": datas.giatien,
        "danhmuc": datas.danhmuc,
        "mota": datas.mota,
        "vitri": datas.vitri,
        "anhsp": anhs
      }
      if (check == 1) {
        async function main() {
          // Use connect method to connect to the server
          await client.connect();
          const db = client.db(dbName);
          const collection = db.collection('thongtinsach');//ten collection can insert vao  
          const updateResult = await collection.updateOne({ _id: idcansua }, { $set: dulieu03 });
          check = 0;
          res.redirect("/xem")
          return 'done.';
        }
        main()
          .catch(console.error)
          .finally(() => client.close());
      }
      else {
        async function main() {
          // Use connect method to connect to the server
          await client.connect();
          console.log('Connected successfully to server');
          const db = client.db(dbName);
          const collection = db.collection('thongtinsach');//ten collection can insert vao
          const insertResult = await collection.insertOne(dulieu03);
          datas = {}
          // res.render('them', { un: req.session.username });
          res.redirect('/them')
          return 'done.';
        }

        main()
          .catch(console.error)
          .finally(() => client.close());
      }
      check = 0;
    }

  }
  else {
    res.redirect('/login');
  }
});

/* GET themanh page. */
router.get('/themanh', function (req, res, next) {
  if (req.session.daDangNhap) {
    res.render('themanh', { un: req.session.username });
  }
  else {
    res.redirect('/login');
  }
});

/* GET home page. */
router.get('/', function (req, res, next) {
  if (req.session.daDangNhap) {
    res.render('index', { un: req.session.username });
  }
  else {
    res.redirect('login');
  }
});

/* GET them page. */
router.get('/them', function (req, res, next) {
  console.log(daDangNhap);
  if (req.session.daDangNhap) {
    res.render('them', { un: req.session.username });
  }
  else {
    res.redirect('/login');
  }
});


/* Get information from client them */
router.post('/them', function (req, res, next) {
  if (req.session.daDangNhap) {
    var dulieu01 = {
      "ten": req.body.tieude,
      "khachhang": req.body.cus,
      "giatien": req.body.price,
      "danhmuc": req.body.cat,
      "mota": req.body.desc,
      "vitri": req.body.location,
      "anhsp": req.body.anhsp
    }
    datas = dulieu01;
    // res.render('themanh', { un: req.session.username });
    res.redirect('/themanh')
  }
  else {
    res.redirect('/login');
  }
});


/* GET xem page. */
router.get('/xem', function (req, res, next) {
  if (req.session.daDangNhap) {
    async function main() {
      await client.connect();
      const db = client.db(dbName);
      const collection = db.collection('thongtinsach');

      const findResult = await collection.find({}).toArray();
      res.render('xem', { title: 'xem dữ liệu', arrayData: findResult, un: req.session.username });
      return 'done.';
    }

    main()
      .catch(console.error)
      .finally(() => client.close());
  }
  else {
    res.redirect('/login');
  }

});

/* GET login page. */
router.get('/login', function (req, res, next) {
  res.render('login', { title: 'Login' });
});

/* Get information from client them */
router.post('/login', function (req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  async function main() {
    await client.connect();
    const db = client.db(dbName2);
    const collection = db.collection('account');
    const findResult = await collection.findOne({
      username: username,
      password: password
    })
      .then(data => {
        if (data) {
          var sess = req.session;  //initialize session variable
          sess.daDangNhap = true;
          sess.username = dbName2.username;
          daDangNhap = true;
          res.redirect('/')
        } else {
          res.render('loginfailed')
        }
      })
  }

  main()
    .catch(console.error)
    .finally(() => client.close());

});





/* Get viewsua page */
router.get('/viewsua/:idsanpham', function (req, res, next) {
  if (req.session.daDangNhap) {
    idcansua = turnIntoID(req.params.idsanpham);
    async function main() {
      await client.connect();
      const db = client.db(dbName);
      const collection = db.collection('thongtinsach');
      const filteredDocs = await collection.find({ _id: idcansua }).toArray();
      res.render('viewsua', { title: 'Sửa dữ liệu', data: filteredDocs, un: req.session.username });
      return 'done.';

    }
    main().catch(console.error)
      .finally(() => client.close());
  }
  else {
    res.redirect('login');
  }
});

/* Get information from client viewsua */
router.post('/viewsua/:idsanpham', function (req, res, next) {
  idcansua = turnIntoID(req.params.idsanpham);
  var dulieu02 = {
    "ten": req.body.title,
    "khachhang": req.body.cus,
    "giatien": req.body.price,
    "danhmuc": req.body.cat,
    "mota": req.body.desc,
    "vitri": req.body.location,
    "anhsp": req.body.anhsp
  }
  check = 1;
  datas = dulieu02;
  res.redirect('/themanh')
});



//  delete document
router.get('/xoa/:idcanxoa', function (req, res, next) {
  if (req.session.daDangNhap) {
    var idcanxoa = turnIntoID(req.params.idcanxoa)
    async function main() {
      await client.connect();
      const db = client.db(dbName);
      const collection = db.collection('thongtinsach');
      const deleteResult = await collection.deleteOne({ _id: idcanxoa });
      return 'done.';

    }
    main().catch(console.error).finally();
    res.redirect('/xem');
  }
  else {
    res.redirect('/login');
  }

});



module.exports = router;
