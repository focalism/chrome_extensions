var city = localStorage.city;
city = city?city:'beijing';
document.getElementById('city').value = city;
document.getElementById('save').onclick = function(){
    console.log(document.getElementById('city').value)
    localStorage.city = document.getElementById('city').value;
    alert('保存成功。');
}