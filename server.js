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

let shortcutSchema = mongoose.model('shortcutSchema');
let calendarSchema = mongoose.model('calendarSchema');
let toDoListSchema = mongoose.model('toDoListSchema');
let contactSchema = mongoose.model('contactSchema');
let notificationSchema = mongoose.model('notificationSchema');
let coordinatesSchema= mongoose.model('coordinatesSchema');
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
  res.status(196).json({status: "UP"});
});

app.post("/api/token", function (req, res) {

  let token = req.body.token;
  if(token === undefined){
    manageError(res, "Invalid product input", "token is mandatory.", 517);
  } else{
    let userDetails;
    userDetails = getUserDetails(token);
    User.findOne({_id: userDetails._id}, function (err, user) {
      if (err) {
        console.log("unknown error");
        res.status(197).json('false');
      } else if (!user) {
        console.log("user not found");
        res.status(198).json('false');
      } else {
        console.log('ça marche');
        let token = user.generateJwt();
        res.status(199).json(token);
      }
    });

  }

});

app.post("/api/login", function (req, res) {

  let login = req.body;

  console.log('tentative de connection, user: ' + login.username);

  if (!login.username) {
    manageError(res, "Invalid product input", "Name is mandatory.", 516);
  } else if (!login.password) {
    manageError(res, "Invalid product input", "Brand is mandatory.", 515);
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
    manageError(res, "Invalid input", "Name is mandatory.", 514);
  } else if (!register.password) {
    manageError(res, "Invalid input", "password is mandatory.", 513);
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
  }
});

app.post("/api/check_list", function (req, res) {

  let token = req.body.token;
  let data = req.body.data;
  console.log(data);

  if (token === undefined) {
    manageError(res, "Invalid product input", "token is mandatory.", 512);
    return;
  }
  let userDetails;
  userDetails = getUserDetails(token);
  if (data === undefined) {
    User.findOne({_id: userDetails._id}, function (err, user) {
      if (err) {
        console.log("unknown error");
        res.status(207).json('unknown');
      } else {
        console.log(userDetails.username + " ajouté à la collection.");
        res.status(208).json(user.widgetList.toDoList);
      }
    });
  } else {
    //ici traitement pré requete
    User.findOne({_id: userDetails._id}, function (err, user) {
      if (err) {
        console.log("unknown error");
        res.status(209).json('unknown');
      } else {
        user.setCheck_list(data);
        user.save(function (err, user) {
          if (err) {
            console.error(err);
            res.status(210).json(false);
          } else {
            console.log(userDetails.username + " ajouté à la collection.");
            res.status(211).json(true);
          }
        });

      }
    });
  }
});

app.post("/api/contact", function (req, res) {

  let token = req.body.token;
  let data = req.body.data;
  if (token === undefined) {
    manageError(res, "Invalid product input", "token is mandatory.", 511);
    return;
  }
  let userDetails;
  userDetails = getUserDetails(token);
  if (data === undefined) {
    User.findOne({_id: userDetails._id}, function (err, user) {
      if (err) {
        console.log("unknown error");
        res.status(207).json('unknown');
      } else {
        console.log(userDetails.username + " ajouté à la collection.");
        res.status(208).json(user.widgetList.contacts);
      }
    });
  } else {
    console.log("update de la check_list ", data);
    //ici traitement pré requete
    User.findOne({_id: userDetails._id}, function (err, user) {
      if (err) {
        console.log("unknown error");
        res.status(209).json('unknown');
      } else {
        user.setContact(data);
        user.save(function (err, user) {
          if (err) {
            console.error(err);
            res.status(210).json(false);
          } else {
            console.log(userDetails.username + " ajouté à la collection.");
            res.status(211).json(true);
          }
        });

      }
    });
  }
});

