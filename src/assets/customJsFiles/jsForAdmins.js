function toggling(){
    let toggle = document.querySelector('.toggle');
    let navigation = document.querySelector('.navigation');
    let main = document.querySelector('.main');
        toggle.onclick = function(){
        navigation.classList.toggle('active');
        main.classList.toggle('active');
    }
}

function activatingLinks() {
    let list = document.querySelectorAll('.hoveredItem');
    function activeLink() {
    list.forEach((item) => 
        item.classList.remove('hovered'));
        this.classList.add('hovered');
    }
    list.forEach((item) =>
    item.addEventListener('mouseover', activeLink));
}
