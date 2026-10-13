var maiDatum = new Date();
var maiNap = document.querySelector("#nap");

const ev = maiDatum.getFullYear();
const honap = maiDatum.getMonth() + 1;
const nap = maiDatum.getDate();

var evek = maiDatum.toLocaleDateString();

maiNap.innerHTML = evek;






