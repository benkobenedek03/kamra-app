const express=require('express')
const router = express.Router()
const fs = require('fs/promises')
const path = require('path')


const DATA_PATH=path.join((__dirname),'..','data','list.json')

const getData = async ()=>{
    try{
           return await fs.readFile(DATA_PATH, 'utf-8')
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
    list.push(req.body)
    writeFile(list)

    res.json({status:"ok"})
})



module.exports=router;