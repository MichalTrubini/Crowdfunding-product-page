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

//COMMA DELIMITER FOR NUMBER

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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

//PLEDGE ROLL ON/OFF

let radioButton = document.querySelectorAll('.pledge-money');
let pledgeHeading = document.querySelectorAll('.card-about__subcard-heading');

pledgeHeading.forEach(pledgeSelect);
radioButton.forEach(pledgeSelect);

function pledgeSelect(item){

    let dataAtrribute = item.getAttribute('data-select');
    let pledgeThis = document.querySelector(`.pledge-active[data-select='${dataAtrribute}']`);

    if (!pledgeThis) return;

    item.addEventListener('click',pledgeRoll);

    function pledgeRoll(){
        let pledgePrevious = document.querySelector('.visible-pledge');
        if (pledgePrevious) pledgePrevious.classList.remove('visible-pledge');
        pledgeThis.classList.add('visible-pledge');

    }
}

let pledgeNoMoney = document.querySelectorAll('.pledge-no-money');

pledgeNoMoney.forEach(pledgeHideAll);

function pledgeHideAll (item){

    item.addEventListener('click',function(){
            let pledgePrevious = document.querySelector('.visible-pledge');
            if (pledgePrevious) pledgePrevious.classList.remove('visible-pledge');
    })
}

//LOCAL STORAGE INITIAL SET

const backedAmount = 89914;
const backers = 5007;

localStorage.setItem('total_backed',backedAmount);
localStorage.setItem('total_backers',backers);

const backedUi = document.getElementById('backed');
const backersUi = document.getElementById('backers');

backedUi.innerText = '$' + numberWithCommas(localStorage.getItem('total_backed'));
backersUi.innerText = numberWithCommas(localStorage.getItem('total_backers'));

//LOCAL STORAGE UPDATED BY USER
//PROGRESS BAR WIDTH UPDATE

let inputButton = document.querySelectorAll('.card-about__subcard-btn-small');

inputButton.forEach(buttonSubmit);

function buttonSubmit(item){


    item.addEventListener('click',checkInput);
    item.addEventListener('click',storageUpdate);
    item.addEventListener('click',progressBar);
    item.addEventListener('click',projectHide);
    item.addEventListener('click',pledgeClose);
    item.addEventListener('click',showThankYou);

    function checkInput() {
        let dataAtrribute = item.getAttribute('data-input');
        let inputThis = document.querySelector(`.card-about__user-input[data-input='${dataAtrribute}']`);
        let inputThisMinAttribute = parseInt(inputThis.getAttribute('min'));
        let inputThisValue = parseInt(inputThis.value);
        let highlightSubtitle = document.querySelector(`.card-about__subcard-subtitle[data-input='${dataAtrribute}']`);

        if (!inputThisValue || inputThisValue < inputThisMinAttribute) {
            highlightSubtitle.classList.add('error-min-no-met');
        }
        else {
            highlightSubtitle.classList.remove('error-min-no-met');
        };

        return !inputThisValue || inputThisValue < inputThisMinAttribute;
    }

    function storageUpdate() {

        if (checkInput() === true) return;

        //SET LOCAL STORAGE

        let dataAtrribute = item.getAttribute('data-input');
        let inputThis = document.querySelector(`.card-about__user-input[data-input='${dataAtrribute}']`);
        let inputThisValue = parseInt(inputThis.value);

        localStorage.setItem('total_backed',parseInt(localStorage.getItem('total_backed'))+inputThisValue);
        localStorage.setItem('total_backers',parseInt(localStorage.getItem('total_backers'))+1);

        //UPDATE THE CLIENT

        backedUi.innerText = '$' + numberWithCommas(localStorage.getItem('total_backed'));
        backersUi.innerText = numberWithCommas(localStorage.getItem('total_backers'));
    }

    function pledgeClose(){
        let pledge = document.querySelector('.visible-pledge');
        if (pledge) pledge.classList.remove('visible-pledge');
    }

    function projectHide() {
        if (checkInput() === true) return;
        backProjectHide();
    }

    function progressBar() {
        const progressBar = document.querySelector('.stats__progress-bar-current');
        const currentBacked = parseInt(localStorage.getItem('total_backed'));
        const backedTarget = 100000;
        const currentBackedPercent = Math.round((currentBacked / backedTarget) *100) + '%';

        progressBar.style.width = currentBackedPercent;
    }

    //THANK YOU MESSAGE ON

    function showThankYou() {

        if (checkInput() === true) return;

        let thankYouMessage = document.querySelector('.response');

        thankYouMessage.classList.add('visible');
        overlayAdd();
    }

}

//THANK YOU MESSAGE OFF

let thankYouButton = document.querySelector('.response button')

thankYouButton.addEventListener('click',hideThankYou);

function hideThankYou() {

    let thankYouMessage = document.querySelector('.response');

    thankYouMessage.classList.remove('visible');
    overlayRemove();
}