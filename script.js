// Get DOM
const addBookBtn = document.querySelector("#add-book-btn");
const removeBookBtn = document.querySelector("#remove-book-btn");
const inputTitle = document.querySelector("#input-title");
const inputAuthor = document.querySelector("#input-author");
const inputPages = document.querySelector("#input-pages");
const inputStatus = document.querySelector("#book-status");
const main = document.querySelector("main");

// Variables
let myLibrary = [];
let id = 1;

// Object Constructor
function Book(title, author, pages, status){    
    this.id = id++;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;    
}

// Add Event Listener
addBookBtn.addEventListener("click", addBookToMyLibray);


// Function Defined

function addBookToMyLibray(event){
    myLibrary.push(new Book(inputTitle.value, inputAuthor.value, inputPages.value, inputStatus.value))

    inputTitle.value = "";
    inputAuthor.value = "";
    inputPages.value = "0";   
    // inputProgressPage.value = "0";
    retrieveAllBooks();        

    event.preventDefault();
}

// retrieveAllBooks()

function retrieveAllBooks(){        
    main.innerHTML = "";
    // console.log(myLibrary)

    myLibrary.forEach(getBook => {
        main.innerHTML += 
        `
        <div class="card-list">
            <div class="card-title">
                <b>Title: </b>
                <span>${getBook.title}</span>
            </div>
            <div class="card-author">
                <b>Author: </b>
                <span>${getBook.author}</span>
            </div>
            <div class="card-total-pages">
                <b>Total Pages:</b>
                <span>${getBook.pages}</span>
            </div>
            <div class="card-status">
                <b>Status: </b>
                <span class="card-book-status">${getBook.status}</span>
            </div>
            <div class="modal-btns">
                <button type="button" class="remove-btn red-btn">
                    <label for="close-modal">
                        <span>Remove</span>
                    </label>            
                </button>   
            </div>
            <input type="hidden" value="${getBook.id}" class="input-id">
        </div>
        `;
    });
}

/* <select class="card-book-status">
    <option value="not-read">Not Read</option>
    <option value="in-progress">In Progress</option>
    <option value="finished">Finished</option>
</select> */