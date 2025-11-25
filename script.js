// const menuToggle = document.querySelector(".menu-toggle");
// const navLinks = document.querySelector(".nav-links");

// menuToggle.addEventListener("click", () => {
//   navLinks.classList.toggle("active");
// });

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const links = document.querySelectorAll(".nav-links a");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// ✅ detect current page
const currentPage = decodeURIComponent(window.location.pathname.split("/").pop().toLowerCase());

links.forEach(link => {
  const href = link.getAttribute("href").toLowerCase();
  if(href === currentPage){
    link.classList.add("active");
  }
});



// banner
const carousel = document.querySelector(".carousel");
const slides = document.querySelectorAll(".slide");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const dotsContainer = document.querySelector(".dots");

let index = 0;

// create dots
slides.forEach((_, i) => {
  const dot = document.createElement("span");
  if (i === 0) dot.classList.add("active");
  dotsContainer.appendChild(dot);
});
const dots = document.querySelectorAll(".dots span");

function showSlide(i) {
  if (i >= slides.length) index = 0;
  if (i < 0) index = slides.length - 1;
  carousel.style.transform = `translateX(${-index * 100}%)`;
  dots.forEach(dot => dot.classList.remove("active"));
  dots[index].classList.add("active");
}

next.addEventListener("click", () => { index++; showSlide(index); });
prev.addEventListener("click", () => { index--; showSlide(index); });

dots.forEach((dot, i) => {
  dot.addEventListener("click", () => { index = i; showSlide(index); });
});

// auto-slide
setInterval(() => { index++; showSlide(index); }, 4000);

// Gallery js

const gallery = document.getElementById("gallery");
const cart = document.getElementById("cart");
const cartItems = document.getElementById("cart-items");
const total = document.getElementById("total");

let cartData = [];
let totalPrice = 0;

// Generate 30 Perfume Cards
for (let i = 1; i <= 30; i++) {
  let card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = `
    <img src="s${(i % 5) + 1}.jpg" alt="Perfume ${i}" onclick="openProductModal(${i}, 'Perfume ${i}', ${i * 500}, 's${(i % 5) + 1}.jpg')">
    <h4>Perfume ${i}</h4>
    <p>Price: Rs ${i * 500}</p>
    <button class="btn" onclick="addToCart(${i}, 'Perfume ${i}', ${i * 500})">Add to Cart</button>
  `;
  gallery.appendChild(card);
}

// Open Product Modal
const productModal = document.getElementById("productModal");
const modalImg = document.getElementById("modal-img");
const modalTitle = document.getElementById("modal-title");
const modalPrice = document.getElementById("modal-price");
const modalAdd = document.getElementById("modal-add");

function openProductModal(id, name, price, imgSrc) {
  modalImg.src = imgSrc;
  modalTitle.innerText = name;
  modalPrice.innerText = "Price: Rs " + price;
  modalAdd.onclick = () => addToCart(id, name, price);
  productModal.style.display = "flex";
}

function closeProductModal() {
  productModal.style.display = "none";
}

// Add to Cart
function addToCart(id, name, price) {
  cart.classList.add("active");
  cartData.push({ id, name, price });
  totalPrice += price;
  renderCart();
}

// Render Cart
function renderCart() {
  cartItems.innerHTML = "";
  cartData.forEach((item, index) => {
    cartItems.innerHTML += `
      <div class="cart-item">
        <span>${item.name} - Rs ${item.price}</span>
        <button class="btn cancel-btn" onclick="removeFromCart(${index})">X</button>
      </div>
    `;
  });
  total.innerText = totalPrice;
}

// Remove from Cart
function removeFromCart(index) {
  totalPrice -= cartData[index].price;
  cartData.splice(index, 1);
  renderCart();
}

// Cart Toggle
function toggleCart() {
  cart.classList.toggle("active");
}

function closeCart() {
  cart.classList.remove("active");
}

// Payment Modal
const paymentModal = document.getElementById("paymentModal");

function openPayment() {
  if (cartData.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  paymentModal.style.display = "flex";
}

function closePayment() {
  paymentModal.style.display = "none";
}

// Payment Submit
document.getElementById("paymentForm").addEventListener("submit", function(e) {
  e.preventDefault();
  alert("✅ Payment Successful! Thank you for your order.");
  cartData = [];
  totalPrice = 0;
  renderCart();
  closePayment();
  closeCart();
  closeProductModal();
});


