function toggling(){
    let toggle = document.querySelector('.toggle');
    let navigation = document.querySelector('.navigation');
    let main = document.querySelector('.main');
    let trnspnt = document.querySelector('.trnspnt');
    
    toggle.onclick = function(){
        navigation.classList.toggle('active');
        main.classList.toggle('active');
        trnspnt.classList.toggle('active');
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

//the following this id the function which related to the popping up the logout section 

// function logouttoggleing(btnId) {
//     let id = btnId;
//     let loginModal = document.querySelector('.login-modal');
//     id.click = function() {
//         loginModal.fadeIn().css("display", "flex");
//     }
// }