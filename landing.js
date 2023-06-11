let loginModal = document.getElementById("loginModal");
let signInBtn = document.getElementById("signIn");
let span = document.getElementsByClassName("close")[0];
let signUpSpan = document.getElementsByClassName("close")[1];
let signUpModal = document.getElementById("signUpModal");
let signUpBtn = document.getElementById("signUp");
let signUpSubmitBtn = document.getElementById("signUpSubmit");
let loginSubmitBtn = document.getElementById("loginSubmitButton");
let username;
let isLoggedIn;
// LOGIN
signInBtn.onclick = function () {
  console.log("clicked");
  loginModal.style.display = "block";
};

span.onclick = function () {
  loginModal.style.display = "none";
  console.log("Span clicked");
};

window.onclick = function (event) {
  if (event.target == loginModal) {
    loginModal.style.display = "none";
  }
};

// SIGN UP
signUpBtn.onclick = function () {
  console.log("clicked");
  signUpModal.style.display = "block";
};

signUpSpan.onclick = function () {
  signUpModal.style.display = "none";
  console.log("Span clicked");
};

window.onclick = function (event) {
  if (event.target == signUpModal) {
    signUpModal.style.display = "none";
  }
};

loginSubmitBtn.onclick = function () {
  console.log("clicked");
  login();
};

//Event Listeners
document.addEventListener("DOMContentLoaded", function () {
  var signUpButton = document.getElementById("signUpSubmit");
  signUpButton.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent the default form submission behavior
    createUserAccount();
  });
});

function updateUI() {
  if (isLoggedIn) {
    let usernameDisplay = document.getElementById("usernameDisplay");
    usernameDisplay.innerText = username;
  }
}

//Functions
function createUserAccount() {
  var email = document.getElementById("emailInput").value;
  var username = document.getElementById("usernameInput").value;
  var password = document.getElementById("passwordInput").value;
  var date = new Date();

  var formData = {
    email: email,
    username: username,
    password: password,
    salt: "", // Add salt value here if applicable
    creation_date: date, // Add creation date value here if applicable
  };

  fetch("http://localhost:3000/createAccount", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then(function (response) {
      if (response.ok) {
        console.log("Account created successfully!");
        newAccountSuccess();
        // Redirect or display a success message to the user
      } else {
        console.log("Error creating account:", response.status);
        // Display an error message to the user
      }
    })
    .then(function (data) {
      let jwt = data.accessToken;
      localStorage.setItem("accessToken", jwt);
      console.log("token stored " + jwt);
    })

    .catch(function (error) {
      console.log("Error creating account:", error);
      // Display an error message to the user
    });
}

function newAccountSuccess() {
  console.log("called");
  let tempModal = document.getElementsByClassName("modal-content-signUp");
  tempModal[0].innerHTML = "Account Created Successfully";
}

function login() {
  console.log("login called");
  var email = document.getElementById("loginEmail").value;
  var password = document.getElementById("loginPassword").value;
  var formData = {
    email: email,
    password: password,
  };

  fetch("http://localhost:3000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then(function (response) {
      if (response.ok) {
        console.log("Logged in successfully");
        return response.json();
      } else {
        console.log("Error logging in:", response.status);
        throw new Error("Login request failed");
      }
    })
    .then(function (data) {
      console.log(data);
      let jwt = data.accessToken;
      localStorage.setItem("accessToken", jwt);
      console.log("token stored " + jwt);
      username = data.username;
      updateUI();
    })
    .catch(function (error) {
      console.log("Error logging in:", error);
    });
}