app.post("/api/profile/username", function (req, res) {

  let token = req.body.token;
  let data = req.body.data;
  if (token === undefined) {
    manageError(res, "Invalid product input", "Name is mandatory.", 510);
    return;
  }
  let userDetails;
  userDetails = getUserDetails(token);
  if (data === undefined) {
    User.findOne({_id: userDetails._id}, function (err, user) {
      if (err) {
        console.log("unknown error");
        res.status(212).json('unknown');
      } else {
        res.status(213).json(user.username);
      }
    });
  } else {
    //ici traitement pré requete
    User.findOne({_id: userDetails._id}, function (err, user) {
      if (err) {
        console.log("unknown error");
        res.status(214).json(userDetails.username);
      } else {
        user.username = data;
        user.save(function (err, user) {
          if (err) {
            console.error(err);
            res.status(215).json(userDetails.username);
          } else {
            User.findOne({username: user.username}, function (err, user) {
              if (user || err) {
                console.log(userDetails.username + " ajouté à la collection.");
                res.status(271).json('userIsFree');
              }
              else { res.status(270).json(userDetails.username); }
            });
          }
        });

      }
    });
  }
});

app.post("/api/profile/address", function (req, res) {

  let token = req.body.token;
  let data = req.body.data;
  if (token === undefined) {
    manageError(res, "Invalid product input", "Name is mandatory.", 509);
    return;
  }
  let userDetails;
  userDetails = getUserDetails(token);
  if (data === undefined) {
    User.findOne({_id: userDetails._id}, function (err, user) {
      if (err) {
        console.log("unknown error");
        res.status(217).json('unknown');
      } else {
        res.status(218).json(user.adress);
      }
    });
  } else {
    //ici traitement pré requete
    User.findOne({_id: userDetails._id}, function (err, user) {
      if (err) {
        console.log("unknown error");
        res.status(219).json('unknown');
      } else {
        user.adress = data;
        user.save(function (err, user) {
          if (err) {
            console.error(err);
            res.status(220).json(false);
          } else {
            console.log(userDetails.username + " ajouté à la collection.");
            res.status(221).json(true);
          }
        });

      }
    });
  }
});
app.post("/api/profile/background", function (req, res) {

  let token = req.body.token;
  let data = req.body.data;
  if (token === undefined) {
    manageError(res, "Invalid product input", "Name is mandatory.", 508);
    return;
  }
  let userDetails;
  userDetails = getUserDetails(token);
  if (data === undefined) {
    User.findOne({_id: userDetails._id}, function (err, user) {
      if (err) {
        console.log("unknown error");
        res.status(222).json('unknown');
      } else {
        res.status(223).json(user.background);
      }
    });
  } else {
    //ici traitement pré requete
    User.findOne({_id: userDetails._id}, function (err, user) {
      if (err) {
        console.log("unknown error");
        res.status(224).json('unknown');
      } else {
        user.background = data;
        user.save(function (err, user) {
          if (err) {
            console.error(err);
            res.status(225).json(false);
          } else {
            console.log(userDetails.username + " ajouté à la collection.");
            res.status(226).json(true);
          }
        });
      }
    });
  }
});
app.post("/api/clock", function (req, res) {

  let token = req.body.token;
  let data = req.body.data;
  if (token === undefined) {
    manageError(res, "Invalid product input", "token is mandatory.", 507);
    return;
  }
  let userDetails;
  userDetails = getUserDetails(token);
  if (data === undefined) {
    User.findOne({_id: userDetails._id}, function (err, user) {
      if (err) {
        console.log("unknown error");
        res.status(227).json('unknown');
      } else {
        res.status(228).json(user.widgetList.clock);
      }
    });
  } else {
    console.log("update de la check_list ", data);
    //ici traitement pré requete
    User.findOne({_id: userDetails._id}, function (err, user) {
      if (err) {
        console.log("unknown error");
        res.status(229).json('unknown');
      } else {
        user.setClock(data);
        user.save(function (err, user) {
          if (err) {
            console.error(err);
            res.status(230).json(false);
          }
          res.status(231).json(true);

        });

      }
    });
  }
});

