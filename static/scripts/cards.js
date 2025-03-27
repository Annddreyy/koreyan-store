import {
    addBinProduct,
    addFavorityProduct,
    removeFavoriteProduct
} from './updateLocalStorage.js';

class CardElement extends HTMLElement {
    constructor() {
        super();
        this.addEventListener('click', this.handleClick.bind(this));
        this.addEventListener('pointerover', this.handlePointerOver.bind(this));
        this.addEventListener('pointerout', this.handlePointerOut.bind(this));
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
        const target = event.target.closest('.material-symbols-outlined');
        if (!target) return;

        const cardObject = this.createCardObject();
        const buttonText = target.firstChild.data;

        if (buttonText == 'favorite') {
            if (target.getAttribute('active')) {
                removeFavoriteProduct( cardObject );
                target.removeAttribute('active');
                event.preventDefault();
            } else {
                addFavorityProduct( cardObject );
                target.setAttribute('active', true);
                event.preventDefault();
            }
            target.firstElementChild.textContent = this.setPromptText(target);
        } else {
            addBinProduct( cardObject );
        };

        event.preventDefault();
    }

    handlePointerOver(event) {
        this.querySelector('.card').classList.add('hover');
        const target = event.target.closest('.material-symbols-outlined');
        if (!target) return;

        target.classList.add('hover');

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

    handlePointerOut(event) {
        const target = event.target.closest('.material-symbols-outlined');
        if (!target) {
            this.querySelector('.card').classList.remove('hover');
        };
        
        target.classList.remove('hover');
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
        if (elem.firstChild.data == 'favorite') {
            return !elem.getAttribute('active') ? 'Добавить в избранное' : 'Убрать из избранного';
        }
        return 'Добавить в корзину';
    }
};

customElements.define('product-card', CardElement);
