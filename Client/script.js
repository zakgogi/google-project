let button = document.getElementById("submitBtn");
button.addEventListener('click', getResults);

async function getResults(e){
    e.preventDefault();
    let input = document.getElementById("searchInput").value;
    let data = await fetch(`http://localhost:3000/${input}`);
    let dataJson = await data.json();
    console.log(dataJson);
    appendResults(dataJson);
}

function appendResults(data){
    let html= ''
    if (data instanceof Array){
        for(object of data){
            for(item of object.results){
            html += `<a href= \'resultspage.html?input=${object.input}&result=${item}\'> ${object.input} Result content ${item} </a><br>`
            }   
        }
    }
    else {
        for(item of data.results){
            html += `<a href= \'resultspage.html?input=${data.input}&result=${item}\'> ${data.input} Result content ${item} </a><br>`
        }
    }
    const section = document.getElementById("resultsSection");
        
    section.innerHTML = html;
}