app.post("/api/agenda", function (req, res) {

  let token = req.body.token;
  let data = req.body.data;
  if (token === undefined) {
    manageError(res, "Invalid product input", "token is mandatory.", 506);
    return;
  }
  let userDetails;
  userDetails = getUserDetails(token);
  if (data === undefined) {
    User.findOne({_id: userDetails._id}, function (err, user) {
      if (err) {
        console.log("unknown error");
        res.status(232).json('unknown');
      } else {
        res.status(233).json(use.widgetList.calendar);
      }
    });
  } else {
    //ici traitement pré requete
    User.findOne({_id: userDetails._id}, function (err, user) {
      if (err) {
        console.log("unknown error");
        res.status(234).json('unknown');
      } else {
        user.setCalendar(data);
        user.save(function (err, user) {
          if (err) {
            console.error(err);
            res.status(235).json(false);
          } else {
            console.log(userDetails.username + " a été update");
            res.status(236).json(true);
          }
        });

      }
    });
  }
});

app.post("/api/note", function (req, res) {

  let token = req.body.token;
  let data = req.body.data;
  if (token === undefined) {
    manageError(res, "Invalid product input", "token is mandatory.", 402);
    return;
  }
  let userDetails;
  userDetails = getUserDetails(token);
  if (data === undefined) {
    User.findOne({_id: userDetails._id}, function (err, user) {
      if (err) {
        console.log("unknown error");
        res.status(235).json('unknown');
      } else {
        res.status(236).json(user.widgetList.notepad);
      }
    });
  } else {
    //ici traitement pré requete
    User.findOne({_id: userDetails._id}, function (err, user) {
      if (err) {
        console.log("unknown error");
        res.status(237).json('unknown');
      } else {
        user.setNote(data);
        user.save(function (err, user) {
          if (err) {
            console.error(err);
            res.status(238).json(false);
          } else {
            console.log(userDetails.username + " a été update");
            res.status(239).json(true);
          }
        });

      }
    });
  }
});

