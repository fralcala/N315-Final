import * as $ from "jquery";
import { initURLListener } from "./model";

function initAccountListener() {
  $(".logo").on("click", function () {
    window.location.hash = "";
    console.log("logo clicked");
  });

  $(".account").on("click", function () {
    window.location.hash = "account";
    console.log("account clicked");
  });

  $(".cart").on("click", function () {
    window.location.hash = "cart";
    console.log("cart clicked");
  });
}

$(document).ready(function () {
  initURLListener();
  initAccountListener();
});
