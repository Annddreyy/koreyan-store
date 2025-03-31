const mainImage = document.querySelector('.main-image');
const image = document.querySelector('.main-image > img');
const miniImages = document.querySelector('.mini-images');

let miniImageElem;

miniImages.addEventListener('click', function(event) {
    const target = event.target.closest('.mini-images > img');
    if (!target) return;
    image.src = target.src;
});

image.addEventListener('mouseenter', () => {
    if (miniImageElem) miniImageElem.remove();
    const miniImageContainer = `
    <div class="mini-image-container">
        <div class="mini-image"></div>
    </div>`;

    mainImage.insertAdjacentHTML('beforeend', miniImageContainer);
    miniImageElem = mainImage.querySelector('.mini-image-container');
    miniImageElem.querySelector('.mini-image').style.backgroundImage = `url(${image.src})`;
});

image.addEventListener('mousemove', function(event) {
    const coords = {
        x: event.clientX - image.getBoundingClientRect().x,
        y: event.clientY - image.getBoundingClientRect().y,
        width: this.offsetWidth,
        height: this.offsetHeight
    };

    miniImageElem.style.left = `${coords.x + 28}px`;
    miniImageElem.style.top = `${coords.y}px`;
    
    const xPercent = coords.x / image.clientWidth * 100;
    const yPercent = coords.y / image.clientHeight * 100;

    miniImageElem.querySelector('.mini-image').style.backgroundPosition = `${xPercent}% ${yPercent}%`;
});

mainImage.addEventListener('mouseleave', () => {
    mainImage.querySelector('.mini-image-container').remove();
    miniImageElem = undefined;
});

async function setInformation () {
    const params = new URLSearchParams(document.location.search);
    const id = params.get('id');
    const response = await fetch(`https://koreyan-store-api-andrey2211.amvera.io/api/v1/products/${id}`);
    if (response.ok) {
        const product = await response.json();

        const title = document.querySelector('.title');
        const shortDescription = document.querySelector('.short-description');
        const year = document.querySelector('.year');
        const producer = document.querySelector('.producer');
        const description = document.querySelector('.description');

        title.childNodes[1].textContent = product['title'];
        shortDescription.childNodes[2].textContent = product['short_description'];
        year.childNodes[1].textContent = product['year'];
        producer.childNodes[1].textContent = product['producer'];
        description.childNodes[2].textContent = product['description'];
    }
}

setInformation();
