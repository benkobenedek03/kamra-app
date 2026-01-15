async function getData(){
    
    try {
        console.log("asd")
        const response = await fetch('/items');
        const items = await response.json();
        console.log(items);
        loadData(items)
        return items;

    } catch (error) {
        alert("nem sikerült betölteni az oldalt")
    }

}

async function loadData(items)
{
     //const data = await getData()
     const list = document.querySelector('#product-list')
     list.innerHTML="";

     items.forEach(element => {
        const li = document.createElement('li')
        li.innerHTML=
        li.innerHTML = `${element.name} - ${element.quantity} ${element.unit}`
        list.appendChild(li)
        
     });
}

async function saveProduct()
{
    const name=document.querySelector('#n').value
    const quantity=document.querySelector('#q').value
    const unit=document.querySelector('#u').value

    console.log({
        name:name,
        quantity:quantity,
        unit:unit
    })
    

    const response= await fetch("/items", {
        method:"POST",
        body: JSON.stringify({
        name:name,
        quantity:quantity,
        unit:unit}),
        headers:{
             "Content-Type": "application/json",
        }
    })
    console.log(await response.json())
    await loadData(await getData()) 
}
getData()