import { updateCounters } from './updateLocalStorage.js';

const burger_button1 = document.querySelector('.product-groups .burger-button');
const burger_button2 = document.querySelector('.main-nav .burger-button');

const drop1 = document.querySelector('.product-groups .drop-bottom');
const drop2 = document.querySelector('.main-nav .drop');

burger_button1.addEventListener('pointerover', () => drop1.classList.add('hover'));
burger_button2.addEventListener('pointerover', () => drop2.classList.add('hover'));

document.addEventListener('click', function() {
    drop1.classList.remove('hover');
    drop2.classList.remove('hover');
});

updateCounters();
