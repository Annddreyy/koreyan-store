const imgContainer = document.querySelector('.img-container');
const image = imgContainer.querySelector('img');
const closeButton = imgContainer.querySelector('button');
const reviews = document.querySelector('.reviews');

reviews.addEventListener('click', function(event) {
    const target = event.target.closest('.image');
    if (!target) return;

    imgContainer.setAttribute('open', true);
    image.setAttribute('src', target.src);

    document.documentElement.style.overflow = 'hidden';
});

closeButton.addEventListener('click', () => {
    imgContainer.removeAttribute('open');
    image.removeAttribute('src');

    document.documentElement.style.overflow = 'auto';
});
