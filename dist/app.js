const minusButton = document.querySelector("#decrCart");
const addButton = document.querySelector("#incrCart");
const addToCart = document.querySelector("#addToCart");
const items = document.querySelector("#items");

addToCart.addEventListener("click", function () {
  const value = parseInt(items.textContent);
  if (value === 0) return;
  document.querySelector("#items-length").textContent = value;

  document.querySelector("#items-length").classList.add(...["w-5", "h-5"]);
});

window.addEventListener("load", () => displayCartContents());

function displayCartContents() {
  document.querySelector("#info").innerHTML =
    "<p class='text-center w-full h-full mx-auto'>Your cart is empty</p>";
}

//Decrement the number of items in the cart
minusButton.addEventListener("click", function () {
  const value = parseInt(items.textContent);
  if (value > 1) {
    items.textContent = value - 1;
  }
  if (value < 1) {
    document
      .querySelector("#items-length")
      .classList.remove(...["w-5 ", "h-5"]);
  }
});

//Increment the number of items in your cart
addButton.addEventListener("click", function () {
  const value = parseInt(items.textContent);
  items.textContent = value + 1;
});

const coverImg = document.querySelector("#cover");
const previews = document.querySelectorAll("#previews img");

//The image array
const srcs = [
  "../images/image-product-1.jpg",
  "../images/image-product-2.jpg",
  "../images/image-product-3.jpg",
  "../images/image-product-4.jpg",
];

//Closes the modal
const closeButton = document.querySelector("#closeBtn");
closeButton.addEventListener("click", function () {
  document.querySelector("#modal").classList.remove("flex");
  document.querySelector("#modal").classList.add("hidden");
});

//Opens the modal on image click
coverImg.addEventListener("click", function () {
  //for small screens
  if (window.innerWidth < 767) return;
  document.querySelector("#modal").classList.remove("hidden");
  document.querySelector("#modal").classList.add("flex");
});

//Displays the image on click... and adds the opacity to show the current image
function viewImage(event, value) {
  let src = srcs[--value] ?? srcs[0];
  //Remove the active class
  previews.forEach((preview) => {
    preview.classList.remove(...["border-primary", "opacity-30"]);
  });
  event.classList.add(...["border-primary", "opacity-30"]);
  coverImg.src = src;
}

// Modal
//Buttons for traversing the image array
const prevImg = document.querySelector("#prevImg");
const nextImg = document.querySelector("#nextImg");

//This keeps track of the current image on the modal
let currentImg = 0;
//The button displays the prev image in the array.
prevImg.addEventListener("click", function () {
  if (currentImg !== 0) {
    --currentImg;
    document.querySelector("#modal-cover").src = srcs[currentImg];
  } else {
    currentImg = 3;
    document.querySelector("#modal-cover").src = srcs[srcs.length - 1];
  }
});

//The button on the modal which displays the next img in the array, if it hits the last one, it shows the first one in the array.
nextImg.addEventListener("click", function () {
  if (currentImg !== srcs.length - 1) {
    ++currentImg;
    document.querySelector("#modal-cover").src = srcs[currentImg];
  } else {
    currentImg = 0;
    document.querySelector("#modal-cover").src = srcs[0];
  }
});

//When you click the cart on the navigation, it closes or opens the cart with the items selected
const toggle = document.querySelector("#toggle-cart");

toggle.addEventListener("click", function () {
  const value = parseInt(items.textContent);
  const cart = document.querySelector("#cart");
  cart.classList.toggle("hidden");
  const cartInfo = document.querySelector("#info");
  cartInfo.innerHTML =
    value > 0
      ? `<div class='text-gray-400 flex flex-row'><img
      src="../images/image-product-1-thumbnail.jpg"
      class="w-12 rounded-xl"
      alt=""
    />
    <p class="text-xs text-left px-1 py-2 relative">
      Fall Limited Edition Sneakers
      <span class='block'>
        R125.00 x <span id="items-cart"></span>
        <span id="total" class="font-bold text-black"></span>
        <span class="inline w-3 absolute right-0" id="delete-item">
          <img src="../images/icon-delete.svg" class="" />
        </span>
      </span>
    </p></div>
    <span  class='block bg-primary px-3 py-3 my-1 rounded-lg text-white'>
    Checkout
  </span>`
      : "<p class='text-center w-full h-full mx-auto'>Your cart is empty</p>";

  if (value === 0) return;

  document.querySelector("#items-cart").textContent = value;
  document.querySelector("#total").textContent = "R" + 125 * value;
});
