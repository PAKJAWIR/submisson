// STARFIELD 1
const starfields = document.querySelectorAll(".starfield");

function createStarfield(starfieldElement) {
  for (let i = 0; i < 100; i++) {
    const star = document.createElement("div");
    star.classList.add("star");
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.animationDuration = `${Math.random() * 2 + 1}s`;
    star.style.width = `${Math.random() * 3}px`;
    star.style.height = star.style.width;
    starfieldElement.appendChild(star);
  }
}
starfields.forEach(createStarfield);

// STARFIELD 2
const starfields2 = document.querySelectorAll(".starfield2");

function createStarfield2(starfieldElement2) {
  for (let i = 0; i < 200; i++) {
    const star2 = document.createElement("div");
    star2.classList.add("star2");
    star2.style.left = `${Math.random() * 100}%`;
    star2.style.top = `${Math.random() * 100}%`;
    star2.style.animationDuration = `${Math.random() * 2 + 1}s`;
    star2.style.width = `${Math.random() * 3}px`;
    star2.style.height = star2.style.width;
    starfieldElement2.appendChild(star2);
  }
}
starfields2.forEach(createStarfield2);

// Hamburger Menu Toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".navbarpar");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close menu ketika klik di luar
document.addEventListener("click", (e) => {
  if (!e.target.closest(".navbar")) {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  }
});

// Close menu setelah klik link
document.querySelectorAll(".navbarpar a").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

// BACK-TO-TOP
const toTop = document.getElementById("backToTop");

toTop.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
  });
});

window.addEventListener("scroll", function () {
  if (window.scrollY > 900) {
    toTop.classList.add("show2");
    toTop.classList.remove("show");
  } else if (window.scrollY > 100) {
    toTop.classList.add("show");
    toTop.classList.remove("show2");
  } else {
    toTop.classList.remove("show", "show2");
  }
});

// SEARCHBAR ON SCROLL
const searchBarShow = document.getElementById("searchbarshow"); // Pastikan ID sesuai

window.addEventListener("scroll", function () {
  if (window.scrollY > 900) {
    searchBarShow.classList.add("show2");
    searchBarShow.classList.remove("show");
  } else if (window.scrollY > 100) {
    searchBarShow.classList.add("show");
    searchBarShow.classList.remove("show2");
  } else {
    searchBarShow.classList.remove("show", "show2");
  }
});

