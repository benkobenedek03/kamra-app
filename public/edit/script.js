function getId()
{
    const searchParam= new URLSearchParams(window.location.search)
    const id = Number(searchParam.get("id"))
    return id
}

  

async function getProductById(id)
{
    const res = await fetch(`/items/${id}`)
    const product = await res.json()

    const name = document.querySelector("#name")
    const quantity=document.querySelector("#quantity")
    const unit=document.querySelector("#unit")
    const category=document.querySelector("#category")

    name.value=product.name
    quantity.value=product.quantity
    unit.value=product.unit
    category.value=product.category
}
async function save() {
    const name = document.querySelector("#name")
    const quantity=document.querySelector("#quantity")
    const unit=document.querySelector("#unit")
    const category=document.querySelector("#category")



    await fetch(`/items/${id}`, {
        method:"PUT",
        headers:{
             "Content-Type": "application/json",
        },
        body:JSON.stringify(
            {
               name:name.value,
               quantity:quantity.value,
               unit:unit.value,
               category:category.value
            }
        )
    })

}

function goBack()
{
    window.location.href="/"
}






let id=getId()
getProductById(id)