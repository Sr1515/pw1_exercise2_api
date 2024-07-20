import express from 'express'
import routes from './routes/index.routes'
import dotenv from "dotenv"

dotenv.config()
const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(routes)


app.listen(PORT, () => {
    console.table({
        PORT,
        url: `http://localhost:${PORT}`
    })
})