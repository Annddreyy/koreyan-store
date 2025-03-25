function block(title) {
    const carousel = document.querySelector(`.${title} > .carousel`);
    const carouselItems = carousel.querySelector('.carousel-items');
    const cards = carousel.querySelectorAll('a');
    const dotsContainer = carousel.querySelector('.dots');

    const prev = carousel.querySelector('.button-previous');
    const next = carousel.querySelector('.button-next');

    let x = 0;

    const baseFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    const emGap = parseFloat(getComputedStyle(carouselItems).gap) / baseFontSize;
    const cardWidth = parseFloat(getComputedStyle(cards[0].firstElementChild).width);
    const carouselItemsWidth = parseFloat(getComputedStyle(carouselItems).width);
    const cardsCount = Math.floor(carouselItemsWidth / cardWidth);
    const cardsWidth = cardWidth * cardsCount;
    const countOfBlocks = Math.ceil(cards.length / cardsCount);

    const step = cardsWidth + emGap * baseFontSize * cardsCount;
    const maxTranslate = -step * (countOfBlocks - 1);

    dotsContainer.innerHTML = '';
    for (let i = 0; i < countOfBlocks; i++) {
        let dot = document.createElement('div');
        dot.classList.add('dot');
        dotsContainer.insertAdjacentHTML('beforeend', '<div class="dot"></div>');
    }

    prev.addEventListener('click', function () {
        if (x + step <= 0) {
            x = x + step;
        }
        cards.forEach(card => card.style.transform = `translateX(${x}px)`);
        updateDots(x / -step);
    });

    next.addEventListener('click', function () {
        console.log( x - step, maxTranslate );
        if (x - step >= maxTranslate) {
            x = x - step;
        }
        cards.forEach(card => card.style.transform = `translateX(${x}px)`);
        updateDots(x / -step);
    });

    function updateDots(index) {
        let dots = dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot) => dot.removeAttribute('active'));
        console.log( index );
        dots[index].setAttribute('active', true);
    }

    updateDots(0);
}

block('new-products');
block('popular-products');

window.addEventListener('resize', () => {
    block('new-products');
    block('popular-products');
});
