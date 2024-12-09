import * as $ from "jquery";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { app } from "./firebaseConfig";

const auth = getAuth(app);
var products = [];
var cart = [];

function changeRoute() {
  let hashTag = window.location.hash;
  let pageID = hashTag.replace("#", "");
  //   console.log(hashTag + ' ' + pageID);

  if (pageID != "") {
    $.get(`pages/${pageID}.html`, function (data) {
      console.log("data " + data);
      $("#app").html(data);
      if (pageID === "cart") {
        loadCartItems();
      }
    });
  } else {
    if (products.length <= 0) {
      loadProducts();
    } else {
      loadHomePage();
    }
  }
}

export function initURLListener() {
  $(window).on("hashchange", changeRoute);
  changeRoute();
}

function loadCartItems() {
  // $(".filters").css("display", "none");
  if (cart.length > 0) {
    $(".cart-items").html("");
    $.each(cart, (index, productIndex) => {
      let product = products[productIndex];
      console.log("cart page");
      let cartHTML = `<div class="product">
              <div class="image-holder">
                <img src="images/${product.productImage}" alt="product image" />
              </div>
              <div class="product-color" style="background-color: ${product.productColor}"></div>
        <div class="name">
          ${product.productName}
        </div>
              <div class="price">$${product.productPrice}</div>
              <div class="remove" id="${index}">Remove</div>
            <div/>`;

      $(".cart-items").append(cartHTML);

      $(".remove").on("click", function () {
        console.log("remove", cart);
        cart.splice(index, 1);
        console.log("after remove", cart);
        $(".item-text").html(cart.length);
        loadCartItems();
      });
    });
  }
}

function loadHomePage() {
  $("#app").html("");
  $.each(products, (index, product) => {
    let productHTML = `<div class="product">
        ${
          product.productBanner
            ? `<div class="pbanner" style="background-color: ${product.productBannerColor}; color: ${product.color}";>${product.productBanner}</div>`
            : ""
        }
        <div class="image-holder">
          <img src="images/${product.productImage}" alt="product image" />
        </div>
        <div class="product-color" style="background-color: ${
          product.productColor
        }"></div>
        <div class="name">
          ${product.productName}
        </div>
        <div class="price">
          $${product.productPrice}
        </div>
        <div class="buy">
          <div class="buy-now" id="${index}">Buy Now</div>
        </div>
      </div>`;
    $("#app").append(productHTML);
  });

  addBuyNowListener();
}

function addBuyNowListener() {
  $(".buy-now").on("click", function () {
    let index = $(this).attr("id");
    cart.push(index);
    $(".item-text").html(cart.length);
    console.log("Buy Now", index);
  });
}

function loadProducts() {
  $.getJSON("data/data.json", (data) => {
    products = data.PRODUCTS;
    console.log(products);
    loadHomePage();
  });
}

// loging in
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User is signed in");
  } else {
    console.log("User is signed out for real");
  }
});

export function signUserUp(fn, ln, email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      console.log("User Created");
      alert("User Created!");
      $(".logOut").css("display", "block");
    })
    .catch((error) => {
      const errorMessage = error.message;
      alert("Error Message " + errorMessage);
    });
}

export function signUserOut() {
  signOut(auth)
    .then(() => {
      console.log("User signed out");
      $(".logOut").css("display", "none");
    })
    .catch((error) => {
      const errorMessage = error.message;
      alert("Error Message " + errorMessage);
    });
}

export function signUserin(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      alert("User logged in");
      $(".logOut").css("display", "block");
    })
    .catch((error) => {
      const errorMessage = error.message;
      alert("Error Message " + errorMessage);
    });
}
