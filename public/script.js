async function getData(){
    try {
        const response = await fetch('/items');
        const items = await response.json();
        loadData(items)
        return items;

    } catch (error) {
        alert("nem sikerült betölteni az oldalt")
    }

}

async function loadData(items)
{
     const list = document.querySelector('#product-list')
     list.innerHTML="";

     items.forEach(element => {
        const li = document.createElement('li')
        li.innerHTML = `${element.name} - ${element.quantity} ${element.unit} 
        <button onclick="changeQuantity(${element.id}, ${(element.quantity)+1})">+</button>
        <button onclick="changeQuantity(${element.id}, ${(element.quantity)-1})">-</button>
        <button onclick="deleteProduct(${element.id})">Törlés</button>
        `
        list.appendChild(li)
        
     });
}
async function deleteProduct(id) {
    console.log(id)
    const response = await fetch(`/items/${id}`, {method:"DELETE"})
    console.log(await response.json())
    getData()
}

async function changeQuantity(id, quantity) {
    const q=quantity>=0?Number(quantity):0
    console.log(q)

    await fetch(`/items/${id}`, {method:"PUT",
        body:JSON.stringify({quantity:q}),
        headers:{
             "Content-Type": "application/json",
        }
    })
    getData()

}

async function saveProduct(){

    const name=document.querySelector('#name').value
    const quantity=document.querySelector('#quantity').value
    const unit=document.querySelector('#unit').value
    const category=document.querySelector('#category').value

    if (category=="none") {
       return alert("Válasz egy kategóriát!")
    }

    console.log({
        name:name,
        quantity:quantity,
        unit:unit,
        category:category
    })
    

    const response= await fetch("/items", {
        method:"POST",
        body: JSON.stringify({
        name:name,
        quantity:quantity,
        unit:unit,
        category:category
    }),
        headers:{
             "Content-Type": "application/json",
        }
    })
    console.log(await response.json())
    await loadData(await getData()) 
}
getData()