app.post("/api/coords/clock", function (req, res) {

  let token = req.body.token;
  let coords = req.body.coords;
  if (token === undefined) {
    manageError(res, "Invalid product input", "token is mandatory.", 505);
    return;
  }
  let userDetails;
  userDetails = getUserDetails(token);
  if (coords === undefined) {
    User.findOne({_id: userDetails._id}, function (err, user) {
      if (err) {
        console.log("unknown error");
        res.status(237).json('unknown');
      } else {
        res.status(238).json(user.widgetList.clock.coordinates);
      }
    });
  } else {
    //ici traitement pré requete
    User.findOne({_id: userDetails._id}, function (err, user) {
      if (err) {
        console.log("unknown error");
        res.status(239).json('unknown');
      } else {

        let tmp = new coordinatesSchema();
        tmp.x = coords.x;
        tmp.y = coords.y;
        user.widgetList.clock.coordinates=tmp;
        user.save(function (err, user) {
          if (err) {
            console.error(err);
            res.status(240).json(false);
          } else {
            console.log(userDetails.username + " a été update");
            res.status(241).json(true);
          }
        });

      }
    });
  }
});
app.post("/api/coords/check", function (req, res) {

  let token = req.body.token;
  let coords = req.body.coords;
  if (token === undefined) {
    manageError(res, "Invalid product input", "token is mandatory.", 504);
    return;
  }
  let userDetails;
  userDetails = getUserDetails(token);
  if (coords === undefined) {
    User.findOne({_id: userDetails._id}, function (err, user) {
      if (err) {
        console.log("unknown error");
        res.status(242).json('unknown');
      } else {
        res.status(243).json(user.widgetList.toDoList.coordinates);
      }
    });
  } else {
    //ici traitement pré requete
    User.findOne({_id: userDetails._id}, function (err, user) {
      if (err) {
        console.log("unknown error");
        res.status(244).json('unknown');
      } else {
        let tmp = new coordinatesSchema();
        tmp.x = coords.x;
        tmp.y = coords.y;
        user.widgetList.toDoList.coordinates=tmp;
        user.save(function (err, user) {
          if (err) {
            console.error(err);
            res.status(245).json(false);
          } else {
            console.log(userDetails.username + " a été update");
            res.status(246).json(true);
          }
        });

      }
    });
  }
});
app.post("/api/coords/calc", function (req, res) {

  let token = req.body.token;
  let coords = req.body.coords;
  if (token === undefined) {
    manageError(res, "Invalid product input", "token is mandatory.", 503);
    return;
  }
  let userDetails;
  userDetails = getUserDetails(token);
  if (coords === undefined) {
    User.findOne({_id: userDetails._id}, function (err, user) {
      if (err) {
        console.log("unknown error");
        res.status(247).json('unknown');
      } else {
        res.status(248).json(user.widgetList.calculator.coordinates);
      }
    });
  } else {
    //ici traitement pré requete
    User.findOne({_id: userDetails._id}, function (err, user) {
      if (err) {
        console.log("unknown error");
        res.status(249).json('unknown');
      } else {
        let tmp = new coordinatesSchema();
        tmp.x = coords.x;
        tmp.y = coords.y;
        user.widgetList.calculator.coordinates=tmp;
        user.save(function (err, user) {
          if (err) {
            console.error(err);
            res.status(250).json(false);
          } else {
            console.log(userDetails.username + " a été update");
            res.status(251).json(true);
          }
        });

      }
    });
  }
});
app.post("/api/coords/rep", function (req, res) {

  let token = req.body.token;
  let coords = req.body.coords;
  if (token === undefined) {
    manageError(res, "Invalid product input", "token is mandatory.", 502);
    return;
  }
  let userDetails;
  userDetails = getUserDetails(token);
  if (coords === undefined) {
    User.findOne({_id: userDetails._id}, function (err, user) {
      if (err) {
        console.log("unknown error");
        res.status(252).json('unknown');
      } else {
        res.status(253).json(user.widgetList.contacts.coordinates);
      }
    });
  } else {
    //ici traitement pré requete
    User.findOne({_id: userDetails._id}, function (err, user) {
      if (err) {
        console.log("unknown error");
        res.status(254).json('unknown');
      } else {
        let tmp = new coordinatesSchema();
        tmp.x = coords.x;
        tmp.y = coords.y;
        user.widgetList.contacts.coordinates=tmp;
        user.save(function (err, user) {
          if (err) {
            console.error(err);
            res.status(255).json(false);
          } else {
            console.log(userDetails.username + " a été update");
            res.status(256).json(true);
          }
        });

      }
    });
  }
});
app.post("/api/coords/agenda", function (req, res) {

  let token = req.body.token;
  let coords = req.body.coords;
  if (token === undefined) {
    manageError(res, "Invalid product input", "token is mandatory.", 504);
    return;
  }
  let userDetails;
  userDetails = getUserDetails(token);
  if (coords === undefined) {
    User.findOne({_id: userDetails._id}, function (err, user) {
      if (err) {
        console.log("unknown error");
        res.status(257).json('unknown');
      } else {
        res.status(258).json(user.widgetList.calendar.coordinates);
      }
    });
  } else {
    //ici traitement pré requete
    User.findOne({_id: userDetails._id}, function (err, user) {
      if (err) {
        console.log("unknown error");
        res.status(259).json('unknown');
      } else {
        let tmp = new coordinatesSchema();
        tmp.x = coords.x;
        tmp.y = coords.y;
        user.widgetList.calendar.coordinates=tmp;
        user.save(function (err, user) {
          if (err) {
            console.error(err);
            res.status(260).json(false);
          } else {
            console.log(userDetails.username + " a été update");
            res.status(261).json(true);
          }
        });

      }
    });
  }
});

