const mainImage = document.getElementById('main-image');
const miniImage = document.getElementById('mini-images');

let mainImageImg = mainImage.previousElementSibling;
const miniImages = document.querySelector('.mini-images');

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
