import * as $ from "jquery";

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
  if (cart.length > 0) {
    $(".cart-items").html("");
    $.each(cart, (index, productIndex) => {
      let product = products[productIndex];
      console.log("cart page");
      let cartHTML = `<div class="product">
              <div class="image-holder">
                <img src="images/${product.productImage}" alt="product image" />
              </div>
              <div class="desc">${product.productDesc}</div>
              <div class="price">$${product.productPrice}</div>
              <div class="remove" id="${index}">Remove</div>
            <div/>`;

      $(".cart-items").append(cartHTML);

      $(".remove").on("click", function () {
        console.log("remove", cart);
        cart.splice(index, 1);
        console.log("after remove", cart);
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
            ? `<div class="pbanner" style="background-color: ${product.productBannerColor}">${product.productBanner} Banner</div>`
            : ""
        }
        <div class="image-holder">
          <img src="images/${product.productImage}" alt="product image" />
        </div>
        <div class="desc">
          ${product.productDesc}
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
