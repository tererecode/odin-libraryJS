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
        const bookCard = libraryContainer.appendChild(document.createElement('div'));
        bookCard.classList.add('book__card')
        bookCard.dataset.index = myLibrary.libArray.indexOf(this)
        bookCard.appendChild(document.createElement('h1'))
        bookCard.children[0].textContent = this.title;
        bookCard.appendChild(document.createElement('h2'))
        bookCard.children[1].textContent = this.author;
        bookCard.appendChild(document.createElement('p'))
        bookCard.children[2].textContent = this.pages;
        bookCard.appendChild(document.createElement('p'))
        bookCard.children[3].textContent = this.read;
        bookCard.appendChild(document.createElement('button'))
        bookCard.children[4].textContent = 'Change Status';
        bookCard.children[4].addEventListener('click', (e) => myLibrary.libArray[e.target.parentNode.dataset.index].changeRead())
        bookCard.appendChild(document.createElement('button'))
        bookCard.children[5].textContent = 'Delete';
        bookCard.children[5].addEventListener('click', (e) => myLibrary.libArray[e.target.parentNode.dataset.index].removeBook());
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
        Library.redrawDOM()

    };

}

