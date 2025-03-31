const productCatalog = document.querySelector('.products-catalog');
const tune = document.querySelector('.tune');
const filters = document.querySelector('.filters');

const grid3 = document.querySelector('.products-per-row-4');
const grid4 = document.querySelector('.products-per-row-8');

async function setProducts() {
    let response = await fetch('https://koryan-store-api-andrey2211.amvera.io/api/v1/products');
    if (response.ok) {
        const products = await response.json();

        productCatalog.innerHTML = '';

        products.forEach(product => {
            let card = `<product-card id="${product.id}" signature="popular" title="${product.title}" price="${product.price}" href="product.html?id=${product.id}" src="static/images/product.png"></product-card>`;
            productCatalog.insertAdjacentHTML('beforeend', card);
        });
    }
}

grid3.addEventListener('click', () => {
    console.log( 1 );
    productCatalog.style.gridTemplateColumns = 'repeat(3, 1fr)';
    console.log( productCatalog );
});

grid4.addEventListener('click', () => {
    console.log( 1 );
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

setProducts();
