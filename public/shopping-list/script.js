async function sendData() {
    const name = document.querySelector('#name')
    const shop = document.querySelector('#shop')
    const quantity = document.querySelector('#quantity')
    const unit = document.querySelector('#unit')
    const forWho = document.querySelector('#forWho')

    const re=await fetch('/list', {
        method:'POST',
        body: JSON.stringify({
            name:name.value,
            quantity:quantity.value,
            shop:shop.value,
            unit:unit.value,
            forWho:forWho.value
        }),
    headers:{"Content-Type": "Application/Json"}
    })
    const response=await re.json()
    if (response.success) {
        name.value=''
        shop.value=''
        quantity.value=1
        unit.value=''
    }else{
        alert("Hiba történt")
    }


}
async function loadData() {
    const res= await fetch('/list')
    const list= await res.json()
    console.log(list)
    displayData(list)
    return list
}
function displayData(list) {
    const shoppingList = document.querySelector('#shopping-list');
    shoppingList.innerHTML = '';

    list.forEach((item) => {
        const col = document.createElement('li');
        col.className = 'col-12 col-sm-6 col-lg-4 col-xl-3 list-unstyled';

        col.innerHTML = `
            <div class="card h-100 shadow-sm position-relative">
                
                <button
                    class="btn btn-sm btn-danger position-absolute top-0 end-0 m-2"
                    onclick="deleteItem(${item.id})"
                    title="Törlés">
                    ✕
                </button>

                <div class="card-body">
                    <h5 class="card-title mb-1">${item.name}</h5>

                    <p class="card-text text-muted mb-2">
                        ${item.shop}
                    </p>

                    <div>
                        <span class="badge bg-primary me-1">
                            ${item.quantity} ${item.unit}
                        </span>
                        <span class="badge bg-secondary">
                            ${item.forWho}
                        </span>
                    </div>
                </div>
            </div>
        `;

        shoppingList.appendChild(col);
    });
}

function deleteItem(id) {
    //todo
}



loadData()