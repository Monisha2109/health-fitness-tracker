// js/auth.js
function register() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  if (user && pass) {
    // Save unique credentials for this user
    localStorage.setItem(`${user}_user`, user);
    localStorage.setItem(`${user}_pass`, pass);
    document.getElementById("msg").textContent = "Registered! You can now login.";
  } else {
    document.getElementById("msg").textContent = "Fill all fields.";
  }
}

function login() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  const storedUser = localStorage.getItem(`${user}_user`);
  const storedPass = localStorage.getItem(`${user}_pass`);

  if (user === storedUser && pass === storedPass) {
    localStorage.setItem("loggedInUser", user); // Track current session user
    location.href = "dashboard.html";
  } else {
    document.getElementById("msg").textContent = "Invalid credentials.";
  }
}
