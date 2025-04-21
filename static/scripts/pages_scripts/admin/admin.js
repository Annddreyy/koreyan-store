import { addProduct, getUserData } from '../../data_scripts/getAPIInformation.js';

const mainImage = document.getElementById('main-image');
const miniImage = document.getElementById('mini-images');

let mainImageImg = mainImage.previousElementSibling;
const miniImages = document.querySelector('.mini-images');

const form = document.querySelector('.form form');
console.log( form );

mainImage.addEventListener('change', () => {
    mainImageImg.remove();

    mainImageImg = document.createElement('img');
    mainImage.before(mainImageImg);

    let file = mainImage.files[0];
    let blob = new Blob([file], { type: file.type });
    let reader = new FileReader();
    reader.readAsDataURL(blob);

    reader.onload = function() {
        mainImageImg.setAttribute('src', reader.result);
    };

    reader.onerror = function() {
        console.log(reader.error);
    };
});

miniImage.addEventListener('change', () => {
    miniImages.innerHTML = '';
    for (let file of miniImage.files) {
        let blob = new Blob([file], { type: file.type });

        let reader = new FileReader();
        let img = document.createElement('img');
        reader.readAsDataURL(blob);

        reader.onload = function() {
            img.setAttribute('src', reader.result);
        };
        reader.onerror = function() {
            console.log(reader.error);
        };

        miniImages.append(img);
    }
});

form.addEventListener('submit', function(event) {
    let title = this.querySelector('#title').value;
    let shortDescription = this.querySelector('#short-description').value;
    let year = this.querySelector('#year').value;
    let producer = this.querySelector('#producer').value;
    let description = this.querySelector('#description').value;
    let price = this.querySelector('#price').value;
    let amount = this.querySelector('#amount').value;
    let mainImage = this.querySelector('#main-image').files[0];

    const reader = new FileReader();
    reader.readAsDataURL(mainImage);

    reader.onloadend = function() {
        const fileContent = reader.result.split(',')[1];
        console.log( fileContent );
        mainImage = fileContent;
        addProduct(title, shortDescription, year, description, price, amount, producer, mainImage);
    };
    
    event.preventDefault();
});


function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        '(?:^|; )' + name.replace(/([\\.$?*|{}\\(\\)\\[\]\\\\/\\+^])/g, '\\$1') + '=([^;]*)'
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

async function checkUser() {
    let response = await getUserData(getCookie('user'));
    let isAdmin = response['is_admin'];

    if (!isAdmin) {
        location.href = '/';
    }
};

checkUser();
