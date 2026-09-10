import express from 'express'
const PORT = 8080


const app = express()
app.use(express.json())

//Routes 

app.post("/paper/parse",)

app.listen(PORT,()=>{
    console.log(`The app is running on port ${PORT}`)
})