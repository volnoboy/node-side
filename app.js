//Helpful links
//http://mongoosejs.com/
//http://expressjs.com/en/index.html

//Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var dao = require('./dao/messages-dao');
var assert = require('assert');

//Connect to mongo database
mongoose.connect('localhost');


//Create server
var app = express();

//Use middleware
app.use(bodyParser());

//custom middleware. If app started in debug parameter pizza it will print to console
app.use(pizzaDebug);

function pizzaDebug(req, res, next) {

    if (req.query.debug === 'pizza') {
        return res.send('i like pizza');
    }

    next();
}


//Add our message resource
//Routing for all kind of requests
app.route('/messages/:id?')
    .get(dao.getMessages)
    .post(dao.createMessage)
    .put(dao.updateMessage)
    .delete(dao.deleteMessage);


//This function does't do anything :)
function stam(req, res, next) {
    res.send('stam');
}


// Catch everything else
app.use(function (req, res, next) {
    res.send('hmmm 404');
});

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res, next) {
    console.log('Something go wrong on server!', err);

    if(err.status === 500) {
        res.send('Error 500 happened on server')
    }
});

//Can you explain this?
//Port will be defined on server
app.listen(process.env.PORT || 3000);