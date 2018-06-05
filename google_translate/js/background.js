chrome.contextMenus.create({
    'type':'normal',
    'title':'使用Google翻译',
    'contexts':['selection'],
    'id':'cn',
    'onclick':translate
})




function translate(info,tab){
    console.log(info.selectionText)
    if(info.selectionText.match(/[\u3400-\u9FBF]/)){
        console.log("haha")
        var url = 'https://translate.google.com.hk/#auto/en/'+info.selectionText;
    }else{
        var url = 'https://translate.google.com.hk/#auto/zh-CN/'+info.selectionText;
    }

    window.open(url,'_blank')
}


chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){
    chrome.contextMenus.update('cn',{
        'title':'使用google翻译“'+message+'”'
    })
})