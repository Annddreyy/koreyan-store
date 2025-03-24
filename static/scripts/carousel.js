function block(title) {
    const carousel = document.querySelector(`.${title} > .carousel`);
    const cards = carousel.querySelectorAll('.products-items');
    const dots = carousel.querySelectorAll('.dot');

    const prev = carousel.querySelector('.button-previous');
    const next = carousel.querySelector('.button-next');

    let x = 0;

    let step = 600 + parseFloat(getComputedStyle(document.documentElement).fontSize) * 24;

    prev.addEventListener('click', function() {
        if (x + step <= 0) {
            x = x + step;
        }
        cards.forEach(card => card.style.transform = `translateX(${x}px)`);
        updateDots(x / -step);
    });

    next.addEventListener('click', function() {
        if (x - step >= -(cards.length - 1) * step) {
            x = x - step;
        }
        cards.forEach(card => card.style.transform = `translateX(${x}px)`);
        updateDots(x / -step);
    });

    function updateDots(index) {
        dots.forEach(dot => dot.removeAttribute('active'));
        console.log( dots[index] );
        dots[index].setAttribute('active', true);
    }

    updateDots(0);
}

block('new-products');
block('popular-products');
