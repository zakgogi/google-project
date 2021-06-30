window.onload = function() {
    generatePage();
  };

const KEY = "AIzaSyCaT_staXY_TnZHGGr987oqrgGMmVWNjDM";
const CX = "9df169a68b2afe25c";
  
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
            let linkLabel = document.createElement('h3');
            let lorem = document.createElement('p');
            let linkHref = `resultfinal.html?input=${data[i].input}&result=${data[i].results[j]}`
            link.setAttribute('href', linkHref);
            link.textContent = `${data[i].input} ${data[i].results[j]}`;
            linkLabel.textContent = `https://${linkHref}`;
            lorem.textContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec maximus egestas lectus dapibus fringilla. Morbi lacinia urna nec tortor convallis gravida. Ut turpis lorem, efficitur aliquam pellentesque et, placerat in justo."
            item.append(linkLabel);
            item.append(link);
            item.append(lorem);
            list.append(item);

        }
    }
    sectionToAppend.append(list);
}

async function getDataGoogle(input){
    try {
        let data = await fetch(`https://www.googleapis.com/customsearch/v1?key=${KEY}&cx=${CX}&q=${input}`);
        let list = document.createElement('ul');
        let sectionToAppend = document.getElementById("resultsSection");
        let dataJson = await data.json();
        console.log(dataJson);
        let para = document.createElement('p');
        para.id = "errorPara";
        para.textContent = ("We were unable to retrieve our own search result.. Here is Google's return:")
        for(item of dataJson.items){
            let listItem = document.createElement('li');
            let link = document.createElement('a');
            let linkLabel = document.createElement('h3');
            let labelContent = item.link.slice(0, 80);
            let snippetPara = document.createElement('p');
            link.textContent = item.title;
            linkLabel.textContent = `${labelContent}...`;
            link.setAttribute('href', item.link);
            snippetPara.textContent = item.snippet;
            listItem.append(linkLabel);
            listItem.append(link);
            listItem.append(snippetPara);
            list.append(listItem);
        }
        sectionToAppend.append(para);
        sectionToAppend.append(list);
    } catch(error) {

        let sectionToAppend = document.getElementById("resultsSection");
        let para = document.createElement('p');
        para.textContent = ("We couldn't return any results, maybe try adding a google key...");
        sectionToAppend.append(para);
    }
}

function toHome(){
    window.location.assign("/Client/index.html");
}

