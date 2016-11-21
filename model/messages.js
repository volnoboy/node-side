/**
 * Created by Reuven on 11/21/16.
 */
var mongoose = require('mongoose');

//Our model for mongoose with validation
module.exports = mongoose.model(
    'Message', {
        title:  { type: String,  required: [true, 'Why no title?'] },
        message: { type: String, required: [true, 'Why no message?'] },
        created: Date
    });
