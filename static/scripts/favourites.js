import { getFavorityCards } from './updateLocalStorage.js';

const favoriteProductsElem = document.querySelector('.favorite-products');
const tune = document.querySelector('.tune');
const filters = document.querySelector('.filters');

function setFavoriteProducts() {
    const favoriteProducts = getFavorityCards();
    favoriteProducts.forEach(product => {
        let productCard = document.createElement('product-card');

        productCard.setAttribute('id', product.id);
        productCard.setAttribute('title', product.title);
        productCard.setAttribute('src', product.img);
        productCard.setAttribute('price', product.price);
        productCard.setAttribute('have-delete', true);
        productCard.setAttribute('signature', product.signature);
        
        favoriteProductsElem.append(productCard);
    });
}

tune.addEventListener('click', () => {
    if (filters.getAttribute('open')) {
        filters.removeAttribute('open');
    } else {
        filters.setAttribute('open', true);
    }
});

function updateFavoriteProducts() {
    if (favoriteProductsElem.children.length > 1) {
        favoriteProductsElem.removeAttribute('no-products');
    } else {
        favoriteProductsElem.setAttribute('no-products', true);
    }
}

document.addEventListener('click', function(event) {
    const target = event.target.closest('.delete-button');
    if (!target) return;
    updateFavoriteProducts();
});

setFavoriteProducts();
updateFavoriteProducts();
