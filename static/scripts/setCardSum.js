const cardSum = document.querySelector('.certificates-sum');
const certificate = document.getElementById('certificate');

certificate.addEventListener('change', function() {
    cardSum.textContent = certificate.value;
});
