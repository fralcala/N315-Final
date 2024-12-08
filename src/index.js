import * as $ from "jquery";
import { initURLListener, signUserUp, signUserOut, signUserin } from "./model";

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

  // sign up
  console.log("init");
  $(document).on("click", "#signSubmit", () => {
    console.log("hello");
    const firstName = $("#fName").val();
    const lastName = $("#lName").val();
    const email = $("#email").val();
    const password = $("#password").val();
    signUserUp(firstName, lastName, email, password);
  });
  // log out
  $(".logOut").on("click", () => {
    signUserOut();
  });
  // login
  $(document).on("click", "#logSubmit", () => {
    let logEmail = $("#logEmail").val();
    let logPassword = $("#logPassword").val();
    signUserin(logEmail, logPassword);
  });
}

$(document).ready(function () {
  initURLListener();
  initAccountListener();
});
