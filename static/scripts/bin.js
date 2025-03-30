const table = document.querySelector('.products').tBodies[0];
const itogSum = document.querySelector('.sum');

function setBinProducts() {
    const products = JSON.parse(localStorage.getItem('bin')) || [];
    products.forEach(product => {
        const productRow = `
            <tr class="product-description">
                <td class="delete-button">x</td>
                <td class="photo"><img src="${product.img}" alt=""></td>
                <td class="product-title">${product.title}</td>
                <td class="price">${product.price} руб.</td>
                <td class="count">
                    <div class="buttons-container">
                        <button class="decrease">-</button>
                        <span>${product.count}</span>
                        <button class="increase">+</button>
                    </div>
                </td>
                <td class="itog">${product.price * product.count} руб.</td>
            </tr>`;
        console.log( product );
        table.insertAdjacentHTML('beforeend', productRow);
    });

    itogSum.textContent = `${findSum()} руб.`;

    function findSum() {
        return products.reduce((sum, product) => sum + product.price * product.count, 0);
    }
}


setBinProducts();
