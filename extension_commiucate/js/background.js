chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){
    if(message == "hello"){
        sendResponse("Hello from background")
    }
})

