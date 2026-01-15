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


async function deleteProduct(id) {
    console.log(id)
    const response = await fetch(`/items/${id}`, {method:"DELETE"})
    console.log(await response.json())
    getData()
}

async function loadItems() {
    const category = document.querySelector('#filter').value

    const res=await fetch(`/items?category=${category}`)
    const products=await res.json()
    loadData(products)
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