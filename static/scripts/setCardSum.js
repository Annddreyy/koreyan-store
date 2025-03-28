const cardSum = document.querySelector('.certificates-sum');
const certificate = document.getElementById('certificate');

console.log( certificate );

certificate.addEventListener('change', function() {
    cardSum.textContent = certificate.value;
});
