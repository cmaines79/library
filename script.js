// SETTING DOM VARIABLES
const introH2El = document.getElementById('introH2');
const bodyEl = document.querySelector('.body');
const newBookEl = document.querySelector('.newBook');
const titleEl = document.getElementById('title');
const authorEl = document.getElementById('author');
const pagesEl = document.getElementById('pages');
const readEl = document.getElementById('read');
const libraryEl = document.querySelector('.library');

// SETTING GLOBAL VARIABLES
let myLibrary = [];

// sample book data until we figure out local storage
// const book1 = new Book('john doe', 'ghost', 256, true, 1);
// const book2 = new Book('mickey mouse', 'mousin around', 180, false, 2);
// const book3 = new Book('spiderman', 'webbin 2021', 16, true, 3);
// const book4 = new Book('john doe', 'ghost2', 256, false, 4);
// const book5 = new Book('mickey mouse', 'mousin around2', 180, false, 5);
// const book6 = new Book('spiderman', 'webbin 2021 -2', 16, true, 6);
// myLibrary.push(book1);
// myLibrary.push(book2);
// myLibrary.push(book3);
// myLibrary.push(book4);
// myLibrary.push(book5);
// myLibrary.push(book6);
// drawLibraryCards();

let bookId = myLibrary.length + 1;


function Book(author, title, pages, read, id) {
    this.id = id,
    this.title = stringFormatting(title),
    this.author = stringFormatting(author),
    this.pages = pages,
    this. read = read
}

// prototypes
Book.prototype.isRead = function() {
    this.read = true;
}

Book.prototype.notRead = function() {
    this.read = false;
}

function addBookToLibrary(book) {
    // validating form contents
    if(validateForm() == true) {
    
    const book = new Book(
        authorEl.value, 
        titleEl.value, 
        pagesEl.value, 
        readEl.checked,
        bookId
    );
    
    // incrementing the bookId
    bookId += 1;

    // pushing new Book to myLibrary array
    myLibrary.push(book);

    // store myLibrary in local storage
    storeData(myLibrary);

    // redraw the library cards
    drawLibraryCards();
    getCards();
        
    } else {
        console.log('validation faled');
    } 
}

function drawLibraryCards() {
    let output = "";
    let checked = "";

    myLibrary.forEach(function(card){
        // address the state of the checkbox
        if(card.read == true){
            checked = "checked";
        } else {
            checked = "";
        }

        // creating the HTML content for each card
        output +=`
        <div class="card" id="${card.id}">
            <span><button id="removeCard">X</button></span>
            <span class="book-title">${card.title}</span>
            <span class="book-author">By: ${card.author}</span>
            <span class="book-pages">Number of pages: ${card.pages}</span>
            <span class="book-read">Mark as Read:<input type="checkbox" name="markAsRead" ${checked} id="markAsRead"></span>
        </div>    
        `
    });
    // drawing to page
    libraryEl.innerHTML = output;  
}

function clearFormContents(){
    // reset the form to blank
    titleEl.value = '';
    authorEl.value = '';
    pagesEl.value = '';
    readEl.checked = false;
}

function validateForm(){
    // validating the form has been completely filled out
    if(titleEl.value == '') {
        alert('The Title must be filled out.');
        return false;
    } else if(authorEl.value == '') {
        alert('The Author must be filled out.');
        return false;
    } else if(pagesEl.value == '') {
        alert('The Number of Pages must be filled out.');
        return false;
    } else {
        return true;
    }
}

function stringFormatting(str) {
    //formatting the content for (mostly) proper grammar
    return str.toLowerCase()
    .split(' ')
    .map((str) => str.charAt(0).toUpperCase() + str.substring(1))
    .join(' ');
};

// setting the intro message based upon the contents of the library
if (myLibrary.length == 0){
    introH2El.innerHTML = "It looks like your library is empty, let's add some books!";
} else {
    introH2El.innerHTML = `Congratualtions, you have some ${myLibrary.length} book(s) in your collection!`;
}

// logic for 'add a book' button functionality
document.getElementById('addBook').addEventListener('click', () => {
    bodyEl.classList.add('blurBackground');
    newBookEl.style.display = 'flex';
});

// logic for if the 'Cancel' button is pressed on the add new bookk screen
document.getElementById('addNewBookCancel').addEventListener('click', () => {
    clearFormContents();
    newBookEl.style.display = 'none';
    bodyEl.classList.remove('blurBackground');
});

// listening for the click of the add New Book button
document.getElementById('addNewBook').addEventListener('click', function() { 
    addBookToLibrary();
    clearFormContents();
    newBookEl.style.display = 'none';
    bodyEl.classList.remove('blurBackground');
});

function updateCards(target){
    // if target type is button - do delete
    const isButton = target.nodeName === 'BUTTON';
    if (isButton){
        // assigning the variable index based upon the id of the element that was clicked
        let index = target.parentElement.parentElement.id - 1;
        
        // splicing the deleted item from the library array
        myLibrary.splice(index, 1);

        // updating stored data
        storeData(myLibrary);

        // redrawing the cards
        drawLibraryCards();

        // re-run the getCards so the future click events will work
        getCards();
    } 

    // if the click event is 'mark as read'
    const isCheckBox = target.nodeName =='INPUT';
    if (isCheckBox){
        // getting the current value of the checkbox
        let index = target.parentElement.parentElement.id -1;
        let currentCheckboxValue = myLibrary[index].read;

        if(currentCheckboxValue == true){
            // myLibrary[index].read = false;
            'book' + String(index).notRead;
        } else {
            // myLibrary[index].read = true;
            'book' + String(index).isRead;
        }

        //re-run getCards so the future click events will works
        getCards();

        // updated stored data
        storeData(myLibrary);
    }
}

function storeData(arr){
    // localStorage.setItem("names", JSON.stringify(names));
    localStorage.setItem('library', JSON.stringify(arr));
    console.log('data stored!');
}

function recallData(){
    // var storedNames = JSON.parse(localStorage.getItem("names"));
    myLibrary = JSON.parse(localStorage.getItem('library'));
    drawLibraryCards();
}

// function to recount the cards for future click events
function getCards() {
    const whichCard = document.querySelectorAll('.card');
    for (let i = 0; i < whichCard.length; i++){
        whichCard[i].addEventListener('click', function(e) {
            updateCards(e.target);
        })
    }
}

recallData();
getCards();