let favoriteCards = JSON.parse(localStorage.getItem('favority')) || [];
const favoriteCount = document.querySelector('.favorite-count');

let binCards = JSON.parse(localStorage.getItem('bin')) || [];
const binCount = document.querySelector('.bin-count');

const sumElem = document.querySelector('.total-price');

export function addFavorityProduct(cardObject) {
    const findCard = favoriteCards.find(card => card.id == cardObject.id);
    if (!findCard) {
        favoriteCards.push(cardObject);
        localStorage.setItem('favority', JSON.stringify( favoriteCards ));
        updateCounter( favoriteCount, countOfProducts(favoriteCards) );
    }
}

export function addBinProduct(cardObject) {
    const findCard = binCards.find(card => card.id == cardObject.id);
    if (findCard) {
        findCard.count++;
    } else {
        binCards.push(cardObject);
    }
    localStorage.setItem('bin', JSON.stringify( binCards ));
    updateCounter( binCount, countOfProducts(binCards) );
}


export function removeFavoriteProduct(cardObject) {
    favoriteCards = getFavorityCards();
    const findCard = favoriteCards.find(card => card.id == cardObject.id);
    if (!findCard) return;
    favoriteCards = favoriteCards.filter(card => card != findCard);
    localStorage.setItem('favority', JSON.stringify( favoriteCards ));
    updateCounter( favoriteCount, countOfProducts(favoriteCards) );
}

export function removeBinProduct(cardObject) {
    const findCard = binCards.find(card => card.id == cardObject.id);
    if (!findCard) return;
    binCards = binCards.filter(card => card != findCard);
    localStorage.setItem('bin', JSON.stringify( binCards ));
    updateCounter( favoriteCards, countOfProducts(binCards) );
    updateSum();
}

function updateCounter(elem, newCount) {
    elem.textContent = newCount;
    if (elem == binCount) {
        updateSum();
    }
}

function updateSum() {
    sumElem.textContent = `${binCards.reduce((sum, card) => sum + card.price * card.count, 0)} руб.`;
}

function countOfProducts(list) {
    return list.reduce((sum, card) => sum + card.count, 0);
}

export function getFavorityCards() {
    return JSON.parse(localStorage.getItem('favority')) || [];
}

export function updateCounters() {
    updateCounter( favoriteCount, countOfProducts(favoriteCards) );
    updateCounter( binCount, countOfProducts(binCards) );
}

