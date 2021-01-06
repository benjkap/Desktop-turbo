// Use Express
let express = require("express");
// Use body-parser
let bodyParser = require("body-parser");
// Use MongoDB
let mongodb = require("mongodb");
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
mongodb.MongoClient.connect(process.env.MONGODB_URI || LOCAL_DATABASE,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    }, function (error, client) {

        // Check if there are any problems with the connection to MongoDB database.
        if (error) {
            console.log(error);
            process.exit(1);
        }

        // Save database object from the callback for reuse.
        database = client.db();
        console.log("Database connection done.");

        // Initialize the app.
        let server = app.listen(process.env.PORT || LOCAL_PORT, function () {
            let port = server.address().port;
            console.log("App now running on port", port);
        });
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

    //ici traitement post requete

    //ici la requète

    //envoie resolution
     res.status(201).json('ceci est un id');
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
