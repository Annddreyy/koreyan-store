import { getProducts } from '../data_scripts/getAPIInformation.js';
import { getFavorityCards } from '../data_scripts/updateLocalStorage.js';

const productCatalog = document.querySelector('.products-catalog-items');

const tune = document.querySelector('.tune');
const filters = document.querySelector('.filters');

console.log( tune );

const grid3 = document.querySelector('.products-per-row-4');
const grid4 = document.querySelector('.products-per-row-8');

const show = document.querySelector('.show');

const paginationList = document.querySelector('.pagination-list');

let paginationPrevious;
let paginationNext;

let productsPerPage;

let products;
let currentSortType;
let currentFilter;


let isCatalogPage = location.href.endsWith('catalog.html');

async function setProducts() {
    const params = new URLSearchParams(document.location.search);

    const productType = params.get('type');
    let pageNumber = +params.get('page');

    if (isCatalogPage) {
        products = await getProducts();
    } else {
        products = getFavorityCards();
    }

    productsPerPage = localStorage.getItem('products-per-page') || 24;
    setPagination();

    if (!pageNumber) {
        pageNumber = 1;
    }

    products = products.slice((pageNumber - 1) * productsPerPage, pageNumber * productsPerPage);

    show.querySelectorAll('button').forEach(button => +button.textContent == productsPerPage ? button.setAttribute('active', true) : button.removeAttribute('active'));

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
        if (isCatalogPage) {
            let card = `<product-card id="${product.id}" signature="${product.signature}" title="${product.title}" price="${product.price}" href="product.html?id=${product.id}" new_price="${product['new_price']}" src="static/images/product.png"></product-card>`;
            productCatalog.insertAdjacentHTML('beforeend', card);
        } else {
            let card = `<product-card id="${product.id}" signature="${product.signature}" title="${product.title}" price="${product.price}" href="product.html?id=${product.id}"  src="static/images/product.png" have-delete="true"></product-card>`;
            productCatalog.insertAdjacentHTML('beforeend', card);
        }
    });
}

function setPagination() {
    const pagesCount = Math.ceil(products.length / productsPerPage);

    let pagesLinks = '';
    for (let i = 1; i < pagesCount + 1; i++) {
        pagesLinks += `<li><a href="?page=${i}">${i}</a></li>`;
    }

    const newPagination = `
        <li><button id="pagination-previous">&lt;</button></li>
        ${pagesLinks}
        <li><button id="pagination-next">&gt;</button></li>
    `;

    paginationList.innerHTML = newPagination;

    paginationPrevious = document.getElementById('pagination-previous');
    paginationNext = document.getElementById('pagination-next');

    paginationPrevious.addEventListener('click', () => {
        const params = new URLSearchParams(document.location.search);
        let nowPage = params.get('page') ? +params.get('page') : 1;
        if (nowPage > 1) {
            nowPage--;
            params.set('page', nowPage.toString());
            location.search = params.toString();
        }
    });
    
    paginationNext.addEventListener('click', () => {
        const params = new URLSearchParams(document.location.search);
        let nowPage = params.get('page') ? +params.get('page') : 1;
        if (nowPage < pagesCount) {
            nowPage++;
            params.set('page', nowPage.toString());
            location.search = params.toString();
        }
    });
}

grid3.addEventListener('click', () => productCatalog.style.gridTemplateColumns = 'repeat(3, 1fr)');

grid4.addEventListener('click', () => productCatalog.style.gridTemplateColumns = 'repeat(4, 1fr)');

show.addEventListener('click', function(event) {
    const target = event.target.closest('button');
    if (!target) return;

    show.querySelectorAll('button').forEach(button => button.removeAttribute('active'));
    target.setAttribute('active', true);
    localStorage.setItem('products-per-page', +target.textContent);

    const params = new URLSearchParams();
    params.set('page', '1');
    location.search = params.toString();

    setProducts();
});

tune.addEventListener('click', () => {
    console.log( filters.getAttribute('open') );
    if (filters.getAttribute('open')) {
        filters.removeAttribute('open');
    } else {
        filters.setAttribute('open', 'true');
    }
    console.log( 'ok' );
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

setProducts('all1');
