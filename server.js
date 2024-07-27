import express from 'express'
import { dbConnection } from './database/dbConnection.js'
import dotenv from 'dotenv'
import bootstrap from './src/bootstrap.js'
dotenv.config()  

const app = express()
app.use('/uploads', express.static('uploads'))

const port = +process.env.PORT


bootstrap(app)
dbConnection()
app.listen(port,
    () => console.log(`Example app listening on port ${port}!`)
)