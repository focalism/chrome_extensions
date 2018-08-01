

function selector(id, name, className,nodeName, nodeType,parentNode){
    this.id = id;
    this.name = name;
    this.className = className;
    this.nodeName = nodeName;
    this.nodeType = nodeType;
    this.parentNode = parentNode
}
function get_selector(){
    var e = event || window.event;
    var elementFromPoint = document.elementFromPoint(e.clientX, e.clientY);
    // var id = elementFromPoint.id;
    var className = elementFromPoint.className;
    var nodeName = elementFromPoint.nodeName;
    if(className){
        alert(nodeName+className);
    }else{
        alert(nodeName+'haha');
    }
}


document.addEventListener("mousedown", get_selector);
document.removeEventListener("mouseup", get_selector);

