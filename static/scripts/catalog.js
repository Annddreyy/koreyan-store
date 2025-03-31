const productCatalog = document.querySelector('.products-catalog');
const tune = document.querySelector('.tune');
const filters = document.querySelector('.filters');

async function setProducts() {
    let response = await fetch('https://koryan-store-api-andrey2211.amvera.io/api/v1/products');
    if (response.ok) {
        const products = await response.json();

        productCatalog.innerHTML = '';

        products.forEach(product => {
            let card = `<product-card id="${product.id}" signature="popular" title="${product.title}" price="${product.price}" src="static/images/product.png"></product-card>`;
            productCatalog.insertAdjacentHTML('beforeend', card);
        });
    }
}

tune.addEventListener('click', () => {
    if (filters.getAttribute('open')) {
        filters.removeAttribute('open');
    } else {
        filters.setAttribute('open', true);
    }
});

setProducts();
