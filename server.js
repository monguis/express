// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var fs = require("fs");


// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public/'))
app.use(express.json());


// Star Wars Characters (DATA)
// =============================================================
var reservations = [
  {
    routeName: "garrettkrage",
    name: "garrett krage",
    phoneNumber: "7193404935",
    email: 'garrett.krage@yahoo.com',
    uniqueID: 'hungry man'
  },
];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname,"public/index.html"));
});



// // Create New Characters - takes in JSON input
// app.post("/api/reservations", function (req, res) {
//     // req.body hosts is equal to the JSON post sent from the user
//     // This works because of our body parsing middleware
//     var newCharacter = req.body;
  
//     // Using a RegEx Pattern to remove spaces from newCharacter
//     // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
//     newCharacter.routeName = newCharacter.name.replace(/\s+/g, "").toLowerCase();
  
//     console.log(newCharacter);
  
//     characters.push(newCharacter);
  
//     res.json(newCharacter);
//   });

// //   * POST `/api/notes` - Should recieve a new note to save on the request body, 
// //   add it to the `db.json` file, and then return the new note to the client.

app.post(`/api/notes`, (req, res) => {
    const notetoAdd = req.body;
    dbJSON = JSON.parse(fs.readFileSync('db/db.json', 'utf8'));
    console.log(dbJSON)
    dbJSON.push(notetoAdd);
    fs.writeFileSync('db/db.json', JSON.stringify(dbJSON,null,2,"utf-8"))
    
    res.json(notetoAdd);
  });


app.get(`/api/notes`, (req, res) => {
    res.sendFile(path.join(__dirname,"db/db.json"));
  });

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname,"public/notes.html"));
});

app.get("/reserve", (req, res) => {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/api/waitlist", (req, res) => {
  // res.sendFile(path.join(__dirname, "reserve.html"));
});



// Displays all characters
app.get("/tables", function (req, res) {
  return res.json(reservations);
});

// Displays a single character, or returns false
app.get("/api/reservations/:reservation", function (req, res) {
  var chosen = req.params.reservations;

  console.log(chosen);

  for (var i = 0; i < reservations.length; i++) {
    if (chosen === reservations[i].routeName) {
      return res.json(reservations[i]);
    }
  }

  return res.json(false);
});



// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});