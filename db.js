const mongoose = require('mongoose');
module.exports = () => {

  mongoose.connect('mongodb://nodejs-app-with-jwt-user:qwe123@ds147354.mlab.com:47354/nodejs-app-with-jwt');

  mongoose.connection.on('open', () => {
    console.log("MongoDB: Connected");
});

  mongoose.connection.on('error', (err) => {
    console.log("MongoDB: Error", err);
});

  mongoose.Promise = global.Promise;
};