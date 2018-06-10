[].map.call(document.querySelectorAll('img'),function(img){
    console.log(img)
    return img.src
});