let button = document.getElementById("submitBtn");
button.addEventListener('click', getResults);

async function getResults(){
    // e.preventDefault();
    let input = document.getElementById("searchInput").value;
    let data = await fetch(`http://localhost:3000/${input}`);
    let dataJson = await data.json();
    console.log(dataJson);
    appendResults(dataJson);
}

function appendResults(data){
    document.getElementById("resultsSection");

}