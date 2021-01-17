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
app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./db/db.json"));
})

// gonna need to send as a request to show on the notes page!


// POST /api/notes
app.post("/api/notes", (req, res) => {

    // read file, convert from json? JSON.parse
    // store as var
    
    // req.body: add "id" property to object; ref last object in json, ++ update, use num as id val;
    // req.body: add right before final object (splice, I think)

    // res.sendFile(path.join(__dirname, "./db/db.json"));
})



// DELETE /api/notes/:id


// response.end(`Life is beautifully terrible, which is what makes it so breathtaking`);
// searchedCharacter = searchedCharacter.replace(/\s+/g, "").toLowerCase();
// $.get("/api/characters/" + searchedCharacter, function(data) {



// catch-all (MUST BE LAST LISTED ROUTE): will route to here if doesn't match any of the above
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});




//----------Port Listener-------------//
app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
});