const express = require('express');
const app = express();
const cors = require('cors');
const { connecToDB } = require('./config/db');
require('dotenv').config()
const PORT = process.env.PORT;
const userRouter = require('./routes/userRoutes')
const todoRouter = require('./routes/todoRoutes')
const bodyParser = require('body-parser')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// db connection
connecToDB()

app.use(userRouter)
app.use(todoRouter)

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
});