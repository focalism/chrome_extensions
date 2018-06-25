
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

chrome.mediaGalleries.onScaProgaress&&chrome.mediaGalleries.onScaProgaress.addListener(function(details){
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
        (function temp(fs){
            var info = chrome.mediaGalleries.getMediaFileSystemMetadata(fs);
            var item = document.createElement('span');
            item.className = 'item';
            item.title = info.name;
            item.onclick = function(){
                searching = true;
                showMedia(fs.root,this.title)
            }
            var iconfont = document.createElement('i')
            iconfont.className = "iconfont"
            iconfont.innerHTML = '&#xf00c5;';
            item.appendChild(iconfont)
            document.getElementById('container').appendChild(item);
            var text = document.createElement("span");
            text.className = 'text';
            text.innerHTML = info.name;
            item.appendChild(text);
        })(fileSystemArray[i])
    }
}
function listMedia(Entries){
    for(var i = 0;i<Entries.length;i++){
        if(!searching){
            break;
        }
        if(Entries[i].isFile){
            var ext = Entries[i].name.substr(Entries[i].name.lastIndexOf('.')+1).tolowerCase();
            var type = (
                imgFormats.indexOf(ext)>=0?'images':(
                    vidFormats.indexOf(ext)>=0?'video':(
                        audFormats.indexOf(ext)>=0?'music':null)))
            if(!type){
                continue;
            }
            var item = document.createElement('span')
            itme.className = 'item'
            item.title = Entries[i].name;
            item.onclick = (function(Entry){})(Entries[i])
            document.getElementById('container').appendChild(item);
            var iconfont = document.createElement('i')
            iconfont.className = 'iconfont';
            iconfont.innerHTML = (type=='images'?'&#xf0137;':(type == 'video'?'&#xf0162;':'&#xf0036;'));
            item.appendChild(iconfont);
            var text = document.createElement('span');
            text.className = 'text';
            text.innerHTML = Entries[i].name;
            item.appendChild(text);
        }
        else if(Entries[i].isDirectory){
            var dirReader = Entries[i].createReader();
            dirReader.readEntries(listMedia)
        }
    }
}

function showMedia(Entry,path){
    document.getElementById('container').innerHTML = '';
    document.getElementById('subpath').innerHTML = '<span class="name">'+path+'</span><span class="pointer">»</span>'
    var dirReader = Entry.createReader();
    dirReader.readEntries(listMedia);
}

getMedia()