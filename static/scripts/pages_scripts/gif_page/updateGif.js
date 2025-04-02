setInterval(() => {
    let date = new Date(); 
    document.getElementById('gif').src = 'static/images/cat-gif.gif?v=' + date.getTime();
}, 1000);
