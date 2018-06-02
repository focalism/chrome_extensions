function httpRequets(url,callback){
    var xhr = new XMLHttpRequest();
    xhr.open("GET",url,true);
    console.log(xhr.responseText)
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            callback(true);
        }
    }
    xhr.onerror = function(){
        callback(false);
    }
    xhr.send();
}


function checkStatus(){
    httpRequets("https://www.google.com.hk/",function(status){
        chrome.browserAction.setIcon({path:'images/'+(status?'online.png':"offline.png")});
        setTimeout(checkStatus,3000);
    });
}

checkStatus()