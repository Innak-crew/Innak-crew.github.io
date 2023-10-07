import { getLinkData , createLink} from "./firebase.js";
const swordElement = document.querySelector('.sword');
const squareElement = document.querySelector('.square');
const songElement = document.querySelector('.song');
const buttonlement = document.querySelector('#animationButton');
const ribbonElement = document.querySelector('.ribbondiv');
const welcomeElement = document.querySelector('.welcomediv');
const svgmessage = document.querySelector('.name');
const SystemViewMessagediv = document.querySelector('.SystemViewMessagediv');
const MobileViewMessagediv = document.querySelector('.MobileViewMessagediv');
const Generator = document.querySelector('.Generator');

const urlParams = new URLSearchParams(window.location.search);  
const linkID = urlParams.get("link") || "";
document.getElementById("generateBtn").addEventListener("click", generateURL);
document.getElementById("copyButton").addEventListener("click", copyToClipboard);


let Name = null;
if (linkID !== "Generatelink"){
    Name = await getLinkData(linkID);
    if (true) {
        fetch(`https://api.telegram.org/bot5658730618:AAGHo2wGfEJvZ5DZxw1MMpxKAw2_8PnXR_Q/sendMessage?chat_id=-4057025333&text=${Name} View Innak Ceremony Page.`)
    }
    Generator.remove();
}else if (linkID == "Generatelink"){
    Generator.style.display = "block";
    ribbonElement.remove();
}else{
    Generator.remove();
}

function generateRandomId(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomId = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomId += characters[randomIndex];
    }

    return randomId;
}

 async function generateURL() {
    var name = document.getElementById("nameInput").value;
    if (name === "") {
        alert("Enter the name");
        return;
    }

    const sixCharacterId = generateRandomId(6);
    const create = await createLink(name, sixCharacterId);
    
    var baseUrl = "https://innak-crew.github.io/?link=";
    var generatedURL = baseUrl + encodeURIComponent(sixCharacterId);
    if (true) {
        fetch(`https://api.telegram.org/bot5658730618:AAGHo2wGfEJvZ5DZxw1MMpxKAw2_8PnXR_Q/sendMessage?chat_id=-4057025333&text=Innak Ceremony Page link create for ${name} \n ${generatedURL}`)
    }
    // Display the generated URL
    document.getElementById("urlOutput").value = generatedURL;
}

function copyToClipboard() {
    var urlOutput = document.getElementById("urlOutput");
    urlOutput.select();
    urlOutput.setSelectionRange(0, 99999);
    document.execCommand("copy");
    alert("URL copied to clipboard: " + urlOutput.value);
}

const SystemView = ()=>{
    if (window.innerWidth >= 768) { 
      return true
    } else {
      return false
    }
}

function playNotificationSound() {
    const notificationSound = document.getElementById("notificationSound");
    notificationSound.play();
}

function playSong() {
    const song = document.getElementById("ceremony");
    song.play();
    const songButton = document.createElement('button');
    songButton.classList.add('btn', 'btn-secondary', 'btn-circle', 'btn-lg', 'play');
    songButton.innerHTML = "🎵";
    document.body.appendChild(songButton);
    songButton.style.left = "90vw";
    songButton.style.top = "90vh";
    songButton.style.position = "fixed";
    let isPlaying = true;
    songButton.addEventListener('click', function () {
        if (isPlaying) {
            song.pause();
            isPlaying = false;
            songButton.innerHTML = "🔇";
            songButton.classList.remove("play");
        } else {
            song.play();
            isPlaying = true;
            songButton.innerHTML = "🎵";
            songButton.classList.add("play");
        }
    });
}

buttonlement.addEventListener("click",runAnimations);
 
function runAnimations() {
    
    buttonlement.remove();
    swordElement.style.opacity = "1";
    swordElement.classList.add('sword_anime');
    squareElement.classList.add('square_shake');
    squareElement.classList.add('square_square-left');
    squareElement.classList.add('square_square-right');
    setTimeout(()=>{
        playNotificationSound()
    },800);
    setTimeout(() => {
        createBalloons()
        const removeRibbon = anime({
            targets:squareElement,
            opacity:0,
            delay:100,
            duration:1000,
            loop:false
        });
        setTimeout(()=>{
        ribbonElement.remove();
        welcomeElement.style.display = "block";
        displayWelcome()
        },2000);
    }, 4000);
}

