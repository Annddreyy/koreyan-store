import { block } from './carousel.js';

const popularProducts = document.querySelector('.popular-products .carousel-items');
const newProducts = document.querySelector('.new-products .carousel-items');

let products;

async function getProducts() {
    let response = await fetch('https://koreyan-store-api-andrey2211.amvera.io/api/v1/products');
    if (response.ok) {
        products = await response.json();
        setPopularProducts();
        setNewProducts();
    }
}

function setNewProducts() {
    newProducts.innerHTML = '';
    products.forEach(product => {
        if (product.signature == 'new_product') {
            let card = `<product-card id="${product.id}" signature="${product.signature}" title="${product.title}" price="${product.price}" href="product.html?id=${product.id}" new_price="${product['new_price']}" src="static/images/product.png"></product-card>`;
            newProducts.insertAdjacentHTML('beforeend', card);
        }
    });
    block('new-products');
}

function setPopularProducts() {
    popularProducts.innerHTML = '';
    products.forEach(product => {
        if (product.signature == 'popular') {
            let card = `<product-card id="${product.id}" signature="${product.signature}" title="${product.title}" price="${product.price}" href="product.html?id=${product.id}" new_price="${product['new_price']}" src="static/images/product.png"></product-card>`;
            popularProducts.insertAdjacentHTML('beforeend', card);
        }
    });
    block('popular-products');
}

getProducts();
