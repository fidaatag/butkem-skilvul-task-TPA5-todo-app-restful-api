const mongoose = require('mongoose');

require('dotenv').config();
const url = process.env.DB_URL;

exports.connecToDB = () => {
    mongoose.connect(url)
    .then((con) => {
        console.log(`connected to database: ${con.connection.name}`);
    })
    .catch(err => {
        console.log(err.message);
    });
};
