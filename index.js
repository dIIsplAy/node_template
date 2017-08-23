const express = require('express');
const mustache = require('mustache');
const fs = require('fs');
const bodyParser = require('body-parser');
let app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


let events = [

]

app.post("/event/add", function(rep, resp) {
    let name = rep.body.name;
    let place = rep.body.place;
    let event = {
        name: name,
        place: place,
    };
    events.push(event);
    resp.send("event added");
});

app.get("/", function(req, resp) {
    resp.render('index', {
        event: events
    });
});


app.engine("html", function(path, options, callback) {
    fs.readFile(path, function(err, content) {
        if (err) {
            console.error("fail to open template:", err);
            return callback(err);
        }
        let str = mustache.render(content.toString(), options);
        return callback(null, str);
    })
});

// specify the views directory
app.set('views', './template');
// register the template engine
app.set('view engine', 'html');

app.use(express.static("public"));

app.listen(80, "localhost", function() {
    console.log('Server ready to stage');
});