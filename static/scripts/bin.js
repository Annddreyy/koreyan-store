import { removeBinProduct, addBinProduct, descreaseBinProduct } from './updateLocalStorage.js';

const form = document.querySelector('.form');
const binProducts = document.querySelector('.bin-products');
const table = document.querySelector('.products').tBodies[0];
const itogSum = document.querySelector('.sum');

function setBinProducts() {
    const products = JSON.parse(localStorage.getItem('bin'));
    if (!products.length) {
        binProducts.setAttribute('no-products', true);
        form.style.display = 'none';
        return;
    }

    binProducts.removeAttribute('no-products');
    products.forEach(product => {
        const productRow = `
            <tr class="product-description" id="${product.id}">
                <td><button class="delete-button">x</button></td>
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
        table.insertAdjacentHTML('beforeend', productRow);
    });

    itogSum.textContent = `${findSum()} руб.`;

    function findSum() {
        return products.reduce((sum, product) => sum + product.price * product.count, 0);
    }
};

table.addEventListener('click', function(event) {
    const deleteButton = event.target.closest('.delete-button');
    const increaseButton = event.target.closest('.increase');
    const deceaseButton = event.target.closest('.decrease');

    const productDescription = event.target.closest('.product-description');

    if (deleteButton) {
        deleteProduct(productDescription);
    } else if (increaseButton) {
        increaseProduct(productDescription);
    } else if (deceaseButton) {
        decreaseProduct(productDescription);
    }

});

function deleteProduct(productDescription) {
    const productObj = createProductObject(productDescription);
    productDescription.remove();
    removeBinProduct(productObj);
    setBinProducts();
}

function increaseProduct(productDescription) {
    const productObj = createProductObject(productDescription);
    const count = productDescription.querySelector('.buttons-container > span');
    const sum = productDescription.querySelector('.itog');
    count.textContent = productObj.count + 1; 
    sum.textContent = `${(productObj.count + 1) * productObj.price} руб.`;
    addBinProduct(productObj);
}

function decreaseProduct(productDescription) {
    const productObj = createProductObject(productDescription);
    const count = productDescription.querySelector('.buttons-container > span');
    const sum = productDescription.querySelector('.itog');
    if (productObj.count > 1) {
        count.textContent = productObj.count - 1; 
        sum.textContent = `${(productObj.count - 1) * productObj.price} руб.`;
        descreaseBinProduct(productObj);
    }
}

function createProductObject(elem) {
    return { 
        id: +elem.id,
        price: parseFloat(elem.querySelector('.price').textContent),
        count: +elem.querySelector('.buttons-container > span').textContent
    };
}

setBinProducts();
