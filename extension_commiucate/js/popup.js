chrome.runtime.sendMessage('hello',function(response){
    document.write(response)
})