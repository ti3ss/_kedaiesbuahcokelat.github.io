/* =========================
   LOADER
========================= */

/*
const darkBtn =
document.getElementById("darkModeBtn");

if(darkBtn){

darkBtn.addEventListener("click",()=>{

document.body.classList.toggle(
"dark-mode"
);

localStorage.setItem(
"darkMode",
document.body.classList.contains(
"dark-mode"
)
);

});

}

if(
localStorage.getItem("darkMode")
=== "true"
){

document.body.classList.add(
"dark-mode"
);

}
*/

/* =========================
   DATA KERANJANG
========================= */

let cart =
JSON.parse(
localStorage.getItem("cart")
) || [];

console.log("CART OK", cart);

/* =========================
   FORMAT RUPIAH
========================= */

function formatRupiah(number){

return "Rp " +
number.toLocaleString("id-ID");

}

/* =========================
   TAMBAH KE KERANJANG
========================= */

function addToCart(name, price){

const item =
cart.find(item => item.name === name);

if(item){

item.qty++;

}else{

cart.push({
name,
price,
qty:1
});

}

let sold =
JSON.parse(
localStorage.getItem("sold")
) || {};

sold[name] =
(sold[name] || 0) + 1;

localStorage.setItem(
"sold",
JSON.stringify(sold)
);

saveCart();

renderCart();

showToast(
name + " ditambahkan"
);

updateBestSeller();

}
/* =========================
   KURANGI ITEM
========================= */

function decreaseItem(index){

if(cart[index].qty > 1){

cart[index].qty--;

}else{

cart.splice(index,1);

}

saveCart();
   
renderCart();

}

/* =========================
   TAMBAH ITEM
========================= */

function increaseItem(index){

cart[index].qty++;

saveCart();

renderCart();

}

/* =========================
   HAPUS ITEM
========================= */

function removeItem(index){

cart.splice(index,1);

saveCart();
   
renderCart();

}

/* =========================
   SIMPAN LOCAL STORAGE
========================= */

function saveCart(){

localStorage.setItem(
"cart",
JSON.stringify(cart)
);

}

/* =========================
   RENDER KERANJANG
========================= */

function renderCart(){
updateCartCounter();
const cartItems =
document.getElementById(
"cartItems"
);

const totalPrice =
document.getElementById(
"totalPrice"
);

cartItems.innerHTML = "";

let total = 0;

cart.forEach((item,index)=>{

const subtotal =
item.price * item.qty;

total += subtotal;

cartItems.innerHTML += `

<div class="cart-item">

<div>

<strong>${item.name}</strong>

<br>

${formatRupiah(item.price)}

</div>

<div class="cart-controls">

<button
onclick="decreaseItem(${index})">
-
</button>

<span>
${item.qty}
</span>

<button
onclick="increaseItem(${index})">
+
</button>

</div>

<div>

${formatRupiah(subtotal)}

</div>

</div>

`;

});

totalPrice.innerText =
formatRupiah(total);

}

/* =========================
   CHECKOUT WA
========================= */

function checkoutWhatsApp(){

if(cart.length === 0){

alert(
"Keranjang masih kosong!"
);

return;

}

let pesan =
"Halo Kedai Es Buah Cokelat%0A%0A";

pesan +=
"Saya ingin memesan:%0A%0A";

let total = 0;

cart.forEach(item=>{

const subtotal =
item.price * item.qty;

total += subtotal;

pesan +=
`• ${item.name} x${item.qty} = ${formatRupiah(subtotal)}%0A`;

});

pesan +=
`%0ATotal Belanja: ${formatRupiah(total)}%0A`;

pesan +=
"%0A%0A📍 Nama Pemesan :";
pesan +=
"%0A📍 Alamat/Kostan :";
pesan +=
"%0A📍 Catatan :";

pesan +=
"%0A%0ATerima kasih 🙏";
window.open(
"https://wa.me/6281313440344?text=" + pesan,
"_blank"
);

cart = [];


saveCart();


renderCart();
   
}

/* =========================
   TOAST NOTIFIKASI
========================= */

