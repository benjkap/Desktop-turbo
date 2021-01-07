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
  background:{
    type : String,
    default : "https://i.pinimg.com/originals/d9/1a/92/d91a92581c3e0209d7080c96000c5912.jpg"
  } ,
  hash: String,
  salt: String,
  isAdmin : Boolean,
  widgetList : {
    clock : {fuseau : String, isShown : Boolean },
    shortcuts :{list : [{
      name: String, 
      link : String, 
      icon: String,
    }],
    isShown : Boolean
  },
    calendar: {
      start : Date,
      end :Date, 
      motive:String,
      isShown : Boolean
    },
    notepad : {list :[String], isShown : Boolean,},
    toDoList :{category : [{
      name:String,
      subString:[{
        name: String,
        valid :Boolean
      }]
    }],
    isShown : Boolean
  },
    calculator : {isShown : Boolean},
    contacts : [{
      name : String, 
      phone : String, 
      Email : String
    }],
    notifications :{
       list : [{
        content : String, 
        reason : String
    }],
        isShown : Boolean
  }
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
