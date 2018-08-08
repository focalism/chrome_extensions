function combo(arr, num) {
    let  result = [];
    let  range = function(r, _arr) {
      if (r.length == num) {
        result.push(r);
      } else {
        let  l = r.length;
        for (let  i = 0, len = _arr.length - num + l; i <= len; i++) {
          range(r.concat(_arr[i]), _arr.slice(i + 1));
        }
      }
    }
    range([], arr);
    return result;
  }

function ifUnique(cssSelector){
    let selector = document.querySelectorAll(cssSelector);
    if(selector.length==1){
        return true;
    }else{
        return false;
    }
}

function getAttributesFormat(attributeList){
    let attrNameValueList = [];
    for(let  attr of attributeList){
        attrNameValueList.push(`[${attr.name}="${attr.value}"]`);
    }
    return attrNameValueList;
}

function getSelectorByNodeName(nodeName){
    if(ifUnique(nodeName)){
        return [true, nodeName];
    }else{
        return [false, nodeName];
    }
}

function getSelectorById(idName){
    let selectorName = '#' + idName;
    if(ifUnique(selectorName)){
        return [true,selectorName];
    }else{
        return [false, selectorName]
    }
}

function getSelectorByClass(nodeName, className){
    let classList = className.split(' ');
    let classSlectorList = []
    if(classList.length > 0){
        for(let i=1;i<=classList.length;i++){
            let classPartList = combo(classList, i);
            for(let  item of classPartList){
                let selectorName = nodeName + '.' + item.join('.');
                classSlectorList.push(selectorName)
                if(ifUnique(selectorName)){
                    return  [true, classSlectorList];
                }
            }
        }
    }
    return [false, classSlectorList]
}

function getSelectorByAttrName(nodeName, nameAttr){
    let cssSelector =  nodeName + `[name="${nameAttr}"]`
    if(document.getElementsByName(nameAttr)){
        return [true, cssSelector];
    }else{
        return [false, cssSelector]
    }
}

function getSelectorByAttr(nodeName, attrNameValueList){
    let attrSlectorList = []
    for(let j = 1;j<=attrNameValueList.length;j++){
        let attributePartList = combo(attrNameValueList, j);
        for(let  item of attributePartList){
            let selectorName = nodeName + item.join('');
            attrSlectorList.push(selectorName)
            if(ifUnique(selectorName)){
                return [true, attrSlectorList];
            }
        }
    }
    return [false, attrSlectorList]
}

let allSelectorDict = {}
let parentId = 0
function getSelector(el, parent =false){
    let selectorList = []
    let attributes = el.attributes;
    let attrNameValueList = getAttributesFormat(attributes);
    let nodeName = el.nodeName.toLowerCase();
    let result  = getSelectorByNodeName(nodeName);
    let status = result[0]
    let cssSelector;
    selectorList.push(result[1])
    if(attributes.length > 0){
        if(!status && attributes.id){
            let result = getSelectorById(attributes.id.value);
            status = result[0]
            selectorList.push(result[1])
        }
        if(!status && attributes.name){
            result = getSelectorByAttrName(nodeName, attributes.name.value);
            status = result[0]
            selectorList.push(result[1])
        }
        if(!status && attributes.class){
            result= getSelectorByClass(nodeName, attributes.class.value);
            status = result[0]
            selectorList = selectorList.concat(result[1])
        }
        if(!status){
            result =  getSelectorByAttr(nodeName, attrNameValueList);
            status = result[0]
            selectorList = selectorList.concat(result[1])
        }
    }
    if(!parent){
        allSelectorDict["self"] = selectorList
    }else{
        allSelectorDict[`parent${parentId}`] = selectorList
    }

    console.log(parentId, status)
    if(!status){
        parentId += 1
        let parentNode = el.parentNode;
        console.log(parentNode)
        getSelector(parentNode, parent=parentId);
    }

    let selfSelectorList =  allSelectorDict['self']
    cssSelector = selfSelectorList[selfSelectorList.length-1]
    if(ifUnique(cssSelector)){
        return cssSelector
    }


    let nodeLength = Object.keys(allSelectorDict).length;
    let uniqueParentSelectorList = allSelectorDict[`parent${nodeLength-1}`]
    let uniqueParentSelector = uniqueParentSelectorList[uniqueParentSelectorList.length - 1]
    for(selector of selfSelectorList){
        cssSelector = uniqueParentSelector + ' ' + selector
        if(ifUnique(cssSelector)){
            return cssSelector
        }
    }

    
    }

function get_selector(){
    allSelectorDict = {}
    parentId = 0
    let  e = event || window.event;
    let  elementFromPoint = document.elementFromPoint(e.clientX, e.clientY);
    let selector = getSelector(elementFromPoint);
    if(selector){
        alert(selector);
    }else{
        alert('cant not find the selector');
    }   
}

document.addEventListener("mousedown", get_selector);
document.removeEventListener("mouseup", get_selector);

