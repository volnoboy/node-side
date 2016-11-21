/**
 * Created by Reuven on 11/21/16.
 */
var Message = require('./../model/messages');
var express = require('express');
var assert = require('assert');

function errorObject(message, status) {
    var err = new Error(message);
    err.status = status;
    return err;
}


//Dao for messages with all crud operations
module.exports = {


//Get list of messages
    getMessages: function getMessages(req, res, next) {
    var query = Message.find();

    if (req.params.id) {
        query.where('_id', req.params.id);
    }

      //What page we are on
    var page = Math.max(0, req.param('page'))
        //How many rows fit in page
    var perPage = 2;

        //Added sorting
    var sort = req.param('sort') === undefined ? 'asc' : req.param('sort');


    query
        .limit(req.query.limit || perPage)
        .skip(perPage * page)
        .sort({
            title: sort
        })
        .exec(function (err, messages) {
            if (err) {
                return next(errorObject('Something wrong in createMessage', 500));
            }
                 

            res.send(messages);
        })
},
    
    createMessage: function createMessage(req, res, next) {

    var message = new Message(req.body);

    message.save(function (err) {
        if (err) {
            //Do you think it might be preferable to use next(err) ?
            //What would happen if there we removed the return
            return res.send(500, 'Oops')
        }

        res.send(200);
    });
},

    //Update message by id passed in parameters
    updateMessage: function updateMessage(req, res, next) {

    if (!req.params.id) {
        return res.send(400, ' missing message id');
    }

    Message.update({
        _id: req.params.id
    }, {
        $set: {
            title: req.body.title,
            message: req.body.message
        }
    }, function (err) {
        if (err) return res.send(500);
        res.send(200);
    })
},

    //Delete message by id passed in parameters
    deleteMessage: function deleteMessage(req, res, next) {

    if (!req.params.id) {
        return res.send(400, ' missing message id');
    }

    Message.remove({
        _id: req.params.id
    }, function (err) {
        if (err) return res.send(500);
        res.send(200);
    })
}
}