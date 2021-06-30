let button = document.getElementById("submitBtn");
let userInput = document.getElementById("searchInput");
let luckyButton = document.getElementById("luckyBtn");
userInput.addEventListener('input', buttonEnable);
button.addEventListener('click', storeSearch);
luckyButton.addEventListener('click', e => {getFirstResult(e)});

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

async function getFirstResult(e){
    e.preventDefault();
    let userInputValue = userInput.value;
    let data = await fetch(`http://localhost:3000/${userInputValue}`)
    let dataJson = await data.json();
    firstPageNavigation(dataJson);
}

function firstPageNavigation(data){
    let toNav = `resultfinal.html?input=${data[0].input}&result=${data[0].results[0]}`
    window.location.assign(toNav);
}

