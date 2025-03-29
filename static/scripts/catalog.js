// import { getFavorityCards } from './updateLocalStorage.js';

// const favoriteProductsElem = document.querySelector('.favorite-products');
const tune = document.querySelector('.tune');
const filters = document.querySelector('.filters');

// function setProducts() {
//     const favoriteProducts = getFavorityCards();
//     favoriteProducts.forEach(product => {
//         let productCard = document.createElement('product-card');

//         productCard.setAttribute('id', product.id);
//         productCard.setAttribute('title', product.title);
//         productCard.setAttribute('src', product.img);
//         productCard.setAttribute('price', product.price);
//         productCard.setAttribute('signature', product.signature);
        
//         favoriteProductsElem.append(productCard);
//     });
// }

tune.addEventListener('click', () => {
    if (filters.getAttribute('open')) {
        filters.removeAttribute('open');
    } else {
        filters.setAttribute('open', true);
    }
});

//setProducts();
