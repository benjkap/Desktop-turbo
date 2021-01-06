// use passport
//let passport = require('passport');
// use crypto
let crypto = require('crypto');
// Use Express
let express = require("express");
// Use body-parser
let bodyParser = require("body-parser");
let jwt = require('jsonwebtoken');
// Use MongoDB and Mongoose
let mongodb = require('MongoDB');
let mongoose = require('mongoose');
let models = require('./user');




mongoose.set('useFindAndModify',false);
mongoose.set('useNewUrlParser',true);
mongoose.set('useCreateIndex',true);
mongoose.set('useUnifiedTopology',true);
let ObjectID = mongodb.ObjectID;
// The database variable
let database;
// The products collection
let USERS_COLLECTION = "users";

// Create new instance of the express server
let app = express();

// Define the JSON parser as a default way
// to consume and produce data through the
// exposed APIs
app.use(bodyParser.json());



// Create link to Angular build directory
// The `ng build` command will save the result
// under the `dist` folder.
let distDir = __dirname + "/dist/";
app.use(express.static(distDir));

// Local database URI.
const LOCAL_DATABASE = "mongodb://localhost:27017/app";
// Local port.
const LOCAL_PORT = 8080;

// Init the server
mongoose.connect(LOCAL_DATABASE);

mongoose.connection.on('connected', function() {
  console.log('Mongoose connected to ' + LOCAL_DATABASE);
});
mongoose.connection.on('error', function(err) {
  console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function() {
  console.log('Mongoose disconnected');
});

// Initialize the app.
let server = app.listen(process.env.PORT || LOCAL_PORT, function () {
  let port = server.address().port;
  console.log("App now running on port", port);
});
app.get("/api/status", function (req, res) {
    res.status(200).json({ status: "UP" });
});


app.post("/api/login", function (req, res) {

  let login = req.body;

  console.log(login);
  console.log('tentative de connection, user: ' + login.username);

  if (!login.username) {
      manageError(res, "Invalid product input", "Name is mandatory.", 400);
  } else if (!login.password) {
      manageError(res, "Invalid product input", "Brand is mandatory.", 400);
  } else {
    
    User.findOne({ username:login.username }, function (err, user) {
      if (err) {console.log("unknown error");
      return;  }
    
      if (!user) {
         console.log("user not found");
         return;
      }
      // Return if password is wrong
      if (!user.validPassword(login.password)) {
        res.status(202).json(false);
        return;
      }
      // If credentials are correct, return the user object
      console.log("bien joué");
      res.status(201).json(user._id);
    });




  }

});

let User = mongoose.model('User');

app.post("/api/register", function (req, res) {

  let register = req.body;
  console.log("tentative d'inscription, user: " + register.username);

  if (!register.username) {
      manageError(res, "Invalid input", "Name is mandatory.", 400);
  } else if (!register.password) {
      manageError(res, "Invalid input", "password is mandatory.", 400);
  } else {

    //ici traitement pré requete
    var user = new User() 
    //ici la requète
    user.username = register.username;
    user.adress = register.email;
    user.setPassword(register.password);
    user.save(function(err, user){
      if (err) return console.error(err);
      console.log(user.username + " saved to user collection.");
    })

   
  }

});

app.delete("/api/login/:id", function (req, res) {
    if (req.params.id.length > 24 || req.params.id.length < 24) {
        manageError(res, "Invalid product id", "ID must be a single String of 12 bytes or a string of 24 hex characters.", 400);
    } else {
        database.collection(USERS_COLLECTION).deleteOne({ _id: new ObjectID(req.params.id) }, function (err, result) {
            if (err) {
                manageError(res, err.message, "Failed to delete login.");
            } else {
                res.status(200).json(req.params.id);
            }
        });
    }
});

// Errors handler.
function manageError(res, reason, message, code) {
    console.log("Error: " + reason);
    res.status(code || 500).json({ "error": message });
}
