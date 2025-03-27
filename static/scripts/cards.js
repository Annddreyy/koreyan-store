import {
    addBinProduct,
    addFavorityProduct,
    removeFavoriteProduct
} from './updateLocalStorage.js';

class CardElement extends HTMLElement {
    constructor() {
        super();
        this.addEventListener('click', this.handleClick.bind(this));
        this.addEventListener('mouseover', this.handleMouseOver.bind(this));
        this.addEventListener('mouseout', this.handleMouseOut.bind(this));
    }

    connectedCallback() {
        const cards = JSON.parse(localStorage.getItem('favority')) || [];
        let card = cards.find(card => card.id == this.getAttribute('id'));

        this.innerHTML =  `
            <a href="product.html">
                <div class="card" data-signature="${this.getAttribute('signature')}">
                    <img src="${this.getAttribute('src')}" alt="">
                    <h3 class="card-title">${this.getAttribute('title')}</h3>
                    <span class="card-price">${this.getAttribute('price')} руб.</span>
                    <div class="card-buttons">
                        <span class="material-symbols-outlined" ${card ? 'active="true"' : ''}>favorite</span>
                        <span class="material-symbols-outlined">shopping_bag</span>
                    </div>
                </div>
            </a>
        `;
    }

    handleClick(event) {
        const target = event.target.closest('.card-buttons > span');
        if (!target) return;

        const cardObject = this.createCardObject();
        const buttonText = target.firstChild.data;
        if (buttonText == 'favorite') {
            if (target.getAttribute('active')) {
                removeFavoriteProduct( cardObject );
                event.preventDefault();
                target.removeAttribute('active');
            } else {
                addFavorityProduct( cardObject );
                target.setAttribute('active', true);
            }
            target.firstElementChild.textContent = this.setPromptText(target);
            event.preventDefault();
        } else {
            addBinProduct( cardObject );
        };

        event.preventDefault();
    }

    handleMouseOver(event) {
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
        description.textContent = this.setPromptText(target);
        target.append(description);

        description.style.left = `-${description.offsetWidth / 2 - coords.width / 2}px`;
        description.style.top = `-${description.offsetHeight + 8}px`;
    }

    handleMouseOut(event) {
        const target = event.target.closest('.card-buttons > span');
        if (!target) return;
        target.firstElementChild.remove();
    }

    createCardObject() {
        return {
            id: +this.getAttribute('id'),
            title: this.getAttribute('title'),
            price: +this.getAttribute('price'),
            img: this.getAttribute('src'),
            signature: this.getAttribute('signature'),
            count: 1
        };
    }

    setPromptText(elem) {
        return !elem.getAttribute('active') ? 'Добавить в избранное' : 'Убрать из избранного';
    }
};

customElements.define('product-card', CardElement);

