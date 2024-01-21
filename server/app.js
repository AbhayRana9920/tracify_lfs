import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'


import userRoutes from './routes/userRoutes.js'
import ItemRoutes from './routes/ItemRoutes.js'


const app = express()
dotenv.config();
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())

app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // Change this to the actual URL of your client application
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


app.use('/users', userRoutes)

app.use('/Items', ItemRoutes)


const port = process.env.PORT || 4000;
const db = process.env.DB;

mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connected successfully');
        app.listen(port, () => console.log('Server running on PORT: ' + port));
    })
    .catch((err) => console.error('MongoDB connection error: ' + err.message));


