const KEY = "AIzaSyCaT_staXY_TnZHGGr987oqrgGMmVWNjDM";
const CX = "9df169a68b2afe25c";

let button = document.getElementById("submitBtn");
button.addEventListener('click', getResults);

async function getResults(e){
    e.preventDefault();
    let input = document.getElementById("searchInput").value;
    try{
        let data = await fetch(`http://localhost:3000/${input}`);
        let dataJson = await data.json();
        if(dataJson.message) throw new Error(dataJson.message);
        getDataGoogle(input);
        appendResults(dataJson);
    } catch(e){
        document.getElementById("resultsSection").innerHTML = '<p>Nothing for you :P</p>';
        console.log(e.message);
    }
    
}



function appendResults(data){
    let html= ''

    for(object of data){
        for(item of object.results){
        html += `<a href= \'resultfinal.html?input=${object.input}&result=${item}\'> ${object.input} Result content ${item} </a><br>`
        }   
    }
    

    const section = document.getElementById("resultsSection");
        
    section.innerHTML = html;
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

}