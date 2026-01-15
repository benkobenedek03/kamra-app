const express=require("express")
const app = express()
const path = require("path")
const fs = require("fs/promises")

app.use(express.json())
app.use(express.static(path.join(__dirname,"public")))



const getData = async ()=>{
    return await fs.readFile(path.join(__dirname,"data","products.json"),"utf-8")
}
const saveData = async (products)=>{
    await fs.writeFile(path.join(__dirname,"data","products.json"),JSON.stringify(products))
}

app.get("/", (req,res)=> {
    res.send()
})

app.get("/items",async (req,res)=>{

    const read= await getData()
    const data=JSON.parse(read)
    
    res.json(data)

})

app.get("/items/:id", (req,res)=>{
    res.json({id:req.params.id})
})

app.post("/items", async (req,res) =>{
    let data= JSON.parse(await getData())

    const body ={
        name:req.body.name,
        quantity:req.body.quantity,
        unit:req.body.unit
    } 
    data.push(body)

    await saveData(data)
    
    
    res.json({status:"ok"})
})



app.listen(3000, ()=>{console.log("http://localhost:3000")})