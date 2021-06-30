window.onload = function() {
    generatePage();
  };

  
let button = document.getElementById("submitBtn");
button.addEventListener('click', storeSearch);
let logo = document.getElementById("logo");
logo.addEventListener('click', toHome); 
  
function storeSearch(){
    let userInput = document.getElementById("searchInput").value
    localStorage.setItem("searchInput", userInput);
};

async function generatePage(){
    let query = localStorage.getItem("searchInput");
    try {
        let data = await fetch(`http://localhost:3000/${query}`);
        let dataJson = await data.json();
        if (dataJson.message){
            throw new Error()
        }
        createPage(dataJson);  
    } catch (error){
        getDataGoogle(query);
    }

}

function createPage(data){
    let sectionToAppend = document.getElementById("resultsSection");
    let list = document.createElement('ul');
    let query = localStorage.getItem("searchInput");
    let placeholderToChange = document.getElementById("searchInput");
    placeholderToChange.setAttribute('placeholder', query);
    for (let i=0; i<data.length; i++){
        for (let j=0; j<data[i].results.length; j++){     
            let item = document.createElement('li');
            let link = document.createElement('a');
            let linkHref = `resultfinal.html?input=${data[i].input}&result=${data[i].results[j]}`
            link.setAttribute('href', linkHref);
            link.textContent = `${data[i].input} ${data[i].results[j]}`;
            item.append(link);
            list.append(item);
        }
    }
    sectionToAppend.append(list);
}

async function getDataGoogle(input){
    try{
        let data = await fetch(`https://www.googleapis.com/customsearch/v1?key=${KEY}&cx=${CX}&q=${input}`);
        console.log(data);
        let dataJson = await data.json();
        console.log(dataJson);
        for(item of dataJson.items){
            console.log(item);
        }
    }catch(e){
        console.log(e);
    }
/* 
    let sectionToAppend = document.getElementById("resultsSection");
    let para = document.createElement('p');
    para.textContent = "This search unfortunately returned no results..."
    sectionToAppend.append(para); */
}

function toHome(){
    window.location.assign("/Client/index.html")
}

