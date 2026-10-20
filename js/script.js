var maiDatum = new Date();
var maiNap = document.querySelector("#nap");

const ev = maiDatum.getFullYear();
const honap = maiDatum.getMonth() + 1;
const nap = maiDatum.getDate();

var evek = maiDatum.toLocaleDateString();

maiNap.innerHTML = evek;



var tukanHang = document.getElementById('tukanHang');
var papagajHang = document.getElementById('papagajHang');
var bogomajomHang = document.getElementById('bogomajomHang');
var parducHang = document.getElementById('parducHang');


const hangLejatszo = (hang) => {
    var audio = new Audio(hang+".mp3");
    
    audio.play().catch(hiba => {
        console.error("Nem sikerült lejátszani a hangot:", hiba);
    });
}

tukanHang.addEventListener("click",()=> {
    hangLejatszo("sounds/tukanHang");
});

papagajHang.addEventListener("click",()=> {
    hangLejatszo("sounds/papagajHang")
});

bogomajomHang.addEventListener("click",()=> {
    hangLejatszo("sounds/bogomajomHang")
});

parducHang.addEventListener("click",()=> {
    hangLejatszo("sounds/parducHang")
});