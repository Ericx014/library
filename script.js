let myLibrary = [];

const newBookButton = document.getElementById('new-book-button');
const cancelButton = document.getElementById('cancel-button');
const formDialog = document.querySelector('.form-dialog');
const bookGrid = document.querySelector('.book-grid');

newBookButton.addEventListener('click', () => {
    formDialog.showModal();
})

cancelButton.addEventListener('click', () => {
    formDialog.close();
})

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    let readStatus = readOrNot(read);
    this.info = function () {
        console.log(title + " by " + author + ", " + pages + " pages" + ", " + readStatus)
    }
}
function readOrNot(read) {
    if (read == false) {
        return ("not read yet.");
    } else if (read == true) {
        return ("already read.");
    }
}
const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const pagesInput = document.getElementById('pages');
const readStatusInput = document.getElementById('read-status');

function addBook(e) {
    e.preventDefault();
    const title = titleInput.value;
    const author = authorInput.value;
    const pages = pagesInput.value;
    const readStatus = readStatusInput.checked;
    const newBook = new Book(title, author, pages, readStatus);

    myLibrary.push(newBook);
    createBookCard(newBook);

    titleInput.value = '';
    authorInput.value = '';
    pagesInput.value = '';
    readStatusInput.checked = false;

    formDialog.close();
}

const form = document.getElementById('form');
form.addEventListener('submit', addBook);

const createBookCard = (book) => {
    const bookCard = document.createElement('div');
    const title = document.createElement('p');
    const author = document.createElement('p');
    const pages = document.createElement('p');
    const buttonContainer = document.createElement('div');
    const readButton = document.createElement('button');
    const removeButton = document.createElement('button');
    
    bookCard.classList.add('book-card');
    buttonContainer.classList.add('button-container');
    readButton.classList.add('button');
    removeButton.classList.add('button');
    
    //add readButton functionality
    

    //add removeButton functionality
    removeButton.addEventListener('click', () => {
        bookGrid.removeChild(bookCard);
        const index = myLibrary.indexOf(book);
        if (index > -1) {
            myLibrary.splice(index, 1);
        }
    })

    title.textContent = `${book.title}`;
    author.textContent = `${book.author}`;
    pages.textContent = `${book.pages} pages`;
    readButton.textContent = "Read";
    removeButton.textContent = "Remove";

    bookCard.appendChild(title);
    bookCard.appendChild(author);
    bookCard.appendChild(pages);
    buttonContainer.appendChild(readButton);
    buttonContainer.appendChild(removeButton);
    bookCard.appendChild(buttonContainer);   
    bookGrid.appendChild(bookCard);
}