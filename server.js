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
  res.sendFile(path.join(__dirname, "public/index.html"));
});

//deletes notes from db
app.delete("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  console.log(id)
  dbJSON = JSON.parse(fs.readFileSync('db/db.json', 'utf8'));
  const result = dbJSON.filter((note) => note.id!==parseInt(id))
  var count = 0;
  for (const note of result){
    count ++;
    note.id = count;
  } 
  console.log(result)
  fs.writeFileSync('db/db.json', JSON.stringify(result, null, 2, "utf-8"))
  res.json(id);
})



// adds a note to the database true   
app.post(`/api/notes`, (req, res) => {
  const notetoAdd = {
    title:req.body.title,
    text: req.body.text,
    id:null
  };
  dbJSON = JSON.parse(fs.readFileSync('db/db.json', 'utf8'));
  console.log(dbJSON)
  notetoAdd.id = dbJSON.length+1;
  dbJSON.push(notetoAdd);
  fs.writeFileSync('db/db.json', JSON.stringify(dbJSON, null, 2, "utf-8"))
  res.json(dbJSON);
});


app.get(`/api/notes`, (req, res) => {
  res.sendFile(path.join(__dirname, "db/db.json"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/reserve", (req, res) => {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/api/waitlist", (req, res) => {
  // res.sendFile(path.join(__dirname, "reserve.html"));
});



// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});