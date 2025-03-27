document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search-book");
  const searchBtn = document.getElementById("search-btn");
  const sortValue = document.getElementById("sortbybox");
  const listViewBtn = document.getElementById("listviewbtn");
  const gridViewBtn = document.getElementById("gridviewbtn");
  const bookContainer = document.getElementById("book-container");
  const prevBtn = document.getElementById("prevbtn");
  const nextBtn = document.getElementById("nextbtn");
  const displayCurrentPage = document.getElementById("current");
  const paginationContainer = document.querySelector(".pagination-container");

  let totalPages = 21;
  let currentPage = 1;
  let booksData = [];

  /** 🔹 Fetch Books with Pagination */
  async function fetchBooks(page = 1) {
    const url = `https://api.freeapi.app/api/v1/public/books?page=${page}&limit=10`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      booksData = data.data.data;
      totalPages = data.data.totalPages;
      currentPage = data.data.page;
      prevBtn.disabled = !data.data.previousPage;
      nextBtn.disabled = !data.data.nextPage;
      displayCurrentPage.textContent = `Page ${currentPage} of ${totalPages}`;
      paginationContainer.style.display = "flex"; // Show pagination
      renderBooks(booksData);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  }

  /** 🔹 Fetch All Books for Searching */
  async function fetchAllBooks() {
    let allBooks = [];
    for (let page = 1; page <= totalPages; page++) {
      const url = `https://api.freeapi.app/api/v1/public/books?page=${page}&limit=10`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        allBooks = allBooks.concat(data.data.data);
      } catch (error) {
        console.error(`Error fetching page ${page}:`, error);
      }
    }
    return allBooks;
  }

  /** 🔹 Search Books Across All Pages */
  async function searchBooks(query) {
    if (!query) {
      fetchBooks(1); // Restore normal pagination
      return;
    }

    const allBooks = await fetchAllBooks();
const filteredBooks = allBooks.filter((book) => {
    const title = book.volumeInfo.title?.toLowerCase() || ""; 
    const authors = book.volumeInfo.authors?.join(", ").toLowerCase() || ""; 

    return title.includes(query.toLowerCase()) || authors.includes(query.toLowerCase());
});


    paginationContainer.style.display = "none"; // Hide pagination during search
    renderBooks(filteredBooks);
  }

  /** 🔹 Sort Books on Current Page */
  function sortBooks(sortBy) {
    let sortedBooks = [...booksData];

    if (sortBy === "title") {
      sortedBooks.sort((a, b) => a.volumeInfo.title.localeCompare(b.volumeInfo.title));
    } else if (sortBy === "publishDate") {
      sortedBooks.sort((a, b) => (a.volumeInfo.publishedDate || "").localeCompare(b.volumeInfo.publishedDate || ""));
    }

    renderBooks(sortedBooks);
  }

  /** 🔹 Render Books in Container */
  function renderBooks(books) {
    bookContainer.innerHTML = "";
    books.forEach((book) => {
      const bookElement = document.createElement("div");
      bookElement.classList.add("book");

      const bookCover = document.createElement("img");
      bookCover.src = book.volumeInfo.imageLinks?.thumbnail || "https://via.placeholder.com/150";
      bookCover.alt = book.volumeInfo.title;

      const bookTitle = document.createElement("h3");
      bookTitle.textContent = book.volumeInfo.title;

      const author = document.createElement("p");
      author.textContent = book.volumeInfo.authors ? book.volumeInfo.authors.join(", ") : "Unknown Author";

      const published = document.createElement("p");
      published.textContent = book.volumeInfo.publishedDate || "Unknown Date";

      bookElement.appendChild(bookCover);
      bookElement.appendChild(bookTitle);
      bookElement.appendChild(author);
      bookElement.appendChild(published);
      bookContainer.appendChild(bookElement);
    });
  }

  /** 🔹 Event Listeners */
  searchInput.addEventListener("input", () => {
    const bookToSearch = searchInput.value.trim();
    searchBooks(bookToSearch);
  });

  searchInput.addEventListener("input", () => {
    if (!searchInput.value.trim()) {
      fetchBooks(1); // Restore pagination when search is cleared
    }
  });

  sortValue.addEventListener("change", (e) => {
    sortBooks(e.target.value);
  });

  prevBtn.addEventListener("click", () => {
    if (currentPage > 1) fetchBooks(currentPage - 1);
  });

  nextBtn.addEventListener("click", () => {
    if (currentPage < totalPages) fetchBooks(currentPage + 1);
  });

  gridViewBtn.addEventListener("click", () => {
    bookContainer.classList.remove("list-view");
    gridViewBtn.classList.add("active");
    listViewBtn.classList.remove("active");
  });

  listViewBtn.addEventListener("click", () => {
    bookContainer.classList.add("list-view");
    listViewBtn.classList.add("active");
    gridViewBtn.classList.remove("active");
  });

  fetchBooks(1); // Load books with pagination by default
});
