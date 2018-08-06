
function combo(arr, num) {
    var result = [];
    var range = function(r, _arr) {
      if (r.length == num) {
        result.push(r);
      } else {
        var l = r.length;
        for (var i = 0, len = _arr.length - num + l; i <= len; i++) {
          range(r.concat(_arr[i]), _arr.slice(i + 1));
        }
      }
    }
    range([], arr);
    return result;
  }

function ifUnique(cssSelector){
    selector = document.querySelectorAll(cssSelector);
    if(selector.length==1){
        return true;
    }else{
        return false;
    }
}

function getAttributesFormat(attributeList){
    attrNameValueList = [];
    for(var attr of attributeList){
        attrNameValueList.push(`[${attr.name}="${attr.value}"]`)
    }
    return attrNameValueList;
}

function getSelectorByNodeName(nodeName){
    if(ifUnique(nodeName)){
        return nodeName;
    }

}
function getSelectorById(idName){
    selectorName = '#' + idName;
    if(ifUnique(selectorName)){
        return selectorName;
    }
}

function getSelectorByClass(nodeName, className){
    classList = className.split(' ');
    if(classList.length > 0){
        for(i=1;i<=classList.length;i++){
            classPartList = combo(classList, i);
            for(var item of classPartList){
                selectorName = nodeName + '.' + item.join('.');
                if(ifUnique(selectorName)){
                    return  selectorName;
                }
            }
        }
    }
}

function getSelectorByAttrName(nodeName, nameAttr){
    if(document.getElementsByName(nameAttr)){
        return nodeName + `[name="${nameAttr}"]`;
    }
}

function getSelectorByAttr(nodeName, attrNameValueList){
    console.log(attrNameValueList);
    for(var j = 1;j<=attributes.length;j++){
        attributePartList = combo(attrNameValueList, j);
        console.log(attributePartList);
        for(var item of attributePartList){
            selectorName = nodeName + item.join('');
            if(ifUnique(selectorName)){
                return selectorName;
            }
        }

    }
}

function getSelector(el){
    attributes = el.attributes;
    attrNameValueList = getAttributesFormat(attributes);
    var nodeName = el.nodeName.toLowerCase();
    var cssSelector  = getSelectorByNodeName(nodeName);
    if(attributes.length > 0){
        if(!cssSelector && attributes.id){
            cssSelector = getSelectorById(attributes.id.value);
        }
        if(!cssSelector && attributes.class){
            cssSelector = getSelectorByClass(nodeName, attributes.class.value);
        }
        if(!cssSelector && attributes.name){
            cssSelector = getSelectorByAttrName(nodeName, attributes.name.value);
        }
        if(!cssSelector){
            cssSelector =  getSelectorByAttr(nodeName, attrNameValueList);
        }
    }
    if(!cssSelector){
        parentNode = el.parentNode;
        console.log(parentNode.nodeName);
        console.log(parentNode.attributes);
        cssSelector = getSelector(parentNode);
    }
    return cssSelector;
}

function get_selector(){
    var e = event || window.event;
    var elementFromPoint = document.elementFromPoint(e.clientX, e.clientY);
    cssSelector = getSelector(elementFromPoint)
    if(cssSelector){
        alert(cssSelector);
    }else{
        alert('cant not find the selector');
    }   
}

document.addEventListener("mousedown", get_selector);
document.removeEventListener("mouseup", get_selector);

