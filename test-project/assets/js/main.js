(function() {
  "use strict";

  const dataDOM = {
    form: document.querySelector("#form"),
    firstName: document.querySelector("#first-name"),
    lastName: document.querySelector("#last-name"),
    email: document.querySelector("#email"),
    country: document.querySelector("#country"),
    phone: document.querySelector("#phone")
  };

  function validateChars(el) {
    if (el.value.length === 0 || el.value.length < 3) {
      el.value = `Value should be greater than 3 symbols`;
      el.style.color = "red";
      el.addEventListener("click", function() {
        el.value = "";
        el.style.color = "black";
      });
      return false;
    }
  }

  function validateDigits(el) {
    let regex = /^[0-9]+$/;

    if (!el.value.match(regex) || el.value.length < 7) {
      el.value = `Enter correct value (only digits 7+ symbols)`;
      el.style.color = "red";
      el.addEventListener("click", function() {
        el.value = "";
        el.style.color = "black";
      });
      return false;
    }
  }

  function validateEmail(el) {
    let regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!el.value.match(regex)) {
      el.value = `Enter correct email`;
      el.style.color = "red";
      el.addEventListener("click", function() {
        el.value = "";
        el.style.color = "black";
      });
      return false;
    }
  }

  function validateBackend() {
    fetch(`/form.php`, {
      method: "POST",
      body: dataDOM.email.value
    })
      .then(function(response) {
        if (response.ok) {
          dataDOM.email.value = "Backend verification passed!";
          dataDOM.email.style.color = "green";
        }
        return response;
      })
      .catch(function(error) {
        //write 403 response code to console  
        console.log(error);
      });
  }

  dataDOM.form.addEventListener("submit", function(e) {
    e.preventDefault();
    validateChars(dataDOM.firstName);
    validateChars(dataDOM.lastName);
    validateChars(dataDOM.country);
    validateDigits(dataDOM.phone);
    validateEmail(dataDOM.email);

    //calling function to check correct email from php file
    validateBackend();
  });
})();
