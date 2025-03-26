function block(title) {
    const carousel = document.querySelector(`.${title} > .carousel`);
    const carouselItems = carousel.querySelector('.carousel-items');
    const cards = carousel.querySelectorAll('product-card');
    const dotsContainer = carousel.querySelector('.dots');

    const prev = carousel.querySelector('.button-previous');
    const next = carousel.querySelector('.button-next');

    let x = 0;

    const baseFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    const emGap = parseFloat(getComputedStyle(carouselItems).gap) / baseFontSize;
    const cardWidth = parseFloat(getComputedStyle(cards[0].firstElementChild.firstElementChild).width);
    const carouselItemsWidth = parseFloat(getComputedStyle(carouselItems).width);
    const cardsCount = Math.floor(carouselItemsWidth / cardWidth);
    const cardsWidth = cardWidth * cardsCount;
    const countOfBlocks = Math.ceil(cards.length / cardsCount);

    const step = cardsWidth + emGap * baseFontSize * cardsCount;
    let minTranslate = 0;
    const maxTranslate = -step * (countOfBlocks - 1);

    const cardsCountStart = carousel.dataset.count;
    if (!cardsCountStart || cardsCountStart != cardsCount) {
        carousel.dataset.count = cardsCount;
        cards.forEach(card => card.style.transform = `translateX(${0}px)`);
        updateDots(0);
    }

    prev.addEventListener('click', function () {
        if (x + step <= minTranslate) {
            x = x + step;
        }
        cards.forEach(card => card.style.transform = `translateX(${x}px)`);
        updateDots(x / -step);
    });

    next.addEventListener('click', function () {
        if (x - step >= maxTranslate) {
            x = x - step;
        }
        cards.forEach(card => card.style.transform = `translateX(${x}px)`);
        updateDots(x / -step);
    });

    function updateDots(index) {
        dotsContainer.innerHTML = '';
        for (let i = 0; i < countOfBlocks; i++) {
            let dot = document.createElement('div');
            dot.classList.add('dot');
            dotsContainer.insertAdjacentHTML('beforeend', '<div class="dot"></div>');
        }
        let dots = dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot) => dot.removeAttribute('active'));
        dots[index].setAttribute('active', true);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    block('new-products');
    block('popular-products');
});

window.addEventListener('resize', () => {
    block('new-products');
    block('popular-products');
});
