const express=require("express")
const app = express()
const path = require("path")
const fs = require("fs/promises")
const { text, json } = require("stream/consumers")
const { stringify } = require("querystring")

app.use(express.json())
app.use(express.static(path.join(__dirname,"public")))

const DATA_PATH=path.join(__dirname,"data","products.json")

const getData = async ()=>{
    try {
        return await fs.readFile(DATA_PATH,"utf-8")
    } catch (error) {
        return "[]"
    }
    
}
const saveData = async (products)=>{
    await fs.writeFile(DATA_PATH,JSON.stringify(products,null,2))
}

app.get("/", (req,res)=> {
    res.send()
})

app.get("/items", async (req, res) => {
    const read = await getData()
    let data = read ? JSON.parse(read) : []
    
    const filter = req.query.category;

    if (filter) {
        if (filter === "MISSING") {
            // SPECIÁLIS SZŰRŐ: Csak ami elfogyott (quantity == 0)
            data = data.filter(item => item.quantity === 0);
        } else {
            // NORMÁL SZŰRŐ: Kategória szerint
            data = data.filter(item => item.category === filter);
        }
    }

    // Opcionális: Rendezzük úgy, hogy a 0 mennyiségűek legyenek legelöl
    data.sort((a, b) => a.quantity - b.quantity); 

    res.json(data)
})

app.get('/items/:id', async (req,res)=>{
    const data = JSON.parse(await getData())
    const id=Number(req.params.id)
    const product=data.filter(product=>product.id==id)

    res.json(product[0])
})

app.post("/items", async (req,res) =>{
    let data= JSON.parse(await getData())

    const product ={
        id:Date.now(),
        name:String(req.body.name),
        quantity:Number(req.body.quantity),
        unit:String(req.body.unit),
        category:String(req.body.category)
    } 
    data.push(product)

    await saveData(data)
    
    res.json(product)
})

app.delete("/items/:id", async (req,res)=>{
    const data = JSON.parse(await getData());
    const id=Number(req.params.id)
    
    const re=data.filter(p=>p.id==id)
    const deleteId=data.filter(product=>product.id!==id)

    await saveData(deleteId)

    res.json(re)
})

app.put("/items/:id", async (req,res)=> {
    const data = JSON.parse(await getData())
    const id=Number(req.params.id)
    const index= data.findIndex(product=> { return product.id==id})

    if (index!==-1) {
        data[index]={
            ...data[index],

            ...req.body,

            id:id
        }
         if (req.body.quantity) {
            data[index].quantity = Number(req.body.quantity)
        }
    }
        await saveData(data)
        res.json({update:"success"})
})



app.listen(3000, ()=>{console.log("http://localhost:3000")})