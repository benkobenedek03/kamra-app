async function sendData() {
    console.log("küldés")
    const name = document.querySelector('#name').value
    const shop = document.querySelector('#shop').value
    const quantity = document.querySelector('#quantity').value
    const unit = document.querySelector('#unit').value
    const forWho = document.querySelector('#forWho').value

    fetch('/list', {
        method:'POST',
        body: JSON.stringify({
            name:name,
            quantity:quantity,
            shop:shop,
            unit:unit,
            forWho:forWho
        }),
    headers:{"Content-Type": "Application/Json"}
    })

}