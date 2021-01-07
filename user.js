let mongoose = require( 'mongoose' );
let crypto = require('crypto');
let jwt = require('jsonwebtoken');

var coordinatesSchema = new mongoose.Schema({
  xCoordinates : Number,
  yCoordinates : Number
})
mongoose.model('coordinatesSchema', coordinatesSchema,);

var clockSchema = new mongoose.Schema({
  fuseau : {
    type : String,
    default : 12
  },
  isShown : {
    type : Boolean,
    default : true
  }, 
  xCoordinates : Number,
  yCoordinates : Number
});
mongoose.model('clockSchema', clockSchema,);

var shortcutSchema = new mongoose.Schema({
  name: String, 
  link : String, 
  icon: String,
  coordinates : {type : coordinatesSchema}
});
mongoose.model('shortcutSchema',shortcutSchema ,);

var calendarSchema = new mongoose.Schema({
  start : Date,
  end :Date, 
  motive: String,
});
mongoose.model('calendarSchema',calendarSchema ,);

var toDoListSchema = new mongoose.Schema({
  name:String,
  subString:[{
    name: String,
    valid :Boolean
  }]
});
mongoose.model('toDoListSchema', toDoListSchema,);

var contactSchema = new mongoose.Schema({
  name : String, 
  phone : String, 
  Email : String
});
mongoose.model('contactSchema',contactSchema ,);

var notificationSchema = new mongoose.Schema({
  content : String, 
  reason : String
});
mongoose.model('notificationSchema',notificationSchema ,);

var widgetListSchema = new mongoose.Schema({

  clock : {type : clockSchema},

  shortcuts :{
    list : [{shortcut : {type : shortcutSchema}, coordinates : {type : coordinatesSchema}}],
    isShown : {type : Boolean,default: true}
  },
    
  calendar: {
    list : [{type : calendarSchema}],
    isShown : {type : Boolean,default : true},
    coordinates : {type : coordinatesSchema}
  },

  notepad : {
    list :[ {text : String, coordinates : {type : coordinatesSchema}} ],
    isShown : { type :Boolean,default : true },
      },

  toDoList :{
    category : [{type : toDoListSchema}],
    isShown : { type :Boolean,default : true },
    coordinates : {type : coordinatesSchema}
      },

  calculator : {
    isShown :{ type :Boolean,default : true },
    coordinates : {type : coordinatesSchema}
    },

  contacts : { 
    list :[{type : contactSchema}],
    isShown : { type :Boolean,default : true },
    coordinates : {type : coordinatesSchema}
      },

  notifications :{
     list : [{type : notificationSchema}],
    isShown : { type :Boolean,default : true }
}
});
mongoose.model('widgetlist', widgetListSchema,);


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
  widgetList : {type : widgetListSchema},
  
  
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
