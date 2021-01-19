// Dependencies
// =============================================================
const path = require("path");
const express = require("express");
const fs = require("fs");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"))


// // The code below points the server to a series of "route" files. These routes
// // give our server a "map" of how to respond when users visit or request data
// // from various URLs.
// require("./routes/apiRoutes")(app);
// require("./routes/htmlRoutes")(app);

// ^^^ do only if you put routes into own files!


//data stored elsewhere (db.json file)
// =============================================================



// Routes
// =============================================================







// GET /notes

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
    // .sendFile(path.join(__dirname, "./public/assets/js/index.js"))
    // .sendFile(path.join(__dirname, "./public/assets/css/style.css"));
    // .sendFile(path.join(__dirname, "./public/notes.html"))
    // res.sendFile(path.join(__dirname, "./public/notes.html"));
})

// GET /api/notes
app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./db/db.json"));
})

// gonna need to send as a request to show on the notes page!


// POST /api/notes
app.post("/api/notes", (req, res) => {

    let dbArr = [];

    fs.readFile(path.join(__dirname, "./db/db.json"), 'utf8', (err, data) => {
        if (err) throw err;

        dbArr = JSON.parse(data);
        
        const lastId = (dbArr.length > 0) ? parseInt(dbArr[dbArr.length - 1].id) : 0;

        const newNote = req.body;
        newNote.id = lastId + 1;
        
        console.log(newNote);
        
        dbArr.push(newNote);

        console.log(dbArr);
        
        res.send(dbArr);
    })

    // const lastId= ;

    //     const newNote = req.body;

    // req.body: add "id" property to object; ref last object in json, ++ update, use num as id val;
    // req.body: add right before final object (splice, I think)

    // res.sendFile(path.join(__dirname, "./db/db.json"));
})



// DELETE /api/notes/:id


// response.end(`Life is beautifully terrible, which is what makes it so breathtaking`);
// searchedCharacter = searchedCharacter.replace(/\s+/g, "").toLowerCase();
// $.get("/api/characters/" + searchedCharacter, function(data) {

app.get("./assets/js/index.js", (req, res) => {
    res.sendFile(path.join(__dirname, "./assets/js/index.js"));
});



// catch-all (MUST BE LAST LISTED ROUTE): will route to here if doesn't match any of the above
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});




//----------Port Listener-------------//
app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
});