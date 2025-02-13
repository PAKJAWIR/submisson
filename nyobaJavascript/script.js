const inputForm = document.getElementById("inputForm");
const deleteData = document.getElementById("deleteData");
const displayUsername = document.getElementById("displayUsername");
const displayPassword = document.getElementById("displayPassword");

// Fungsi agar bisa disimpan di localstorage
function simpanKeStorage(username, password) {
  localStorage.setItem("username", username);
  localStorage.setItem("password", password);
}

// Fungsi mengambil dari localstorage

function loadFromStorage() {
  const username = localStorage.getItem("username");
  const password = localStorage.getItem("password");

  if (username && password) {
    displayUsername.textContent = username;
    displayPassword.textContent = password;
  } else {
    console.log("Tidak ada data");
  }
}

inputForm.addEventListener("submit", function (event) {
  const username = document.getElementById("username").value; // Ambil username
  const password = document.getElementById("password").value; // Ambil password


// Memvalidasi user input
  if (username.trim() === "" || password.trim() === "") {
    alert("Tidak boleh kosong!");
    return;
  }

  simpanKeStorage(username, password);

  // Menampilkan User Data
  displayUsername.textContent = username;
  displayPassword.textContent = password;
});


// Menghapus User Data
deleteData.addEventListener("click", function () {
  localStorage.removeItem("username");
  localStorage.removeItem("password");

  displayUsername.textContent = "";
  displayPassword.textContent = "";

  alert("Data berhasil dihapus!");
});

loadFromStorage();
