import { getProducts } from './getAPIInformation.js';

const productCatalog = document.querySelector('.products-catalog');
const tune = document.querySelector('.tune');
const filters = document.querySelector('.filters');

const grid3 = document.querySelector('.products-per-row-4');
const grid4 = document.querySelector('.products-per-row-8');

let products;
let currentSortType;
let currentFilter;

async function setProducts() {
    const params = new URLSearchParams(document.location.search);
    const productType = params.get('type');
    products = await getProducts();
    if (productType) {
        if (productType == 'special') {
            products = products.filter(() => Math.random() > 0.5);
        } else {
            products = products.filter(product => product['product_type'] == productType || product.signature == productType);
        }
    }
    updateProducts([-Infinity, +Infinity], (a, b) => a.id - b.id);
}

function updateProducts([start, end], sort) {
    const productsList = products
        .filter(product => product.price >= start && product.price < end)
        .sort(sort);

    productCatalog.innerHTML = '';
    productsList.forEach(product => {
        let card = `<product-card id="${product.id}" signature="${product.signature}" title="${product.title}" price="${product.price}" href="product.html?id=${product.id}" new_price="${product['new_price']}" src="static/images/product.png"></product-card>`;
        productCatalog.insertAdjacentHTML('beforeend', card);
    });
}

grid3.addEventListener('click', () => {
    productCatalog.style.gridTemplateColumns = 'repeat(3, 1fr)';
    console.log( productCatalog );
});

grid4.addEventListener('click', () => {
    productCatalog.style.gridTemplateColumns = 'repeat(4, 1fr)';
    console.log( productCatalog );
});

tune.addEventListener('click', () => {
    if (filters.getAttribute('open')) {
        filters.removeAttribute('open');
    } else {
        filters.setAttribute('open', true);
    }
});

filters.addEventListener('click', function(event) {
    const filterByPrice = event.target.closest('.filter-by-price');
    const sortBy = event.target.closest('.sort-by');

    if (filterByPrice) {
        const priceAll = event.target.closest('.price-all');
        const priceSmall = event.target.closest('.price-small');
        const priceMedium = event.target.closest('.price-medium');
        const priceLarge = event.target.closest('.price-large');
        const priceBig = event.target.closest('.price-big');

        const buttons = filterByPrice.querySelectorAll('button');
        buttons.forEach(button => button.removeAttribute('active'));
        const activeElem = priceAll || priceSmall || priceMedium || priceLarge || priceBig;

        if (priceSmall) {
            currentFilter = [0, 1000];
        } else if (priceMedium) {
            currentFilter = [1000, 2500];
        } else if (priceLarge) {
            currentFilter = [2500, 5000];
        } else if (priceBig) {
            currentFilter = [5000, +Infinity];
        } else if (priceAll) {
            currentFilter = [-Infinity, +Infinity];
        }

        activeElem.setAttribute('active', true);
        updateProducts(currentFilter, currentSortType);

    } else if (sortBy) {
        const sortDefault = event.target.closest('.default');
        const sortNew = event.target.closest('.new');
        const sortPriceUpper = event.target.closest('.price-upper');
        const sortPriceDown = event.target.closest('.price-down');

        const buttons = sortBy.querySelectorAll('button');
        buttons.forEach(button => button.removeAttribute('active'));

        const activeElem = sortDefault || sortNew || sortPriceUpper || sortPriceDown;

        if (sortDefault) {
            currentSortType = (a, b) => a.id - b.id;
        } else if (sortNew) {
            currentSortType = (a, b) => a.year - b.year;
        } else if (sortPriceUpper) {
            currentSortType = (a, b) => a.price - b.price;
        } else if (sortPriceDown) {
            currentSortType = (a, b) => b.price - a.price;
        }

        activeElem.setAttribute('active', true);
        updateProducts(currentFilter, currentSortType);
    }
});

setProducts();
