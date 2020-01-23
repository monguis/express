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


app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname,"public/index.html"));
});

//deletes notes from db
app.delete("/api/notes/:id", (req,res)=>{
    id = req.params.id;
    console.log(id)
    dbJSON = JSON.parse(fs.readFileSync('db/db.json', 'utf8'));
    auxElement = dbJSON[id];
    dbJSON.splice(id,1);
    fs.writeFileSync('db/db.json', JSON.stringify(dbJSON,null,2,"utf-8"))
    res.json(auxElement);
})

// adds a note to the database true
app.post(`/api/notes`, (req, res) => {
    const notetoAdd = req.body;
    dbJSON = JSON.parse(fs.readFileSync('db/db.json', 'utf8'));
    console.log(dbJSON)
    dbJSON.push(notetoAdd);
    fs.writeFileSync('db/db.json', JSON.stringify(dbJSON,null,2,"utf-8"))
    res.json(dbJSON);
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