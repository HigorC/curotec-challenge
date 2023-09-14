import mongoose from "mongoose"
import dotenv from "dotenv"

import app from "./app.js"

dotenv.config();

const PORT = process.env.PORT || 8000
const DATABASE_URL = process.env.DATABASE_URL

mongoose.connect(DATABASE_URL, {}).then(() => {
    console.log('Connected to Mongo DB')
})

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})
