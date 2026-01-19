let itemList=[];

async function sendData() {
    const name = document.querySelector('#name')
    const shop = document.querySelector('#shop')
    const quantity = document.querySelector('#quantity')
    const unit = document.querySelector('#unit')
    const forWho = document.querySelector('#forWho')
    const forWhoFilter = document.querySelector('#toWho-filter')
    const shopFilter = document.querySelector('#shop-filter')

    const item={name:name.value,
                quantity:quantity.value,
                shop:shop.value,
                unit:unit.value,
                forWho:forWho.value
            }
    const re=await fetch('/list', {
        method:'POST',
        body: JSON.stringify(item),
    headers:{"Content-Type": "Application/Json"}
    })
    const response=await re.json()
    if (response.success) {
        name.value=''
        quantity.value=1
        unit.value=''
        shopFilter.value='minden'
        forWhoFilter.value='minden'
    }else{
        alert("Hiba történt")
    }
    
    //kell az init, mert a backenden kap ID-t, így ha csak pusholom a listába nincs ID
    init()


}
async function loadData() {
    const res= await fetch('/list')
    const list= await res.json()
    itemList=list
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

async function deleteItem(id) {
        
    if (confirm("Biztosan törlöd?")) {
        console.log(itemList)
        const res=await fetch(`/list/${id}`,{
            method:'DELETE'
        })

        const re=await res.json()
        if (re.success) {
            itemList=itemList.filter(item=>item.id!=id)
            displayData(itemList)
        }
        console.log(itemList)
        
    }
    

    
}

function toWhoChanged(params) {
    if (params=="minden") {
        displayData(itemList)
    }
    else{
       displayData(itemList.filter(item=>item.forWho==params))
    }
    //TODO: mind két szűrő között legyen és kapcsolat, ne vagy-vagy
}

function shopChanged(params) {
    if (params=="minden") {
        displayData(itemList)
    }
    else{
        displayData(itemList.filter(item=>item.shop==params))
    }
    //TODO: mind két szűrő között legyen és kapcsolat, ne vagy-vagy
   
}

async function init()
{
    await loadData()
    await displayData(itemList)
}

init()