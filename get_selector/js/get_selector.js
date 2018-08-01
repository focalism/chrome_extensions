function get_selector(e){
    if(!e){
        e = window.event;
    }

    var oPoint=document.elementFromPoint(e.clientX,e.clientY);
    var nodeName = oPoint.nodeName;

    alert(nodeName);
}


document.onmousedown = get_selector;

