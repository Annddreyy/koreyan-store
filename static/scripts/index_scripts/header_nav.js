import { getProducts } from '../data_scripts/getAPIInformation.js';
import { updateCounters } from '../data_scripts/updateLocalStorage.js';

const search = document.getElementById('search');
let products;

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        '(?:^|; )' + name.replace(/([\\.$?*|{}\\(\\)\\[\]\\\\/\\+^])/g, '\\$1') + '=([^;]*)'
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

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


function removeProfileIcon() {
    const profileIcon = document.querySelector('a[href="authorization.html"] > span');
    const userID = getCookie('user');
    if (userID) {
        profileIcon.style.display = 'none';
    } else {
        profileIcon.style.display = 'inline';
    }
}

removeProfileIcon();

document.addEventListener('submit', function(event) {
    if (location.pathname.endsWith('admin.html')) {
        return;
    }
    products.forEach(product => {
        if (product.title.toLowerCase().includes(search.value.toLowerCase())) {
            const nowLocation = `${location.protocol}//${location.host}${location.pathname}`.split('/');
            nowLocation.pop();
            const newLocation = nowLocation.join('/') + `/product.html?id=${product.id}`;
            location.replace(newLocation);
        }
    });
    event.preventDefault();
});

export default setNavigation;
