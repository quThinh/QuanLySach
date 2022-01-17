var mongoose = require('mongoose')
  const { Schema } = mongoose;

  const Sanpham = new Schema({
    ten: {type:String},
    khachhang: {type:String},
    giatien: {type:String},
    danhmuc: {type:String},
    mota: {type:String},
    vitri: {type:String},
    anhsp:{type:Array}

},{collection:'thongtinsach'})

module.exports = mongoose.model("uploadsp",Sanpham);
