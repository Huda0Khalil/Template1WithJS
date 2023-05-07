let colorList = document.querySelectorAll(".colors-list li");
//check if color in localStorage is changed
if (window.localStorage.getItem("color") !== null){
    //reset page with color from localStorage
    document.documentElement.style.setProperty('--main-color',`${window.localStorage.getItem("color")}`);
    //remove active class from previous selected color
    document.querySelector(".colors-list .active").removeAttribute("class");
    //reset selected color with active class
    colorList.forEach(el => {
        if (el.getAttribute("data-color") === window.localStorage.getItem("color"))
        el.classList.toggle("active");       
    });
}
let landingPage = document.querySelector(".landing-page");
//when it is the first time opening the page from ......
if( window.localStorage.getItem("backgroundRandomIndex") === null)
    window.localStorage.setItem("backgroundRandomIndex", 0);
var statusBackground = window.localStorage.getItem("background");
if (statusBackground === null){
    window.localStorage.setItem("background", "yes");
    statusBackground = window.localStorage.getItem("background")
}
var statusNavBullets = window.localStorage.getItem("navBullets");
if( statusNavBullets === null){
    window.localStorage.setItem("navBullets", "yes");
    statusNavBullets = window.localStorage.getItem("navBullets");
}
//add active class to show nav bullets option:
document.querySelector(`.box-option .show-bullets .${statusNavBullets}`).classList.add("active");
if(window.localStorage.getItem("navBullets") === "yes"){
    document.querySelector(".nav-bullets").style = "display: block;";
}
else{
    document.querySelector(".nav-bullets").style = "display: none;";

}
//fixed header
if(window.localStorage.getItem("fixedHeader") === null){
    window.localStorage.setItem("fixedHeader", "no");
}
document.querySelector(`.fixed-header .${window.localStorage.getItem("fixedHeader")}`).classList.add("active");

//.... to here
//add class active
document.querySelector(`.${statusBackground}`).classList.add("active");
//get array of images
let arr = ["../images/img2.jpg", "../images/img3.jpg","../images/img4.jpg", "../images/img5.jpg", "../images/img6.jpg"];
var randomNumber, storeRandomNumber;
//get random number
randomNumber = Math.floor(Math.random() * arr.length);
// createBackground ;
ApplayCRB();

//switch random background
let backgroundSpans = document.querySelectorAll(".random-background span");
backgroundSpans.forEach(span => {
    span.addEventListener("click", (e)=>{
        //store option in loclastorage
        window.localStorage.setItem("background", `${e.target.className}`);
        statusBackground = e.target.className;
        handleActive(e);
        ApplayCRB();
    })
})

var RandomBackgroundYes;

//toggle spin class on icon
document.querySelector(".toggle-setting").onclick = ()=>{
    //toggle class open on main setting box
    document.querySelector(".setting-box").classList.toggle("open");
    //toggle class fa-spin on setting icon for rotation on self
    document.querySelector(".setting-icon").classList.toggle("fa-spin");
} 
//change color settings
selectedOption = document.querySelector("data-color");
colorList.forEach(element => {
    element.addEventListener("click", (e)=>{
        document.documentElement.style.setProperty('--main-color',`${element.getAttribute("data-color")}`);
        handleActive(e);
        //store selected color in localStorage  
        window.localStorage.setItem("color", `${element.getAttribute("data-color")}`);
    })
});
//progress skill:
let ourSkill = document.querySelector(".our-skill");
window.onscroll = function(){
    let skillsOffsetTop = ourSkill.offsetTop;
    let skillsOuterHeight = ourSkill.offsetHeight;

    let windowHeight = this.innerHeight;

    let winowScrollTop = this.scrollY;
    if(winowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)){
        let allSkill = document.querySelectorAll(".our-skill .skill-box span");
        allSkill.forEach(skill =>{
            skill.style.width = skill.dataset.progress;
        })
    } 
}
//get images in gallary section
let gallaryImg = document.querySelectorAll(".images-box img");
gallaryImg.forEach(img =>{
    img.addEventListener("click", (e)=>{
        let overlay = document.createElement("div");
        overlay.className = "overlay";
        let popupimgBox = document.createElement("div");
        popupimgBox.className = "popupimgBox";
        if (img.alt !== null){
            let imgHeading = document.createElement("h3");
            imgHeading.textContent = img.alt;
            let containerCopyImg = document.createElement("div");
            containerCopyImg.className = "copyImg";
            let copyImg = document.createElement("img");
            copyImg.src = e.target.src;
            containerCopyImg.appendChild(copyImg);
            overlay.appendChild( popupimgBox);
            popupimgBox.appendChild(imgHeading);
            popupimgBox.appendChild(containerCopyImg);
            let closeBox = document.createElement("span");
            closeBox.className = "closeBox";
            closeBox.innerHTML = "X";
            popupimgBox.appendChild(closeBox);
            document.body.appendChild(overlay);
            closeBox.addEventListener("click",()=>{
                popupimgBox.remove();
                overlay.remove();
            })
            

            
           

        }
    })
})
// start nav bullets
let bullets = document.querySelectorAll(".nav-bullets .bullet");
scrollToSomewhere(bullets);
//end nav bullets 
let links = document.querySelectorAll(".links li a");
scrollToSomewhere(links);
function scrollToSomewhere(elements){
    elements.forEach(ele =>{
        ele.addEventListener("click", (e)=>{
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: 'smooth'
         })
        })
})
};
//show bullets option:
let showBulletsOptions = document.querySelectorAll(".show-bullets span");
showBulletsOptions.forEach(span =>{
    span.addEventListener("click",(e)=>{
         window.localStorage.setItem("navBullets", `${e.target.dataset.bullet}`);
        if(window.localStorage.getItem("navBullets") === "yes"){
            document.querySelector(".nav-bullets").style = "display: block;";
        }
        else{
            document.querySelector(".nav-bullets").style = "display: none;";

        }
        handleActive(e);
        //console.log(e.target.className);
        
    })
})
// Fixed header

