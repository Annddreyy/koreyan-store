let favoriteCards = getFavorityCards();
const favoriteCount = document.querySelector('.favorite-count');

let binCards = getBinCards();
const binCount = document.querySelector('.bin-count');

const sumElem = document.querySelector('.total-price');

export function addFavorityProduct(cardObject) {
    const findCard = favoriteCards.find(card => card.id == cardObject.id);
    if (!findCard) {
        favoriteCards.push(cardObject);
        localStorage.setItem('favority', JSON.stringify(favoriteCards));
        updateCounter(favoriteCount, countOfProducts(favoriteCards));
    }
}

export function addBinProduct(cardObject) {
    const findCard = binCards.find(card => card.id == cardObject.id);
    if (findCard) {
        findCard.count++;
    } else {
        binCards.push(cardObject);
    }
    localStorage.setItem('bin', JSON.stringify(binCards));
    updateCounter(binCount, countOfProducts(binCards));
}

export function descreaseBinProduct(cardObject) {
    const findCard = binCards.find(card => card.id == cardObject.id);
    if (!findCard) return;
    findCard.count--;
    updateBin(binCards);
}

export function removeFavoriteProduct(cardObject) {
    favoriteCards = getFavorityCards();
    const findCard = favoriteCards.find(card => card.id == cardObject.id);
    if (!findCard) return;
    favoriteCards = favoriteCards.filter(card => card != findCard);
    localStorage.setItem('favority', JSON.stringify( favoriteCards));
    updateCounter(favoriteCount, countOfProducts(favoriteCards));
}

export function removeBinProduct(cardObject) {
    const findCard = binCards.find(card => card.id == cardObject.id);
    if (!findCard) return;
    binCards = binCards.filter(card => card != findCard);
    updateBin(binCards);
}

export function getFavorityCards() {
    return JSON.parse(localStorage.getItem('favority')) || [];
}

export function getBinCards() {
    return JSON.parse(localStorage.getItem('bin')) || [];
}

export function updateCounters() {
    updateCounter( favoriteCount, countOfProducts(favoriteCards) );
    updateCounter( binCount, countOfProducts(binCards) );
}

export function updateSum(list) {
    return `${list.reduce((sum, card) => sum + card.price * card.count, 0)} руб.`;
}

function updateCounter(elem, newCount) {
    elem.textContent = newCount;
    if (elem == binCount) {
        sumElem.textContent = updateSum(binCards);
    }
}


function countOfProducts(list) {
    return list.reduce((sum, card) => sum + card.count, 0);
}

function updateBin(binCards) {
    localStorage.setItem('bin', JSON.stringify(binCards));
    updateCounter(binCount, countOfProducts(binCards) );
    updateSum();
}
