let button = document.getElementById("submitBtn");
let userInput = document.getElementById("searchInput");
let luckyButton = document.getElementById("luckyBtn");
userInput.addEventListener('change', buttonEnable);
button.addEventListener('click', storeSearch);
luckyButton.addEventListener('click', e => {randomNavigation(e)});

function buttonEnable(){
    if (userInput.value !== ""){
        button.disabled = false; 
        luckyButton.disabled = false; 
    } else {
        button.disabled = true;
        luckyButton.disabled = true;
    }
}

function storeSearch(){
    let userInputValue = userInput.value;
    localStorage.setItem("searchInput", userInputValue);
}

function randomNavigation(e){
    e.preventDefault();
    let randInt = Math.floor(Math.random() * 10);
    let query = userInput.value.toLowerCase();
    let toNav = `resultfinal.html/?input=${query}&result=${randInt}`
    window.location.assign(toNav); 
}

