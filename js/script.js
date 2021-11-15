//MOBILE NAVIGATION MENU ON/OFF

let hamburger = document.querySelector('.header__nav-hamburger');

hamburger.addEventListener('click',menuToggle);

function menuToggle () {

    let nav = document.querySelector('.header__nav');
    let menu = document.querySelector('.header__nav-submenu');
    let overlay = document.querySelector('.overlay-hidden');

    if (menu.classList.contains('visible')) {
        menu.classList.remove('visible');
        overlay.classList.remove('overlay');
        hamburger.src="images/icon-hamburger.svg";
    }
    else {
    menu.classList.add('visible');
    overlay.classList.add('overlay');
    hamburger.src="images/icon-close-menu.svg";
    }
}