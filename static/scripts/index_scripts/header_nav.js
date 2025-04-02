import { getProducts } from '../data_scripts/getAPIInformation.js';
import { updateCounters } from '../data_scripts/updateLocalStorage.js';

const search = document.getElementById('search');
let products;

function setNavigation() {
    const productGroupsButton = document.querySelector('.product-groups .burger-button > a');
    const mainNavButton = document.querySelector('.main-nav .burger-button');
    
    const productGroupsDrop = document.querySelector('.product-groups .drop-bottom');
    const mainNavDrop = document.querySelector('.main-nav .drop');
    
    productGroupsButton.addEventListener('pointerover', () => productGroupsDrop.classList.add('hover'));
    mainNavButton.addEventListener('pointerover', () => mainNavDrop.classList.add('hover'));
    
    document.addEventListener('click', function() {
        productGroupsDrop.classList.remove('hover');
        mainNavDrop.classList.remove('hover');
    });
    
    updateCounters();
}

async function getProductsList() {
    products = await getProducts();
}

getProductsList();

document.addEventListener('submit', async function(event) {
    products.forEach(product => {
        if (product.title.toLowerCase().includes(search.value.toLowerCase())) {
            const nowLocation = `${location.protocol}//${location.host}${location.pathname}`.split('/');
            nowLocation.pop();
            const newLocation = nowLocation.join('/') + `/product.html?id=${product.id}`;
            window.location.replace(newLocation);
        }
    });
    event.preventDefault();
});

export default setNavigation;
