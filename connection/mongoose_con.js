var mongoose = require('mongoose');

var connection =
    mongoose.connect('mongodb://localhost:27017/LearningProject')
        .then(x=>{console.log('Success MongoDB')})
        .catch(x=>console.error(x));


module.exports.mongooseConnection = connection;