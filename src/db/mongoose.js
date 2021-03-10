const mongoose = require('mongoose');
let { DBPath } = require('../config.js');
DBConnectionOptions = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}

function mongoDB() {
    mongoose.connect(DBPath, DBConnectionOptions)
        .then(() => {
            console.log('MongoDB connected successfully')
        })
        .catch((err) => console.log('error', err))

}
module.exports = mongoDB;