let button = document.getElementById("submitBtn");
button.addEventListener('click', getResults);

async function getResults(e){
    e.preventDefault();
    let input = document.getElementById("searchInput").value;
    try{
        let data = await fetch(`http://localhost:3000/${input}`);
        let dataJson = await data.json();
        console.log(dataJson);
        appendResults(dataJson);
    } catch(e){
        document.getElementById("resultsSection").innerHTML = '<p>Nothing for you :P</p>';
        console.log(e.message);
    }
    
}

function appendResults(data){
    let html= ''
    if (data.length){
        for(object of data){
            for(item of object.results){
            html += `<a href= \'resultspage.html?input=${object.input}&result=${item}\'> ${object.input} Result content ${item} </a><br>`
            }   
        }
    }
    else {
        
    }
    const section = document.getElementById("resultsSection");
        
    section.innerHTML = html;
}