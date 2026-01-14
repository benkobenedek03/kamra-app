const express=require("express")
const app = express()
const path = require("path")

app.use(express.json())
app.use(express.static(path.join(__dirname,"public")))


app.get("/", (req,res)=> {
    res.json({helath :"ok"})
})

app.get("/items", (req,res)=>{
    res.json({items:"page"})
})

app.get("/items/:id", (req,res)=>{
    res.json({id:req.params.id})
})

app.post("/items", (req,res) =>{
    
    const body ={
        name:req.body.name,
        quantity:req.body.quantity,
        unit:req.body.unit,
        category:req.body.category,
        uploaded:req.body.uploaded
    } 
    

    res.json()
})



app.listen(3000, ()=>{console.log("http://localhost:3000")})