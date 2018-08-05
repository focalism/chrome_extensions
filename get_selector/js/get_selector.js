
function combo(arr, num) {
    var result = [];
    var range = function(r, _arr) {
      if (r.length == num) {
        result.push(r)
      } else {
        let l = r.length;
        for (var i = 0, len = _arr.length - num + l; i <= len; i++) {
          range(r.concat(_arr[i]), _arr.slice(i + 1))
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

function getSelector(){
    this.id = id;
    this.name = name;
    this.className = className;
    this.nodeName = nodeName;
    this.nodeType = nodeType;
    this.parentNode = parentNode;
}

function getAttributesFormat(attributeList){
    attrNameValueList = [];
    for(var attr of attributeList){
        attrNameValueList.push(`[${attr.name}="${attr.value}"]`)
    }
    return attrNameValueList;
}


function get_selector(){
    var e = event || window.event;
    var elementFromPoint = document.elementFromPoint(e.clientX, e.clientY);
    attributes = elementFromPoint.attributes;
    attrNameValueList = getAttributesFormat(attributes);
    console.log(attributes)
    var nodeName = elementFromPoint.nodeName.toLowerCase();
    console.log(nodeName)
    console.log(attributes.id)
    var cssSelector;
    if(attributes.length > 0){
        for(var attr of attributes){
            if (attr.name === 'id'){
                selectorName = '#' + attr.value;
                console.log(selectorName)
                if(ifUnique(selectorName)){
                    cssSelector = selectorName;
                    break;
                }
            }

            else if(attr.name === 'class'){
                classList = attr.value.split(' ');
                if(classList.length > 0){
                    for(i=1;i<classList.length;i++){
                        classPartList = combo(classList, i);
                        console.log(classPartList);
                        for(var item of classPartList){
                            console.log(item)
                            selectorName = nodeName + '.' + item.join('.');
                            if(ifUnique(selectorName)){
                                cssSelector = selectorName;
                                break;
                            }
                        }
    
                    }
                }
            }
            else if(attr.name == 'name'){
                if(document.getElementsByName(attr.value)){
                    cssSelector = attr.value;
                    break;
                }
            }

            else{
                selectorName = nodeName + `[${attr.name}="${attr.value}"]`
                if(ifUnique(selectorName)){
                    cssSelector = selectorName;
                }
            }

        }
    }

    if(cssSelector){
        alert(cssSelector);
    }
    else{
        for(var j = 2;j<attributes.length;j++){
            attributePartList = combo(attrNameValueList, j)
            selectorName = nodeName + attributePartList.join('')
            if(ifUnique(selectorName)){
                cssSelector = selectorName;
            }
        }
        if(cssSelector){
            alert(cssSelector)
        }else{
            alert('cant not find the selector');
        }
    }


}


document.addEventListener("mousedown", get_selector);
document.removeEventListener("mouseup", get_selector);