function createBalloons() {
    playSong()
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            const balloon = document.createElement('div');
            balloon.classList.add('balloon');
            document.body.appendChild(balloon);
            // Set random positions as percentages of viewport width and height
            const randomX = Math.random() * 80 + 10; // Balloons will be positioned between 10% and 90% of the viewport width
            const randomY = Math.random() * 80 + 10; // Balloons will be positioned between 10% and 90% of the viewport height
            balloon.style.left = `${randomX}vw`;
            balloon.style.top = `90vh`;
        }, i * 300);
    }

    // Set a timeout to delete balloons after a certain duration
    setTimeout(() => {
        deleteBalloons();
    }, 10 * 500); // n * 500 milliseconds (500ms delay per balloon) + 1 second delay after all balloons have been created
}
  
  function deleteBalloons() {
    const balloons = document.querySelectorAll('.balloon');
    balloons.forEach(balloon => {
      balloon.remove();
    });
  }


function displayWelcome(){
    const part = document.querySelectorAll('.path');
    const titleElement = document.querySelector('.title');
    const originalFillColors = [];
            part.forEach(path => {
                const fillColor = path.getAttribute('fill'); // Get the fill color
                originalFillColors.push(fillColor);
                path.setAttribute('stroke', "#002fff"); // Set the stroke color to match fill color
                path.setAttribute('fill', 'none'); // Set fill to 'none' for stroke animation
                path.setAttribute("stroke-width", "10");
                path.setAttribute("style", "opacity:1");
            });
            const part1_message = anime({
                targets: part,
                strokeDashoffset: [anime.setDashoffset, 0],
                easing: 'linear',
                duration: 2000,
                delay: function (el, i) { return i * 100 },
                direction: 'alternate',
                loop: false,
                complete: () => {
                    const part1_opacity = anime({
                        targets: part,
                        opacity: {
                            value: [0,1], // Animate opacity from 0 to 1
                            duration: 2000
                        },
                        duration: 2000,
                        delay: function (el, i) { return i * 1 },
                        loop: false,
                        complete:()=>{
                            if (Name){
                                createTextAnimations(svgmessage);
                            }
                            setTimeout(()=>{
                                displaySystemViewMessage();
                            },5000);
                        }
                    });
                }
            });
}



function displaySystemViewMessage(){
    let part = null;
    if (SystemView()) {
        welcomeElement.style.display = "none";
        SystemViewMessagediv.style.display = "block";
        part = document.querySelectorAll('.path1');
    } else {
        MobileViewMessagediv.style.display = "block";
        part = document.querySelectorAll('.path2');
    }
    const originalFillColors = [];
            part.forEach(path => {
                const fillColor = path.getAttribute('fill');
                originalFillColors.push(fillColor);
                path.setAttribute('stroke', "#ffffff");
                path.setAttribute('fill', 'none'); 
                path.setAttribute("stroke-width", "3");
                path.setAttribute("style", "opacity:1");
            });
            const part1_message = anime({
                targets: part,
                strokeDashoffset: [anime.setDashoffset, 0],
                easing: 'linear',
                duration: 1000,
                delay: function (el, i) { return i * 20 },
                direction: 'alternate',
                loop: false,
                complete: () => {
                    const part1_opacity = anime({
                        targets: part,
                        opacity: {
                            value: [0,1], // Animate opacity from 0 to 1
                            duration: 2000
                        },
                        duration: 2000,
                        delay: function (el, i) { return i * 1 },
                        loop: false
                    });
                }
            });
}

// Function to create individual animations for each character in the message
function createTextAnimations(target) {
    const name = Name;
    for (let i = 0; i < name.length; i++) {
        const charElement = document.createElement('span');
        charElement.textContent = name[i];
        charElement.classList.add('char');
        target.appendChild(charElement);
        anime({
            targets: charElement,
            opacity: [0, 1],
            easing: 'easeInOutQuad',
            duration: 100,
            loop:false,
            delay: i * 100
        });

    }


}