let fixedHeader = document.querySelectorAll(".fixed-header span");
fixedHeader.forEach(span =>{
    span.addEventListener("click",(e)=>{
       
            window.localStorage.setItem("fixedHeader", `${e.target.dataset.header}`);
           
                handleActive(e);
            })
            
        })
        window.addEventListener("scroll", ()=>{
            if(window.localStorage.getItem("fixedHeader") === "yes"){
                document.querySelector(".header-area").style = "position: fixed; top: 10px; left: 50%; background: #404040; transform: translateX(-50%); width: 90%;"
            }
            else{
                document.querySelector(".header-area").style = "position: relative; background: none" ;   
            }
        })
    

//reset option:
resetOption = document.querySelector(".reset-option");
resetOption.addEventListener("click", ()=>{
    window.localStorage.removeItem("color");
    window.localStorage.removeItem("backgroundRandomIndex");
    window.localStorage.removeItem("background");
    window.localStorage.removeItem("navBullets");
    window.localStorage.removeItem("fixedHeader");
    location.reload();
});

//handle  toggle menu for 991px screan:
let toggleMenu = document.querySelector(".toggle-menu");
let linksContainer = document.querySelector(".links");
toggleMenu.addEventListener("click", (e)=>{
    e.stopPropagation()

    linksContainer.classList.toggle("open");
});
linksContainer.addEventListener("click", (e)=>{
    e.stopPropagation();
})
document.addEventListener("click",(e)=>{
    if( e.target !== toggleMenu && e.target !== linksContainer ){
        if(linksContainer.classList.contains("open")){
            console.log("open");
            linksContainer.classList.toggle("open");
        }
    }
})

//handle year in footer
document.querySelector(".current-year").innerHTML = new Date().getFullYear();

//functions:
function createRandomBackground(){
    //check random number not equal the previous random number
    while(storeRandomNumber === randomNumber){
        randomNumber = Math.floor(Math.random() * arr.length);
    }
    //change background image url
    landingPage.style = `background-image: url(${arr[randomNumber]})`;
    storeRandomNumber = randomNumber;
    window.localStorage.setItem("backgroundRandomIndex", randomNumber);
}
//applay createRandomBackground
function ApplayCRB(){
    if (statusBackground === "yes"){
            RandomBackgroundYes = setInterval(createRandomBackground , 9000);
        }
        else{
            clearInterval(RandomBackgroundYes);

            landingPage.style = `background-image: url(${arr[parseInt(window.localStorage.getItem("backgroundRandomIndex"))]})`;

        }
            
    };
//handle active state
function handleActive(e){
    e.target.parentElement.querySelectorAll(".active").forEach(element =>{
        element.classList.remove("active");
    });
    //add class active to target option
    e.target.classList.toggle("active");
}
