function get_selector(e){
    if(!e){
        e = window.event;
    }
    console.log(e.clientX)
    var oPoint=document.elementFromPoint(2,2); 
    console.log(oPoint)
    selector_div = document.getElementById("selector_div");
    selector_div.innerHTML = "haha";
}


document.onmousemove = get_selector;

