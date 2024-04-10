const express = require('express')
const app = express()
const PORT = 5000



const customMiddleware = (req, res, next)=>{
    console.log("middleware executed")
    next()
}

app.use(customMiddleware)

app.get('/', (req,res) =>{
    res.send("hello world")
})

app.listen(PORT,() =>{
    console.log("server running on", PORT)
})