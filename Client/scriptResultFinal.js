const queryString = window.location.search;
console.log(queryString);

const urlParams = new URLSearchParams(queryString);

document.getElementsByTagName('h1')[0].textContent = urlParams.get('input');
document.getElementsByTagName('h2')[0].textContent = urlParams.get('result');