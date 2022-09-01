let myLibrary = [];

class Bookdetails {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

// UI class
class UI {
  static showBooks() {
    const inLibBooks = [
      {
        title: "NANAN",
        author: "sdad",
        pages: "12",
        read: "read",
      },
      {
        title: "peepeee",
        author: "sdad",
        pages: "12",
        read: "read",
      },
    ];

    const books = inLibBooks;

    books.forEach((book) => UI.addBookToLibrary(book));
  }

  static addBookToLibrary(book) {
    const bookLists = document.querySelector("#book-lists");
    const listContainer = document.createElement("div");

    listContainer.classList.add("card", "basis-1/4", "bg-base", "shadow-xl");
    listContainer.dataset.theme = "dracula";

    listContainer.innerHTML = `
    <div class="card-body">
            <div class="card-actions justify-end">
              <button class="btn btn-error btn-circle btn-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <p>Title: ${book.title}</p>
            <p>Author: ${book.author}</p>
            <p>Pages: ${book.pages}</p>
            <div class="form-control">
              <label class="label cursor-pointer p-0">
                <span class="label-text text-lg">Read</span>
                <input
                  type="checkbox"
                  checked="checked"
                  class="checkbox checkbox-primary"
                />
              </label>
            </div>
          </div>`;

    bookLists.appendChild(listContainer) 
  }
}

// Display/Add book entry in browser
document.addEventListener('DOMContentLoaded', UI.showBooks)

// ADD BOOK
document.querySelector('#book-form').addEventListener('submit', (e) => {

})

// Delete book entry from browser
// Create DOM elements
// Local Storage

// Number of Pages increment and decrement
