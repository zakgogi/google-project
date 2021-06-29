window.onload = function() {
    generatePage();
  };

let button = document.getElementById("submitBtn");
button.addEventListener('click', storeSearch);
  
  
function storeSearch(){
    let userInput = document.getElementById("searchInput").value
    localStorage.setItem("searchInput", userInput);
};

async function generatePage(){
    try {
        let query = localStorage.getItem("searchInput");
        let data = await fetch(`http://localhost:3000/${query}`);
        let dataJson = await data.json();
        createPage(dataJson);  
    } catch (error){
        errorAppend();
    }

}

function createPage(data){
    let sectionToAppend = document.getElementById("resultsSection");
    let list = document.createElement('ul');
    let query = localStorage.getItem("searchInput");
    console.log(data.results);
    for (let i=0; i<data.results.length; i++){
        let item = document.createElement('li');
        let link = document.createElement('a');
        let linkHref = `resultfinal.html/?input=${query}&result=${i}`
        link.setAttribute('href', linkHref);
        link.textContent = data.results[i];
        item.append(link);
        list.append(item);
    }
    sectionToAppend.append(list);
}

function errorAppend(){
    let sectionToAppend = document.getElementById("resultsSection");
    let para = document.createElement('p');
    para.textContent = "This search unfortunately returned no results..."
    sectionToAppend.append(para);
}
