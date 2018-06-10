
//saveAs生效需要再chrome中关闭“下载前询问每个文件的保存位置”
//saveAs生效需要再chrome中关闭“下载前询问每个文件的保存位置”
//saveAs生效需要再chrome中关闭“下载前询问每个文件的保存位置”
//在应用首次被安装或者更新到新版本时，会触发onInstalled事
chrome.runtime.onInstalled.addListener(function(){
    chrome.contextMenus.create({
      'id':'saveall',
      'type':'normal',
      'title':'保存所有图片',
    });
  });
  
  chrome.contextMenus.onClicked.addListener(function(info, tab){
    if(info.menuItemId == 'saveall'){
    //chrome.tabs.executeScript方法也可以实现后台页面与内容脚本的通信，但更强调是后台页面向标签页注入脚本。
      chrome.tabs.executeScript(tab.id, {file: 'main.js'}, function(results){
          console.log(results)
        if (results && results[0] && results[0].length){
            console.log(results)
          results[0].forEach(function(url) {
              try{
                chrome.downloads.download({
                    url: url,
                    conflictAction: 'uniquify',
                    saveAs: false,
                  });
              }catch(err){
                  console.log('picture download failed')
              }
          });
        }
      });
    }
  });
  