import { getUsersData } from '../../data_scripts/getAPIInformation.js';

const loginElem = document.querySelector('[name="email"]');
const passwordElem = document.querySelector('[name="password"]');
const enterButton = document.querySelector('input[type="submit"]');
const form = document.querySelector('form');


const getSHA256Hash = async (input) => {
    const textAsBuffer = new TextEncoder().encode(input);
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', textAsBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hash = hashArray
        .map((item) => item.toString(16).padStart(2, '0'))
        .join('');
    return hash;
};

enterButton.addEventListener('click', async (event) => {
    const login = loginElem.value;
    const password = passwordElem.value;
    
    const passwordScript = await getSHA256Hash(password);

    const users = await getUsersData();

    let flag = false;
    for (let user of users) {
        if (user.password === passwordScript && user.login === login) {
            document.cookie = `user=${user.id};max-age:60`;
            flag = true;
            if (!user.is_admin) {
                document.location.href = 'index.html';
            } else {
                document.location.href = 'admin.html';
            }
        }
    }

    if (!flag) {
        alert('Неверный логин или пароль!');
    }

    event.preventDefault();
});

form.addEventListener('submit', (event) => event.preventDefault());
