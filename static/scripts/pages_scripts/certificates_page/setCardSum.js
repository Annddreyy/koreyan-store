const cardSum = document.querySelector('.certificates-sum');
const certificate = document.getElementById('certificate');

certificate.addEventListener('change', () => cardSum.textContent = certificate.value);
