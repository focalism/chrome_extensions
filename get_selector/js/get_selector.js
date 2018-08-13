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
        if(attr.value.length>20){
            continue;
        }
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
    className  = className.replace(/^\s+|\s+$/g,"");
    let classList = className.split(/\s+/);
    for(let i = 0;i<classList.length; i++){
        classList[i] = classList[i].replace(/\n[\s| | ]*\r/g,'\n')
    }
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

function getChildIndexOfParent(el){
    let parentNode = el.parentNode;
    childNodes = parentNode.childNodes;
    for(let i = 0; i < childNodes.length;i++){
        if(childNodes[i] == el){
            return i+1;
        }
    }
}

function getChildNodeCount(el){
    let  count = 0;
    let parentNode = el.parentNode;
    let nodeName = el.nodeName;
    let childNodes = parentNode.childNodes;
    for(let i = 0; i < childNodes.length;i++){
        if(childNodes[i].nodeName == nodeName){
            count = count +1
        }
    }
    return count;
}

let allSelectorDict = {index:[]}
let parentId = 0
function getSelector(el, parent =false){
    let selectorList = [];
    let index = getChildIndexOfParent(el)
    let count = getChildNodeCount(el)
    allSelectorDict['index'].push({'index':index, 'count': count});
    let attributes = el.attributes;
    let attrNameValueList = getAttributesFormat(attributes);
    let nodeName = el.nodeName.toLowerCase();
    let result  = getSelectorByNodeName(nodeName);
    let status = result[0];
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
        allSelectorDict["parent0"] = selectorList
    }else{
        allSelectorDict[`parent${parentId}`] = selectorList
    }

    if(!status){
        parentId += 1
        let parentNode = el.parentNode;
        getSelector(parentNode, parent=parentId);
    }

    let selfSelectorList =  allSelectorDict['parent0']
    cssSelector = selfSelectorList[selfSelectorList.length-1]
    if(ifUnique(cssSelector)){
        return cssSelector
    }


    let nodeLength = Object.keys(allSelectorDict).length-1;
    let uniqueParentSelectorList = allSelectorDict[`parent${nodeLength-1}`]
    let uniqueParentSelector = uniqueParentSelectorList[uniqueParentSelectorList.length - 1]
    for(selector of selfSelectorList){
        cssSelector = uniqueParentSelector + ' ' + selector
        if(ifUnique(cssSelector)){
            return cssSelector
        }
    }

    let indexList = allSelectorDict.index;
    nodeChain = ''
    for(let i = 0;i< indexList.length-1;i++){
        childNodeList = allSelectorDict[`parent${i}`]
        parentNodeList = allSelectorDict[`parent${i+1}`]
        if(indexList[i].count>1){
            childNodeName = childNodeList[0]+`:nth-child(${indexList[i].index})` 
        }
        else{
            childNodeName = childNodeList[0]
        }
        parentNodeName = parentNodeList[parentNodeList.length - 1]
        nodeChain = childNodeName + ' ' + nodeChain
        cssSelector = parentNodeName + ' ' + nodeChain
        if(ifUnique(cssSelector)){
            return cssSelector
        }
}
}

function get_selector(){
    allSelectorDict = {index:[]}
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
