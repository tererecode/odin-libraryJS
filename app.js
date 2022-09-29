const libraryContainer = document.querySelector('.library__container');
const newBookBtn = document.getElementById('new-book-btn');
newBookBtn.addEventListener('click', popUpForm)
const popup = document.querySelector('.new__book--popup')

// ***this returns a nodeList***
// const fRead = document.getElementsByName('read_status')

const bookForm = document.getElementById('book__form')
bookForm.addEventListener('submit', (e) => addBookToLibrary(e))
const closeBtn = document.getElementById('close_popup_btn');
closeBtn.addEventListener('click', popUpForm)


let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.changeRead = function () {
    switch (this.read.toLowerCase()) {
        case "read":
            this.read = 'Not Read Yet'
            break;
        case 'not read yet':
            this.read = 'Read'
            break;
    }
    redrawDOM()
};


const book1 = new Book('The Hobbit', 'J.R.R Tolkien', '295 pages', 'Not read Yet');
const book2 = new Book('Book2', 'John Doe', '295 pages', 'Not Read Yet');
const book3 = new Book('Book3', 'Mike Doe', '300 pages', 'Read');
const book4 = new Book('Book4', 'Jane Doe', '200 pages', 'Not Read Yet');
const book5 = new Book('Book5', 'Kate Doe', '150 pages', 'Read');

myLibrary.push(book1, book2, book3, book4, book5);


function addBookToLibrary(event) {
    event.preventDefault()
    let bookTitle = document.getElementById('title').value;
    let bookAuthor = document.getElementById('author').value;
    let bookPages = document.getElementById('pages').value;
    let bookRead = document.querySelector('input[name=read_status]:checked').value;
    const newBookObject = new Book(bookTitle, bookAuthor, bookPages, bookRead);
    myLibrary.push(newBookObject);
    addBookToContainer(newBookObject, myLibrary.indexOf(newBookObject));
    popUpForm()

}

function addBookToContainer(bookObject, index) {
    const bookCard = libraryContainer.appendChild(document.createElement('div'));
    bookCard.classList.add('book__card')
    bookCard.dataset.index = index
    bookCard.appendChild(document.createElement('h1'))
    bookCard.children[0].textContent = bookObject.title;
    bookCard.appendChild(document.createElement('h2'))
    bookCard.children[1].textContent = bookObject.author;
    bookCard.appendChild(document.createElement('p'))
    bookCard.children[2].textContent = bookObject.pages;
    bookCard.appendChild(document.createElement('p'))
    bookCard.children[3].textContent = bookObject.read;
    bookCard.appendChild(document.createElement('button'))
    bookCard.children[4].textContent = 'Change Status';
    bookCard.children[4].addEventListener('click', (e) => myLibrary[e.target.parentNode.dataset.index].changeRead())
    bookCard.appendChild(document.createElement('button'))
    bookCard.children[5].textContent = 'Delete';
    bookCard.children[5].addEventListener('click', (e) => bookRemover(e.target.parentNode.dataset.index));
}

function populateLibraryContainer() {
    for (let i = 0; i < myLibrary.length; i++) {
        addBookToContainer(myLibrary[i], i)
    }
}

function bookRemover(indexOfNode) {
    myLibrary.splice(indexOfNode, 1);
    redrawDOM()
}

function redrawDOM() {
    while (libraryContainer.firstChild) {
        libraryContainer.removeChild(libraryContainer.lastChild)
    }
    populateLibraryContainer()
}

function popUpForm() {
    bookForm.reset()
    popup.classList.toggle('visible')
}

populateLibraryContainer()
