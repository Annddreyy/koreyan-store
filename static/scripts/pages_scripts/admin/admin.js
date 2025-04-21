import { getUserData } from '../../data_scripts/getAPIInformation.js';

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

form.addEventListener('submit', (event) => {
    console.log( 'submit!' );
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
