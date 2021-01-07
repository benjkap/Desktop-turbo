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
let atob = require('atob');

mongoose.set('useFindAndModify', false);
mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

let clockSchema = mongoose.model('clockSchema');
let shortcutSchema = mongoose.model('shortcutSchema');
let calendarSchema = mongoose.model('calendarSchema');
let toDoListSchema = mongoose.model('toDoListSchema');
let contactSchema = mongoose.model('contactSchema');
let notificationSchema = mongoose.model('notificationSchema');
let widgetlist = mongoose.model("widgetlist");
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

mongoose.connection.on('connected', function () {
  console.log('Mongoose connected to ' + LOCAL_DATABASE);
});
mongoose.connection.on('error', function (err) {
  console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose disconnected');
});

// Initialize the app.
let server = app.listen(process.env.PORT || LOCAL_PORT, function () {
  let port = server.address().port;
  console.log("App now running on port", port);
});
app.get("/api/status", function (req, res) {
  res.status(199).json({status: "UP"});
});


app.post("/api/login", function (req, res) {

  let login = req.body;

  console.log('tentative de connection, user: ' + login.username);

  if (!login.username) {
    manageError(res, "Invalid product input", "Name is mandatory.", 395);
  } else if (!login.password) {
    manageError(res, "Invalid product input", "Brand is mandatory.", 396);
  } else {

    User.findOne({username: login.username}, function (err, user) {
      if (err) {
        console.log("unknown error");
        res.status(200).json('unknown');
        return;
      }

      if (!user) {
        console.log("user not found");
        res.status(201).json('user');
        return;
      }
      // Return if password is wrong
      if (!user.validPassword(login.password)) {
        res.status(202).json('password');
        return;
      }
      // If credentials are correct, return the user object
      console.log("bien joué");
      let token = user.generateJwt();
      res.status(203).json(token);
    });


  }

});

let User = mongoose.model('User');

app.post("/api/register", function (req, res) {

  let register = req.body;
  console.log("tentative d'inscription, user: " + register.username);

  if (!register.username) {
    manageError(res, "Invalid input", "Name is mandatory.", 397);
  } else if (!register.password) {
    manageError(res, "Invalid input", "password is mandatory.", 398);
  } else {

    //ici traitement pré requete
    let user = new User();
    let widgetList = new widgetlist;
    //ici la requète
    user.username = register.username;
    user.adress = register.email;
    user.widgetList = widgetList;
    user.setPassword(register.password);
    user.save(function (err, user) {
      if (err) {
        console.error(err);
        res.status(204).json(false);
      } else {
        console.log(user.username + " ajouté à la collection.");
        res.status(205).json(true);
      }
    });
  }});
app.post("/api/check_list", function (req, res) {

  let token= req.body.token;
  let data = req.body.data;
  if(token === undefined){
    manageError(res, "Invalid product input", "token is mandatory.", 399);
    return;
  }
  let userDetails;
  userDetails = getUserDetails(token);
  if(data === undefined){
    User.findOne({username: userDetails.username}, function (err, user) {
      if (err) {
        console.log("unknown error");
        res.status(207).json('unknown');
        return;
      } else {
        console.log(userDetails.username + " ajouté à la collection.");
        res.status(208).json(userDetails.widgetList.toDoList);
      }
    });
  }
  else {
    //ici traitement pré requete
    User.findOne({username: userDetails.username}, function (err, user) {
      if (err) {
        console.log("unknown error");
        res.status(209).json('unknown');
        return;
      } else {
        user.setCheck_list(data);
        user.save(function (err, user) {
          if (err) {
            console.error(err);
            res.status(210).json(false);
          }
          console.log(userDetails.username + " ajouté à la collection.");
          res.status(211).json(true);

        });

      }
    });
  }
});

app.post("/api/profile", function (req, res) {

  let token= req.body.token;
  let data = req.body.data;
  if(token === undefined){
    manageError(res, "Invalid product input", "Name is mandatory.", 400);
    return;
  }
  let userDetails;
  userDetails = getUserDetails(token);
  if(data === undefined){
    User.findOne({username: userDetails.username}, function (err, user) {
      if (err) {
        console.log("unknown error");
        res.status(212).json('unknown');
        return;
      } else {
        res.status(213).json(userDetails.widgetList.profile);
      }
    });
  }
  else {
    //ici traitement pré requete
    User.findOne({username: userDetails.username}, function (err, user) {
      if (err) {
        console.log("unknown error");
        res.status(200).json('unknown');
        return;
      } else {
        user.setProfile(data);
        user.save(function (err, user) {
          if (err) {
            console.error(err);
            res.status(214).json(false);
          }
          console.log(userDetails.username + " ajouté à la collection.");
          res.status(215).json(true);

        });

      }
    });
  }
});
app.post("/api/clock", function (req, res) {

  let token= req.body.token;
  let data = req.body.data;
  if(token === undefined){
    manageError(res, "Invalid product input", "token is mandatory.", 401);
    return;
  }
  let userDetails;
  userDetails = getUserDetails(token);
  if(data === undefined){
    User.findOne({username: userDetails.username}, function (err, user) {
      if (err) {
        console.log("unknown error");
        res.status(216).json('unknown');
        return;
      } else {
        res.status(217).json(userDetails.widgetList.clock);
      }
    });
  }
  else {
    console.log("update de la check_list ", data);
    //ici traitement pré requete
    User.findOne({username: userDetails.username}, function (err, user) {
      if (err) {
        console.log("unknown error");
        res.status(218).json('unknown');
        return;
      } else {
        user.setClock(data);
        user.save(function (err, user) {
          if (err) {
            console.error(err);
            res.status(219).json(false);
          }
          console.log(userDetails.username + " a été update");
          res.status(220).json(true);

        });

      }
    });
  }
});
app.post("/api/agenda", function (req, res) {

  let token= req.body.token;
  let data = req.body.data;
  if(token === undefined){
    manageError(res, "Invalid product input", "token is mandatory.", 402);
    return;
  }
  let userDetails;
  userDetails = getUserDetails(token);
  if(data === undefined){
    User.findOne({username: userDetails.username}, function (err, user) {
      if (err) {
        console.log("unknown error");
        res.status(220).json('unknown');
        return;
      } else {
        res.status(221).json(userDetails.widgetList.calendar);
      }
    });
  }
  else {
    //ici traitement pré requete
    User.findOne({username: userDetails.username}, function (err, user) {
      if (err) {
        console.log("unknown error");
        res.status(222).json('unknown');
        return;
      } else {
        user.setCalendar(data);
        user.save(function (err, user) {
          if (err) {
            console.error(err);
            res.status(223).json(false);
          }
          console.log(userDetails.username + " a été update");
          res.status(224).json(true);

        });

      }
    });
  }
});
app.delete("/api/login/:id", function (req, res) {
  if (req.params.id.length > 24 || req.params.id.length < 24) {
    manageError(res, "Invalid product id", "ID must be a single String of 12 bytes or a string of 24 hex characters.", 403);
  } else {
    database.collection(USERS_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function (err, result) {
      if (err) {
        manageError(res, err.message, "Failed to delete login.");
      } else {
        res.status(225).json(req.params.id);
      }
    });
  }
});

// Errors handler.
function manageError(res, reason, message, code) {
  console.log("Error: " + reason);
  res.status(code || 500).json({"error": message});
}
function getUserDetails(token)
{
  let payload;
  if (token) {
    payload = token.split('.')[1];
    payload = atob(payload);
    return JSON.parse(payload);
  } else {
    return null;
  }
}
