import express from 'express'
const PORT = 8080
import paper from './routes/papers'


const app = express()
app.use(express.json())

//Routes 

app.post("/paper/parse",paper)

app.listen(PORT,()=>{
    console.log(`The app is running on port ${PORT}`)
})