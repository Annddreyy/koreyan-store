setInterval(() => {
    let date = new Date(); 
    document.getElementById('gif').src = 'static/images/AW305473-05.gif?v=' + date.getTime();
}, 1000);
