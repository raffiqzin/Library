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
    const inLibBooks = Store.getBooks()

    const books = inLibBooks;

    books.forEach((book) => UI.addBookToLibrary(book));
  }

  static addBookToLibrary(book) {
    const bookLists = document.querySelector("#book-lists");
    const listContainer = document.createElement("div");

    listContainer.classList.add("flex-initial", "w-80", "card", "bg-base", "shadow-xl");
    listContainer.dataset.theme = "dracula";

    // Create DOM elements
    if (document.querySelector('#read-checked').checked === true) {
      listContainer.innerHTML = `
      <div class="card-body">
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
              <div class="card-actions justify-center">
                <button class="btn btn-error btn-circle btn-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 delete"
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
            </div>`;
    } else {
      listContainer.innerHTML = `
    <div class="card-body">
            <p>Title: ${book.title}</p>
            <p>Author: ${book.author}</p>
            <p>Pages: ${book.pages}</p>
            <div class="form-control">
              <label class="label cursor-pointer p-0">
                <span class="label-text text-lg">Read</span>
                <input
                  type="checkbox"
                  class="checkbox checkbox-primary"
                />
              </label>
            </div>
            <div class="card-actions justify-center">
              <button class="btn btn-error btn-circle btn-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 delete"
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
          </div>`;
    }

    bookLists.appendChild(listContainer) 
  }

  // delete book entries
  static deleteBook(el) {
    if(el.classList.contains('delete')) {
      el.parentElement.parentElement.parentElement.parentElement.remove()
    }
  }

  // clear forms 
  static clearFields() {
    document.querySelector('#title').value = ''
    document.querySelector('#author').value = ''
    document.querySelector('#pages').value = ''
    document.querySelector('#read-checked:unchecked').value
  }
}

// Display/Add book entry in browser
document.addEventListener('DOMContentLoaded', UI.showBooks)

// ADD BOOK
document.querySelector('#book-form').addEventListener('submit', (e) => {
  e.preventDefault()

  // get form values
  const title = document.querySelector('#title').value
  const author = document.querySelector('#author').value
  const pages = document.querySelector('#pages').value
  const readChecked = document.querySelector('#read-checked').value

  // create new book 
  const book = new Bookdetails(title, author, pages, readChecked)

  // add to browser 
  UI.addBookToLibrary(book)

  // add books to storage
  Store.addBook(book)

  // clear form fields after submit
  UI.clearFields()
})

// Delete book entry from browser using event propagation
document.querySelector('#book-lists').addEventListener('click', (e) => {
  UI.deleteBook(e.target)
  Store.removeBook(e.target.parentElement.parentElement.previousElementSibling.textContent);
})


// Local Storage
class Store {
  static getBooks() {
    let books;
    if(localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(title) {
    const books = Store.getBooks();

    books.forEach((book, index) => {
      if(book.title === title) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}