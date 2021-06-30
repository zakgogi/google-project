const queryString = window.location.search;
console.log(queryString);

const urlParams = new URLSearchParams(queryString);

document.getElementsByTagName('h1')[0].innerHTML = urlParams.get('input');
document.getElementsByTagName('h2')[0].innerHTML = urlParams.get('result');