import { registration } from '../../data_scripts/getAPIInformation.js';

const email = document.getElementById('email');
const password = document.getElementById('password');
const registrationButton = document.querySelector('[type="submit"]');

registrationButton.addEventListener('click', async (event) => {
    event.preventDefault();
    let emailText = email.value;
    let passwordText = password.value;

    let userId = await registration(emailText, passwordText);
    console.log( userId );

});
