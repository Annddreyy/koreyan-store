import { updateCounters } from './updateLocalStorage.js';

function setNavigation() {
    const burger_button1 = document.querySelector('.product-groups .burger-button > a');
    const burger_button2 = document.querySelector('.main-nav .burger-button');
    
    const drop1 = document.querySelector('.product-groups .drop-bottom');
    const drop2 = document.querySelector('.main-nav .drop');
    
    burger_button1.addEventListener('pointerover', () => drop1.classList.add('hover'));
    burger_button2.addEventListener('pointerover', () => drop2.classList.add('hover'));
    
    document.addEventListener('click', function() {
        drop1.classList.remove('hover');
        drop2.classList.remove('hover');
    });
    
    updateCounters();
}

export default setNavigation;

const search = document.getElementById('search');

let products;
document.addEventListener('submit', function(event) {
    products.forEach(product => {
        if (product.title.toLowerCase().includes(search.value.toLowerCase())) {
            console.log( product );
        }
    });
    event.preventDefault();
});

async function getProducts() {
    const response = await fetch('https://koreyan-store-api-andrey2211.amvera.io/api/v1/products');
    if (response.ok) {
        products = await response.json();
    }
}

getProducts();
