let mongoose = require( 'mongoose' );
let crypto = require('crypto');
let jwt = require('jsonwebtoken');

let userSchema = new mongoose.Schema({
  adress: {
    type: String,
    require: true,
    unique : true,
  },
  username: {
    type: String,
    require: true,
    unique : true,
  },
  hash: String,
  salt: String,
  isAdmin : Boolean,
  widgetList : {
    clock : String,
    shortcuts : [{
      name: String,
      link : String,
      icon: String
    }],
    calendar: {
      start : Date,
      end :Date,
      motive:String
    },
    notepad : [String],
    toDoList : [{
      name:String,
      subString:[{
        name: String,
        valid :Boolean
      }]
    }],
    calculatorHistory : [String],
    contacts : [{
      name : String,
      phone : String,
      Email : String
    }],
    notifications :[{
      content : String,
      reason : String
    }]
  },


});



// METHODS

userSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

userSchema.methods.validPassword = function(password) {
  let hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  return this.hash === hash;
};
userSchema.methods.setCheck_list = function(list) {
  this.widgetList.toDoList=list;
};
userSchema.methods.setProfile = function(Profile) {
  this.widgetList.profile=Profile;
};
userSchema.methods.setClock = function(fuseauH) {
  this.widgetList.clock=fuseauH;
};
userSchema.methods.setCalendar = function(calendar) {
  this.widgetList.calendar=calendar;
};

userSchema.methods.generateJwt = function() {
  let expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    adress: this.adress,
    username: this.username,
    exp: parseInt(expiry.getTime() / 1000),
  }, "coucouJeSuisLaClefSecreteMaisJeDevraisPasEtreDansLeCodeMaisJeSaisPAsOuAllerDoncJeVaisLa"); // DO NOT KEEP YOUR SECRET IN THE CODE!
};


// EXPORT EN MODELE

mongoose.model('User', userSchema);
