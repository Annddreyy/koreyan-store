class CardElement extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML =  `
            <a href="product.html">
                <div class="card" data-signature="${this.getAttribute('signature')}">
                    <img src="${this.getAttribute('src')}" alt="">
                    <h3 class="card-title">${this.getAttribute('title')}</h3>
                    <span class="card-price">${this.getAttribute('price')} руб.</span>
                    <div class="card-buttons">
                        <span class="material-symbols-outlined">favorite</span>
                        <span class="material-symbols-outlined">shopping_bag</span>
                    </div>
                </div>
            </a>
        `;
    }
};

customElements.define('product-card', CardElement);

document.addEventListener('click', function(event) {
    const target = event.target.closest('.card-buttons > span');
    const card = event.target.closest('product-card');
    if (!target) return;

    const buttonText = target.firstChild.data;
    const cardObject = createCardObject(card);
    if (buttonText === 'favorite') {
        const favoriteCards = JSON.parse(localStorage.getItem('favority')) || [];
        const findCard = favoriteCards.find(card => card.id == cardObject.id);
        if (!findCard) {
            favoriteCards.push(cardObject);
            localStorage.setItem('favority', JSON.stringify( favoriteCards ));
            updateFavoriteCount( favoriteCards.length );
        }
        console.log( favoriteCards );
    }
    event.preventDefault();
});

document.addEventListener('mouseover', function(event) {
    const target = event.target.closest('.card-buttons > span');
    if (!target) return;

    if (target.firstElementChild) return;

    const coords = {
        x: target.getBoundingClientRect().x + scrollX,
        y: target.getBoundingClientRect().y + scrollY,
        width: target.offsetWidth,
        height: target.offsetHeight
    };

    const description = document.createElement('div');
    description.classList.add('button-description');
    description.textContent = target.textContent == 'favorite' ? 'Добавить в избранное' : 'Добавить в корзину';
    target.append(description);

    description.style.left = `-${description.offsetWidth / 2 - coords.width / 2}px`;
    description.style.top = `-${description.offsetHeight + 8}px`;
});

document.addEventListener('mouseout', function(event) {
    const target = event.target.closest('.card-buttons > span');
    if (!target) return;
    target.firstElementChild.remove();
});

function createCardObject(card) {
    return {
        id: card.getAttribute('id'),
        title: card.getAttribute('title'),
        price: card.getAttribute('price'),
        img: card.getAttribute('src'),
        signature: card.getAttribute('signature'),
        count: 0
    };
}

function updateFavoriteCount(count) {
    const favoriteCount = document.querySelector('.favorite-count');
    favoriteCount.textContent = count;
    console.log( favoriteCount );
}
