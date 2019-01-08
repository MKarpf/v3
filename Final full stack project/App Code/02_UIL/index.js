const express = require('express');
const bodyParser = require('body-parser');

const user = require('./controllers/user');
const trivia = require('./controllers/trivia');

const bll = require('./../01_BLL/index');
const app = express();


// Use middlewares (app level - not controller level):
// this middleware takes the content of the request`s body, 
// and parses it to json format
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// add to our "app" server - the controllers that we created in sperated files
user.addUserController(app);
trivia.addTriviaController(app);

// this return the "index" page of the angular app
app.get("/home", (req, res) => {
    res.status(200).sendfile(__dirname + "/views/index.html")
})

let successCallback = () => {
    app.listen(3000, () => {
        console.log("Server runs OK");
    });
};

let failCallback = (err) => {
    console.log("can not run app", err);
    process.exit();
};

switch (process.argv[2]) {
    case 'create':
        bll.createNewDB().then(successCallback).catch(failCallback); break;
    case 'drop':
        bll.dropTables()
            .then(
                () => {
                    console.log("drop with success");
                    process.exit();
                }
            )
            .catch(failCallback); break;
    default:
        bll.connectDb().then(successCallback).catch(failCallback);
}





