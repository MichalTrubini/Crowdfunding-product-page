//OVERLAY ON/OF
let bodyHeight = document.body.offsetHeight;
let overlay = document.querySelector('.overlay-hidden');

function overlayAdd () {
    overlay.classList.add('overlay');
    overlay.style.height = bodyHeight + 'px';
}

function overlayRemove () {
    overlay.classList.remove('overlay');
    overlay.style.height = 0 + 'px';
}

//MOBILE NAVIGATION MENU ON/OFF

let hamburger = document.querySelector('.header__nav-hamburger');

hamburger.addEventListener('click',menuToggle);

function menuToggle () {

    let menu = document.querySelector('.header__nav-submenu');
    let headerNav = document.querySelector('.header__nav');

    if (menu.classList.contains('visible')) {
        menu.classList.remove('visible');
        headerNav.classList.remove('header__nav-index');
        hamburger.src="images/icon-hamburger.svg";
        overlayRemove();
    }
    else {
    menu.classList.add('visible');
    hamburger.src="images/icon-close-menu.svg";
    headerNav.classList.add('header__nav-index');
    overlayAdd();
    }
}

//BACK THIS PROJECT ON/OFF

let backProjectButton = document.querySelector('.card-introduction__btn');
let backProjectCross = document.querySelector('.project-display__cross');
let projectsElement = document.querySelector('.project-display');

backProjectButton.addEventListener('click',backProjectDisplay);
backProjectCross.addEventListener('click',backProjectHide);

function backProjectDisplay() {
    projectsElement.classList.add('visible');
    overlayAdd();
}

function backProjectHide() {
    projectsElement.classList.remove('visible');
    overlayRemove();
}