// BOOK MANAGEMENT SYSTEM
document.addEventListener("DOMContentLoaded", function () {
  // Deklarasi Variabel
  const bookForm = document.getElementById("bookForm");
  const unreadContainer = document.querySelector("#belumdibaca .blmdbccardprnt");
  const readContainer = document.querySelector(".sudahdibacabk .sdhdbccardprnt");
  const unreadNotification = document.getElementById("ntfblmdbc");
  const readNotification = document.getElementById("ntfsdhdbc");
  const searchInput = document.getElementById("searchbar");
  const searchButton = document.getElementById("searchbutton");

  // Pesan Notifikasi
  const originalUnreadMsg = "Keren! sepertinya kamu sudah membaca semua buku!";
  const originalReadMsg = "Oops..., sepertinya kamu belum membaca bukunya!";
  const emptyCollectionMsg = "Kamu belum menambahkan buku! Ayo tambahkan!";

  // Load Data dari LocalStorage
  loadBooksFromLocalStorage();
  checkEmptyCollection();

  // Event Listener untuk Form
  bookForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const book = {
      id: Date.now(),
      title: document.getElementById("bookFormTitle").value,
      author: document.getElementById("bookFormAuthor").value,
      year: parseInt(document.getElementById("bookFormYear").value),
      isComplete: document.getElementById("bookFormIsComplete").checked,
    };

    saveBookToLocalStorage(book);
    renderBook(book);
    bookForm.reset();
    checkEmptyCollection();
    handleSearch();
    document.getElementById("bukuku").scrollIntoView({ behavior: "smooth" });
  });

  // Event Listener untuk Pencarian
  searchInput.addEventListener("input", handleSearch);
  searchButton.addEventListener("click", handleSearch);

  // Fungsi Pencarian
  function handleSearch() {
    const query = searchInput.value.trim().toLowerCase();
    const books = getBooksFromLocalStorage();

    // Bersihkan container
    unreadContainer.innerHTML = "";
    readContainer.innerHTML = "";

    // Filter buku berdasarkan query
    const filteredBooks = books.filter((book) => {
      return book.title.toLowerCase().includes(query) || book.author.toLowerCase().includes(query) || book.year.toString().includes(query);
    });

    // Render buku yang difilter
    if (Array.isArray(filteredBooks)) {
      filteredBooks.forEach((book) => {
        const bookCard = createBookCard(book);
        const targetContainer = book.isComplete ? readContainer : unreadContainer;
        targetContainer.appendChild(bookCard);
      });
    }

    checkEmptyCollection();
  }

  // Fungsi Render Buku
  function renderBook(book) {
    const bookCard = createBookCard(book);
    const targetContainer = book.isComplete ? readContainer : unreadContainer;
    targetContainer.appendChild(bookCard);
  }

  // Fungsi Membuat Card Buku
  function createBookCard(book) {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");
    bookCard.setAttribute("data-bookid", book.id);
    bookCard.setAttribute("data-testid", "bookItem");

    bookCard.innerHTML = `
      <div class="cardbook">
        <h3 data-testid="bookItemTitle">${book.title}</h3>
        <p data-testid="bookItemAuthor">Penulis: ${book.author}</p>
        <p data-testid="bookItemYear">Tahun: ${book.year}</p>
        <div class="cardbookbtn">
          <button data-testid="bookItemIsCompleteButton">
            ${book.isComplete ? "Tandai Belum Dibaca" : "Tandai Selesai"}
          </button>
          <button data-testid="bookItemDeleteButton">Hapus</button>
          <button data-testid="bookItemEditButton">Edit</button>
        </div>
      </div>
    `;

    // Event Listener untuk Tombol Complete
    const completeBtn = bookCard.querySelector('[data-testid="bookItemIsCompleteButton"]');
    completeBtn.addEventListener("click", function () {
      book.isComplete = !book.isComplete;
      updateBookInLocalStorage(book);
      handleSearch();
    });

    // Event Listener untuk Tombol Delete
    const deleteBtn = bookCard.querySelector('[data-testid="bookItemDeleteButton"]');
    deleteBtn.addEventListener("click", function () {
      if (confirm("Yakin ingin menghapus buku?")) {
        bookCard.remove();
        deleteBookFromLocalStorage(book.id);
        handleSearch();
        checkEmptyCollection();
      }
    });

    // Event Listener untuk Tombol Edit
    const editBtn = bookCard.querySelector('[data-testid="bookItemEditButton"]');
    editBtn.addEventListener("click", function () {
      const newTitle = prompt("Edit Judul Buku:", book.title);
      if (newTitle === null) return;

      const newAuthor = prompt("Edit Penulis Buku:", book.author);
      if (newAuthor === null) return;

      const newYear = prompt("Edit Tahun Buku:", String(book.year));
      if (newYear === null) return;

      if (isNaN(newYear)) {
        alert("Tahun harus berupa angka!");
        return;
      }

      const isComplete = confirm("Apakah buku ini sudah selesai dibaca?");

      const updatedBook = {
        ...book,
        title: newTitle,
        author: newAuthor,
        year: parseInt(newYear),
        isComplete: isComplete,
      };

      updateBookInLocalStorage(updatedBook);
      unreadContainer.innerHTML = "";
      readContainer.innerHTML = "";
      loadBooksFromLocalStorage();
      checkEmptyCollection();
    });

    return bookCard;
  }

  // Fungsi Cek Koleksi Kosong
  function checkEmptyCollection() {
    const totalBooks = unreadContainer.children.length + readContainer.children.length;

    unreadNotification.textContent = totalBooks ? originalUnreadMsg : emptyCollectionMsg;
    readNotification.textContent = totalBooks ? originalReadMsg : emptyCollectionMsg;

    unreadNotification.style.display = unreadContainer.children.length ? "none" : "block";
    readNotification.style.display = readContainer.children.length ? "none" : "block";
  }

  // Fungsi LocalStorage
  function saveBookToLocalStorage(book) {
    const books = getBooksFromLocalStorage();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }

  function getBooksFromLocalStorage() {
    const books = JSON.parse(localStorage.getItem("books")) || [];
    return books.map((book) => ({
      ...book,
      year: typeof book.year === "string" ? parseInt(book.year) : book.year,
    }));
  }

  function loadBooksFromLocalStorage() {
    const books = getBooksFromLocalStorage();
    books.forEach((book) => renderBook(book));
  }

  function deleteBookFromLocalStorage(id) {
    let books = getBooksFromLocalStorage();
    books = books.filter((book) => book.id !== id);
    localStorage.setItem("books", JSON.stringify(books));
  }

  function updateBookInLocalStorage(updatedBook) {
    let books = getBooksFromLocalStorage();
    books = books.map((book) => (book.id === updatedBook.id ? updatedBook : book));
    localStorage.setItem("books", JSON.stringify(books));
  }
});
