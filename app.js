const libraryContainer = document.querySelector('.library__container');

class Library {
    constructor(libArray = []) {
        this.libArray = libArray
    }
    // Fires on form submit
    addBookToLibrary(event) {
        event.preventDefault();
        let bookTitle = document.getElementById('title').value;
        let bookAuthor = document.getElementById('author').value;
        let bookPages = document.getElementById('pages').value;
        let bookRead = document.querySelector('input[name=read_status]:checked').value;
        const newBook = new Book(bookTitle, bookAuthor, bookPages, bookRead)
        newBook.pushToLibrary()
    }
    static redrawDOM() {
        while (libraryContainer.firstChild) {
            libraryContainer.removeChild(libraryContainer.lastChild)
        }
        myLibrary.populateLibraryContainer()
    }

    populateLibraryContainer() {
        for (let i = 0; i < myLibrary.libArray.length; i++) {
            myLibrary.libArray[i].addBookToContainer()
        }
    }

    static popUpForm() {
        bookForm.reset();
        popup.classList.toggle('visible')
    }

}

let myLibrary = new Library()
const newBookBtn = document.getElementById('new-book-btn').addEventListener('click', Library.popUpForm)
const closeBtn = document.getElementById('close_popup_btn').addEventListener('click', Library.popUpForm)
const popup = document.querySelector('.new__book--popup')
const bookForm = document.getElementById('book__form')
bookForm.addEventListener('submit', (e) => myLibrary.addBookToLibrary(e))

class Book {
    static createBookCard(html) {
        const template = document.createElement('template')
        template.innerHTML = html.trim()
        return template.content.firstElementChild;
    }
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
    pushToLibrary() {
        myLibrary.libArray.push(this);
        this.addBookToContainer()
        Library.popUpForm()
    }

    addBookToContainer() {
        const bookCardHtml = Book.createBookCard(`<div class="book__card" data-index="${myLibrary.libArray.indexOf(this)}">
            <h1>${this.title}</h1>
            <h2>${this.author}</h2>
            <p>${this.pages}</p>
            <p class='read-status'>${this.read}</p>
            <button class="change-read-btn">Change Status</button>
            <button class="delete-btn">Delete</button>
            </div>`);
        libraryContainer.appendChild(bookCardHtml.cloneNode(true))
        let cardElement = libraryContainer.querySelector(`[data-index="${myLibrary.libArray.indexOf(this)}"]`);
        cardElement.querySelector('.change-read-btn').addEventListener('click', (e) => myLibrary.libArray[e.target.parentNode.dataset.index].changeRead())
        cardElement.querySelector('.delete-btn').addEventListener('click', (e) => myLibrary.libArray[e.target.parentNode.dataset.index].removeBook());

    }

    removeBook() {
        myLibrary.libArray.splice(myLibrary.libArray.indexOf(this), 1);
        Library.redrawDOM()
    }
    changeRead() {
        switch (this.read.toLowerCase()) {
            case "read":
                this.read = 'Not Read Yet'
                break;
            case 'not read yet':
                this.read = 'Read'
                break;
        }
        let cardElement = libraryContainer.querySelector(`[data-index="${myLibrary.libArray.indexOf(this)}"]`)
        cardElement.querySelector('.read-status').textContent = this.read

    };

}

