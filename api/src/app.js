import express from 'express'
import dotenv from "dotenv"
import createHttpError from 'http-errors'
import cors from "cors"

import routes from "./routes/index.js"

dotenv.config();

const app = express()

app.use(cors())
app.use(express.json())
app.use("/api/v1", routes) 

app.use(async (req, res, next) => {
    next(createHttpError.NotFound('This route does not exist'))
})

app.use((err, req, res, next) => {
    console.log({ err, req });
    res.status(err.status || 500)
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    })
    next()
})

export default app;