app.post("/api/admin", function (req, res) {

  let token = req.body.token;
  let data = req.body.data;
  if (token === undefined) {
    manageError(res, "Invalid product input", "token is mandatory.", 505);
    return;
  }
  let userDetails;
  userDetails = getUserDetails(token);
  if (data === undefined) {
    User.find({}, function (err, users) {
      if (err) {
        console.log("unknown error");
        res.status(252).json('unknown');
      } else {
        res.status(253).json(users);
      }
    });
  } else {
    //ici traitement pré requete
    User.find({}, function (err, users) {
      if (err) {
        console.log("unknown error");
        res.status(254).json('unknown');
      } else {

        let i = 0;
        for (let userData of data) {
          users[i].widgetList = userData.widgetList;
          i++;
        }

        console.log(users[0].widgetList.clock);
        for (let user of users) {
          user.save(function (err, user) {
            if (err) {
              console.error(err);
              res.status(255).json(false);
            } else {
              console.log(user.username + " a été update");
            }
          });
        }
        res.status(256).json(true);
      }
    });
  }
});
app.post("/api/visibility/clock", function (req, res) {

  let token = req.body.token;
  if (token === undefined) {
    manageError(res, "Invalid product input", "token is mandatory.", 506);
    return;
  }
  let userDetails;
  userDetails = getUserDetails(token);
  User.findOne({_id: userDetails._id}, function (err, user) {
    if (err) {
      console.log("unknown error");
      res.status(270).json('unknown');
    } else {
        res.status(271).json(user.widgetList.clock.isShown);
      }
    });
});
app.post("/api/visibility/check", function (req, res) {

  let token = req.body.token;
  if (token === undefined) {
    manageError(res, "Invalid product input", "token is mandatory.", 507);
    return;
  }
  let userDetails;
  userDetails = getUserDetails(token);
  User.findOne({_id: userDetails._id}, function (err, user) {
    if (err) {
      console.log("unknown error");
      res.status(272).json('unknown');
    } else {
      res.status(273).json(user.widgetList.toDoList.isShown);
    }
  });
});
app.post("/api/visibility/calc", function (req, res) {

  let token = req.body.token;
  if (token === undefined) {
    manageError(res, "Invalid product input", "token is mandatory.", 508);
    return;
  }
  let userDetails;
  userDetails = getUserDetails(token);
  User.findOne({_id: userDetails._id}, function (err, user) {
    if (err) {
      console.log("unknown error");
      res.status(274).json('unknown');
    } else {
      res.status(275).json(user.widgetList.calculator.isShown);
    }
  });
});
app.post("/api/visibility/agenda", function (req, res) {

  let token = req.body.token;
  if (token === undefined) {
    manageError(res, "Invalid product input", "token is mandatory.", 509);
    return;
  }
  let userDetails;
  userDetails = getUserDetails(token);
  User.findOne({_id: userDetails._id}, function (err, user) {
    if (err) {
      console.log("unknown error");
      res.status(276).json('unknown');
    } else {
      res.status(277).json(user.widgetList.calendar.isShown);
    }
  });
});
app.post("/api/visibility/rep", function (req, res) {

  let token = req.body.token;
  if (token === undefined) {
    manageError(res, "Invalid product input", "token is mandatory.", 510);
    return;
  }
  let userDetails;
  userDetails = getUserDetails(token);
  User.findOne({_id: userDetails._id}, function (err, user) {
    if (err) {
      console.log("unknown error");
      res.status(278).json('unknown');
    } else {
      res.status(279).json(user.widgetList.contacts.isShown);
    }
  });
});
app.delete("/api/login/:id", function (req, res) {
  if (req.params.id.length > 24 || req.params.id.length < 24) {
    manageError(res, "Invalid product id", "ID must be a single String of 12 bytes or a string of 24 hex characters.", 500);
  } else {
    database.collection(USERS_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function (err, result) {
      if (err) {
        manageError(res, err.message, "Failed to delete login.");
      } else {
        res.status(280).json(req.params.id);
      }
    });
  }
});


// Errors handler.
function manageError(res, reason, message, code) {
  console.log("Error: " + reason);
  res.status(code || 500).json({"error": message});
}

function getUserDetails(token) {
  let payload;
  if (token) {
    payload = token.split('.')[1];
    payload = atob(payload);
    return JSON.parse(payload);
  } else {
    return null;
  }
}
