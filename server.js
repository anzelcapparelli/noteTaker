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

// POST /api/notes
app.post("/api/notes", (req, res) => {

    let dbArr = [];

    fs.readFile(path.join(__dirname, "./db/db.json"), 'utf8', (err, data) => {
        if (err) throw err;

        // shouldn't it be if(data)?
        if (dbArr) {
            dbArr = JSON.parse(data);
        }

        const lastId = (dbArr.length > 0) ? parseInt(dbArr[dbArr.length - 1].id) : 0;

        const newNote = req.body;
        newNote.id = lastId + 1;

        console.log(newNote);

        dbArr.push(newNote);

        console.log(dbArr);

        fs.writeFile("./db/db.json", JSON.stringify(dbArr), (err) => {
            err ? console.error(err) : console.log("success!")
        });

        res.send();
    })


    // req.body: add right before final object (splice, I think)

    // res.sendFile(path.join(__dirname, "./db/db.json"));
})



// DELETE /api/notes/:id

app.delete("/api/notes/:id", (req, res) => {

    const delId = parseInt(req.params.id);
    let dbArr = [];

    fs.readFile(path.join(__dirname, "./db/db.json"), 'utf8', (err, data) => {
        if (err) throw err;

        console.log(`reading file for deletion of ${delId}`);


        if (dbArr) {
            dbArr = JSON.parse(data);
        }

        console.log(dbArr.length);

        // id not in req.body?

        for (i = 0; i < dbArr.length; i++) {

            if (dbArr[i].id === delId) {
                dbArr.splice(i,1);
            }
        }

        fs.writeFile("./db/db.json", JSON.stringify(dbArr), (err) => {
            err ? console.error(err) : console.log("success!")
        });

        res.send();


        // dbArr.splice()

        // read & write files: as string!

        // likely gonna be real similar to post!
        // read json.db file, parse it, use id# with for loop: is matches, splice/split/get rid of that object
        // save new db.json file



    })

})
// =============================================================



// response.end(``);
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