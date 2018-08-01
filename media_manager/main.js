
var imgFormats = ['png','bmp','jpeg','jpg','gif','png','svg','xbm','webp'];
var audFormats = ['wav','mp3'];
var vidFormats = ['3gp','3gpp','avi','flv','mov','mpeg','mpeg4','mp4','ogg','webm','wmv'];
var searching = false;
var scanning = false;

document.getElementById('edit').onclick = function(){
    document.getElementById('container').innerHTML = ''
    chrome.media|Galleries.getMediaFileSystems({
        interactive:'yes'
    },listMediaGalleries)
}


document.getElementById('scan').onclick = function(){
    scanning?
    chrome.mediaGalleries.startMediaScan&&chrome.mediaGalleries.startMediaScan():
    chrome.mediaGalleries.cancelMediaScan&&chrome.mediaGalleries.cancelMediaScan();
}

document.getElementById('error').onclick = function(){
    this.style.display = 'none'
}


document.getElementById('home').onclick = function(){
    search = false;
    document.getElementById('subpath').innerHTML = ''
    getMedia()
}

chrome.mediaGalleries.onScanProgaress&&chrome.mediaGalleries.onScaProgaress.addListener(function(details){
    switch(details.type){
        case 'start':
            scanning = true;
            document.getElementById('loading').style.display = 'block';
        case 'cancle':
            scanning = false;
            document.getElementById('loading').style.display = 'none';
            break;
        case 'finish':
            scanning = false;
            document.getElementById('loading').style.display = 'none'
            break;
        case 'error':
            scanning = false;
            document.getElementById('loading').style.display = 'none';
            document.getElementById('error').style.display = 'block'
            break;
    }

})


function getMedia(){
    chrome.mediaGalleries.getMediaFileSystems({
        interactive:'if_needed'
    },listMediaGalleries);
}

function listMediaGalleries(fileSystemArray){
    document.getElementById('container').innerHTML = ''
    for(var i = 0; i<fileSystemArray.length;i++){
        var info = chrome.mediaGalleries.getMediaFileSystemMetadata(fileSystemArray[i]);
        var item = document.createElement('span');
        item.className = 'item';
        item.title = info.name;
        var iconfont = document.createElement('i')
        iconfont.className = "iconfont"
        iconfont.innerHTML = '&#xf00c5;';
        item.appendChild(iconfont)
        document.getElementById('container').appendChild(item);
        var text = document.createElement("span");
        text.className = 'text';
        text.innerHTML = info.name;
        item.appendChild(text);
    }
}


function listMedia()

getMedia()