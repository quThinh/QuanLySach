var mongoose = require('mongoose')
  const { Schema } = mongoose;

  const Account = new Schema({
    username: {type:String},
    password: {type:String},
},{collection:'account'})

module.exports = mongoose.model("account",Account);
