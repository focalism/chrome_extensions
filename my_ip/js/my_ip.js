function httpRequest(url,callback){
    var xhr = new XMLHttpRequest();
    xhr.open("GET",url,true);
    xhr.onreadystatechange = function(){if(xhr.readyState == 4){
        var  p = /<code>(\d+.\d+.\d+.\d+)<\/code>/g;
        var ip = p.exec(xhr.responseText)[1];
        p = /<code>([\u4e00-\u9fa5]+.*)<\/code>/g;
        var address = p.exec(xhr.responseText)[1]

        callback(ip,address);
    }}
    xhr.send();
}


httpRequest("https://www.ip.cn/",function(ip,address){
    document.getElementById("ip_div").innerText = ip+'\n'+address;
})

// document.getElementById("ip_div").innerText = "10.1.240.163";