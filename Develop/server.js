const express = require('express');
const notes = require('./db/db.json')

const path = require('path');
const fs = require('fs');
const {v4: uuidv4 } = require('uuid');


const app = express();

const PORT = process.env.PORT || 3400;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


app.get('/api/notes', (req,res) => {
    res.json(db);
});

app.post('/api/notes', (req, res) => {
    
    let newNote = req.body;
    newNote.id = uuidv4();
    db.push(newNote);
    fs.writeFileSync("./Develop/db/db.json", JSON.stringify(db), (err) => {
        if(err) throw err;
    });
    res.send(db)
})


app.delete('/api/notes/:id', (req, res) => {
    db.forEach((note, i) => {
        if (note.id === req.params.id) {db.splice(i, 1)}
})

fs.writeFile('./db/db.json', JSON.stringify(db), (err) => {
    if(err) throw err;
})
res.send(db)
})

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));


app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT)
});