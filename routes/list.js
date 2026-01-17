const express=require('express')
const router = express.Router()
const fs = require('fs/promises')
const path = require('path')


const DATA_PATH=path.join((__dirname),'..','data','list.json')

const getData = async ()=>{
    try{
           const re= await fs.readFile(DATA_PATH, 'utf-8')
           const response=re?re:'[]'
           return response
    } catch (error) {
        return '[]'
    }
}
const writeFile=async(list)=>{
    await fs.writeFile(DATA_PATH, JSON.stringify(list,null,2))
}

router.get('/',async (req,res)=>{
    
    const list= JSON.parse(await getData())
    res.json(list)
})

router.post('/', async (req,res)=> {
    let list=JSON.parse(await getData())
    let item=req.body
    item.id=Date.now()
    list.push(item)
    writeFile(list)
    
    res.json({success:true})
})
router.delete('/:id',async (req,res)=>{
    const id=Number(req.params.id)
    let data=JSON.parse(await getData())
    if (id) {
       data=data.filter(item=>item.id!=id) 
    }

    writeFile(data)
    res.json({success:true})
})



module.exports=router;