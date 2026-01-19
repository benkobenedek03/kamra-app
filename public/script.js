let itemsList=[];

async function getData(){
    try {
        const response = await fetch('/items');
        const items = await response.json();

        itemsList=items

    } catch (error) {
        alert("nem sikerült betölteni az oldalt")
    }
}



function loadData(items) {
    const list = document.querySelector('#product-list');
    list.innerHTML = "";

    if (items.length === 0) {
        list.innerHTML = `<div class="text-center text-muted w-100 mt-4">
            <i class="fas fa-basket-shopping fa-3x mb-3"></i><br>
            Üres a kamra!
        </div>`;
        return;
    }

    items.forEach(element => {
        const catClass = `cat-${element.category}`;
        
        // Ellenőrizzük, hogy elfogyott-e
        const isMissing = element.quantity === 0;
        
        // Ha elfogyott, hozzáadjuk a 'card-missing' osztályt
        const missingClass = isMissing ? 'card-missing' : '';
        const minusBtnClass = isMissing ? 'btn-minus' : ''; // CSS-hez kell

        const cardDiv = document.createElement('div');
        cardDiv.className = 'col';
        
        cardDiv.innerHTML = `
            <div class="card card-custom h-100 ${missingClass}">
                <div class="card-body d-flex justify-content-between align-items-center">
                    
                    <div>
                        <h5 class="card-title mb-1 fw-bold text-dark">${element.name}</h5>
                        <span class="badge badge-category ${catClass}">
                            ${element.category}
                        </span>
                        ${isMissing ? '<span class="badge bg-danger ms-1">ELFOGYOTT</span>' : ''}
                    </div>

                    <div class="d-flex align-items-center gap-2">
                        
                        <button class="btn btn-outline-secondary btn-circle btn-sm ${minusBtnClass}" 
                                onclick="changeQuantity(${element.id}, ${element.quantity - 1})">
                            <i class="fas fa-minus"></i>
                        </button>

                        <div class="text-center">
                            <div class="quantity-display">${element.quantity}</div>
                            <small class="text-muted d-block" style="font-size:0.7em">${element.unit}</small>
                        </div>

                        <button class="btn btn-outline-primary btn-circle btn-sm" 
                                onclick="changeQuantity(${element.id}, ${element.quantity + 1})">
                            <i class="fas fa-plus"></i>
                        </button>
                        
                        <button class="btn btn-light text-danger btn-sm ms-2" 
                                onclick="deleteProduct(${element.id})" 
                                title="Törlés">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                        
                        <a href="edit/edit.html?id=${element.id}" class="btn btn-light text-primary btn-sm ms-1" title="Szerkesztés">
                            <i class="fas fa-edit"></i>
                        </a>
                    </div>
                </div>
            </div>
        `;
        list.appendChild(cardDiv);
    });
}

async function searchItem() {

    
    const search = String(document.querySelector('#search').value.toLowerCase())
    loadData(itemsList.filter(item=> item.name.toLowerCase().includes(search)))
    
    
}

async function deleteProduct(id) {
    
    if(confirm("Biztos törlöd?"))
    {
        const response = await fetch(`/items/${id}`, {method:"DELETE"})
        console.log(await response.json())
        
        itemsList=itemsList.filter(item=>item.id!=id)
        loadData(itemsList)
    }
   
}

async function filterItems(param) {
    if (param=="mind") {
        loadData(itemsList)
        return
    }
    if(param=="MISSING")
    {
        loadData(itemsList.filter(item=>item.quantity==0))
        return
    }
    loadData(itemsList.filter(item=>item.category==param))

    
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
    const updatedItemId=itemsList.findIndex(item=>item.id==id)
    itemsList[updatedItemId].quantity=quantity
    loadData(itemsList)


}

async function saveProduct(){

    const name=document.querySelector('#name')
    const quantity=document.querySelector('#quantity')
    const unit=document.querySelector('#unit')
    const category=document.querySelector('#category')

    
    

    const response= await fetch("/items", {
        method:"POST",
        body: JSON.stringify({
        name:name.value,
        quantity:quantity.value,
        unit:unit.value,
        category:category.value
    }),
        headers:{
             "Content-Type": "application/json",
        }
    })
    console.log(await response.json())
    await init()
    name.value=""
    quantity.value=1
    unit.value=""
}
async function init(params) {
    await getData()
    loadData(itemsList)
}
init()