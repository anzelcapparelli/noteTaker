// Dependencies
// =============================================================
const path = require("path");
const express = require("express");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



//data stored elsewhere (db.json file)
// =============================================================



// Routes
// =============================================================







// GET /notes

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
  })

// GET /api/notes

// POST /api/notes

// DELETE /api/notes/:id



// catch-all (MUST BE LAST LISTED ROUTE): will route to here if doesn't match any of the above
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
  });




  //----------Port Listener-------------//
app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
  });