function showToast(text){

let toast =
document.createElement("div");

toast.className =
"toast";

toast.innerText =
text;

document.body.appendChild(
toast
);

setTimeout(()=>{

toast.classList.add(
"show"
);

},100);

setTimeout(()=>{

toast.classList.remove(
"show"
);

setTimeout(()=>{

toast.remove();

},500);

},2500);

}

/* =========================
   TOAST STYLE
========================= */

const toastStyle =
document.createElement("style");

toastStyle.innerHTML = `

.toast{

position:fixed;

top:30px;
right:30px;

background:#25D366;

color:white;

padding:15px 20px;

border-radius:10px;

font-weight:600;

opacity:0;

transform:
translateY(-20px);

transition:.4s;

z-index:99999;

}

.toast.show{

opacity:1;

transform:
translateY(0);

}

.cart-item{

display:flex;

justify-content:space-between;

align-items:center;

gap:10px;

margin-bottom:15px;

padding-bottom:10px;

border-bottom:1px solid #eee;

}

.cart-controls{

display:flex;

align-items:center;

gap:8px;

}

.cart-controls button{

width:30px;
height:30px;

border:none;

border-radius:50%;

background:#8b4513;

color:white;

cursor:pointer;

font-weight:bold;

}

`;

document.head.appendChild(
toastStyle
);

/* =========================
   RENDER AWAL
========================= */

renderCart();
updateCartCounter();

// =========================
// STOK STRAWBERRY
// =========================

let stokStrawberry =
parseInt(
localStorage.getItem("stokStrawberry")
) || 4;

updateStokStrawberry();

function updateStokStrawberry(){

const stok =
document.getElementById(
"stok-strawberry"
);

const btn =
document.getElementById(
"btn-strawberry"
);

if(!stok || !btn) return;

if(stokStrawberry <= 0){

stok.innerHTML =
"Stok Habis";

stok.className =
"stock empty";

btn.disabled = true;

btn.innerHTML =
"Stok Habis";

}else if(stokStrawberry <= 5){

stok.innerHTML =
"Stok: " + stokStrawberry;

stok.className =
"stock limited";

}else{

stok.innerHTML =
"Stok: " + stokStrawberry;

stok.className =
"stock ready";

}

}

function updateCartCounter(){

const counter =
document.getElementById(
"cartCounter"
);

if(!counter) return;

let totalQty = 0;

cart.forEach(item => {

totalQty += item.qty;

});

counter.innerHTML =
"🛒 " + totalQty;

}
function filterMenu(category){

const cards =
document.querySelectorAll(".card");

cards.forEach(card=>{

if(
category === "all" ||
card.classList.contains(category)
){

card.style.display = "";

}else{

card.style.display = "none";

}

});

}
/* =========================
   SEARCH MENU REAL TIME
========================= */

const searchInput =
document.getElementById("searchInput");

if(searchInput){

searchInput.addEventListener(
"keyup",
function(){

const keyword =
this.value.toLowerCase();

const cards =
document.querySelectorAll(".card");

cards.forEach(card=>{

const text =
card.innerText.toLowerCase();

if(text.includes(keyword)){

card.style.display = "";

}else{

card.style.display = "none";

}

});

});

}

function backTop(){

window.scrollTo({

top:0,

behavior:"smooth"

});

}
function updateBestSeller(){

const sold =
JSON.parse(
localStorage.getItem("sold")
) || {};

let bestProduct = "";
let highest = 0;

for(let item in sold){

if(sold[item] > highest){

highest = sold[item];
bestProduct = item;

}

}

document
.querySelectorAll(".card")
.forEach(card=>{

const old =
card.querySelector(".bestseller");

if(old) old.remove();

const title =
card.querySelector("h3");

if(
title &&
title.innerText === bestProduct
){

card.innerHTML += `
<div class="badge bestseller">
🔥 TERLARIS
</div>
`;

}

});

}

updateBestSeller();
window.onload = function(){

setTimeout(()=>{

alert(
"🎉 Selamat Datang di Kedai Es Buah Cokelat!\n\nHari ini tersedia Es Kul-Kul, Basreng, Milo Dinosaurus dan banyak menu favorit lainnya 🍫"
);

},1500);

};
