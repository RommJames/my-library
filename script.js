// Get DOM
const addBookBtn = document.querySelector("#add-book-btn");
const removeAllBookBtn = document.querySelector("#remove-book-btn");

const removeBookBtn = document.querySelector("#remove-book-btn");
const inputTitle = document.querySelector("#input-title");
const inputAuthor = document.querySelector("#input-author");
const inputPages = document.querySelector("#input-pages");
const inputStatus = document.querySelector("#book-status");
const allRequiredInputs = document.querySelectorAll("input[required]");
const main = document.querySelector("main");

const closeModalInput = document.querySelector("#close-modal");

// Variables
let myLibrary = [];
let statusValues = ["Not Read", "In Progress", "Finished"];
let id = 1;
let getLocalMyLibrary;
let retrieveLocalMyLibrary;
let statusColor

// LocalStorage;
// localStorage.setItem("myLocalLibrary", JSON.stringify(myLibrary));

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
removeAllBookBtn.addEventListener("click", deleteAllBook);

// onload
window.onload = function(){
    retrieveAllBooks()
    getLocalMyLibrary = localStorage.getItem('myLocalLibrary');
    retrieveLocalMyLibrary = JSON.parse(getLocalMyLibrary);
    myLibrary = retrieveLocalMyLibrary;
    noDataAvailable()
    console.log(myLibrary);
}


// Function Defined

// Add Book to Libray Array
function addBookToMyLibray(event){        
    // inputProgressPage.value = "0";   
     
    if(inputTitle.value.trim() != "" && inputAuthor.value.trim() != "" && inputPages.value.trim() != "" && inputPages.value > 0){
        closeModalInput.checked = true;
        // Add to the array MyLibrary
        myLibrary.push(new Book(inputTitle.value, inputAuthor.value, inputPages.value, inputStatus.value))
        // Put it in the Local Storage
        localStorage.setItem("myLocalLibrary", JSON.stringify(myLibrary));

        // Clear Inputs
        inputTitle.value = "";
        inputAuthor.value = "";
        inputPages.value = "";        
        allRequiredInputs.forEach((input)=>{
            input.classList.remove("invalid-input");
        })   
        
        retrieveAllBooks();            
    }else{
        
        formValidation();
    }
    
    event.preventDefault();
}

// No Library

function noDataAvailable(){
    if(retrieveLocalMyLibrary == null || retrieveLocalMyLibrary == ""){
        main.innerHTML = 
        `
        <div class="no-data">
            <h1> No Data Available </h1>
            <p> Add some book to your personal library! </p>
        </div>
        `;
        main.style.display = "block";        
    }else{
        main.style.display = "Grid";
    }
}
// retrieveAllBooks()

function retrieveAllBooks(){        
    main.innerHTML = "";    
    getLocalMyLibrary = localStorage.getItem('myLocalLibrary');
    retrieveLocalMyLibrary = JSON.parse(getLocalMyLibrary);
    noDataAvailable();
    retrieveLocalMyLibrary.forEach(getBook => {
        // Get index position of the book
        let bookPosition = getBook.id;
        // let bookPosition = getBook;
        console.log(bookPosition);
        console.log(getBook);
        console.log(myLibrary);
        
        const cardListHTML = document.createElement("div");
        cardListHTML.setAttribute("class", "card-list");
        
        const cardTitleHTML = document.createElement("div");
        cardTitleHTML.setAttribute("class", "card-title");
        const labelTitleHTML = document.createElement("b"); //
        labelTitleHTML.innerText = "Title: ";
        const valueTitleHTML = document.createElement("span");
        valueTitleHTML.textContent = getBook.title
        cardTitleHTML.append(labelTitleHTML,valueTitleHTML);

        const cardAuthorHTML = document.createElement("div");
        cardAuthorHTML.setAttribute("class", "card-author");
        const labelAuthorHTML = document.createElement("b"); //
        labelAuthorHTML.innerText = "Author: ";
        const valueAuthorHTML = document.createElement("span");
        valueAuthorHTML.textContent = getBook.author
        cardAuthorHTML.append(labelAuthorHTML,valueAuthorHTML);

        const cardTotalPagesHTML = document.createElement("div");
        cardTotalPagesHTML.setAttribute("class", "card-total-pages");
        const labelTotalPagesHTML = document.createElement("b"); //
        labelTotalPagesHTML.innerText = "Total Pages: ";
        const valueTotalPagesHTML = document.createElement("span");
        valueTotalPagesHTML.textContent = getBook.pages
        cardTotalPagesHTML.append(labelTotalPagesHTML, valueTotalPagesHTML);

        const cardStatusHTML = document.createElement("div");
        cardStatusHTML.setAttribute("class", "card-status");
        const labelStatusHTML = document.createElement("b"); //
        labelStatusHTML.innerText = "Status: ";
        const valueStatusHTML = document.createElement("span");
        valueStatusHTML.textContent = getBook.status;                   
        switchStatusColor(valueStatusHTML.textContent);
        valueStatusHTML.setAttribute("class", `status-color ${statusColor}`)     
        valueStatusHTML.addEventListener("click", ()=>{
            changeBookStatus(cardStatusHTML, valueStatusHTML, bookPosition);
            // alert(bookPosition)
        })
        cardStatusHTML.append(labelStatusHTML, valueStatusHTML);

        const modalBtnsHTML = document.createElement("div");
        modalBtnsHTML.setAttribute("class", "modal-btns");
        const removeBtnHTML = document.createElement("button");
        removeBtnHTML.setAttribute("type", "button");
        removeBtnHTML.setAttribute("class","remove-btn red-btn");
        removeBtnHTML.innerHTML = 
        `
            <label for="close-modal">
                <span>Remove</span>
            </label>   
        `
        removeBtnHTML.addEventListener("click", ()=> deleteBook(bookPosition, cardListHTML));
        modalBtnsHTML.appendChild(removeBtnHTML);

        main.append(cardListHTML);
        cardListHTML.append(cardTitleHTML, cardAuthorHTML, cardTotalPagesHTML, cardStatusHTML, modalBtnsHTML);
       
    });
}

// Delete Functions
function deleteBook(bookId, cardList){    
    // get index of the specific book id
    const index = myLibrary.findIndex(itemId => itemId.id === bookId);
    // remove the book
    myLibrary.splice(index,1);    
    
    // update the local storage
    localStorage.setItem("myLocalLibrary", JSON.stringify(myLibrary));

    //remove in HTML
    cardList.remove();

    // Check if data is available
    noDataAvailable()
    retrieveAllBooks()
}

function deleteAllBook(){
    main.innerHTML = '';
    myLibrary.length = 0;
    localStorage.removeItem("myLocalLibrary");

    // Check if data is available
    noDataAvailable()
    retrieveAllBooks()
}

// Validation
function formValidation(){    
    allRequiredInputs.forEach((input)=>{
        if(input.getAttribute("type") != "number"){

            if(input.value.trim() == ""){            
                input.classList.add("invalid-input");        
            }else{
                input.classList.remove("invalid-input");                
            }   

        }else{
            if(input.value.trim() == "" || input.value <= 0){            
                input.classList.add("invalid-input");        
            }else{
                input.classList.remove("invalid-input");                
            }   
        }             

    })    

}

// Change Book Status
function changeBookStatus(getContainer, getSelf, bookId){
    const selectHTML = document.createElement("select");
    
    statusValues.forEach(optionTxt => {
        const option = document.createElement("option");
        option.value = optionTxt;
        option.textContent = optionTxt;
        selectHTML.append(option);
    });

    getContainer.replaceChild(selectHTML, getSelf);
    
    selectHTML.addEventListener("change", function(){
        const selectedValue = this.value;        
        // alert(selectedValue);
        // Update the Array    
        const indexSelect = myLibrary.findIndex(itemId => itemId.id === bookId);    
        console.log("index: ", indexSelect);
        console.log(myLibrary[indexSelect]);
        myLibrary[indexSelect].status = selectedValue;
        console.log(myLibrary[indexSelect]);
        // Update Local Storage
        localStorage.setItem("myLocalLibrary", JSON.stringify(myLibrary));
        // console.log(myLibrary);

        const newStatus = document.createElement("span");
        newStatus.textContent = selectedValue;
        switchStatusColor(selectedValue);
        newStatus.setAttribute("class", `status-color ${statusColor}`)     

        newStatus.addEventListener('click', function() {
            // Repeat the same process when span is clicked again
            getContainer.replaceChild(selectHTML, newStatus);
            // alert("hi")
        });

        getContainer.replaceChild(newStatus, selectHTML);
        
    })
}

// Dynamic Status Color
function switchStatusColor(valueStatusHTML){
    switch(valueStatusHTML){
        case "Not Read":
            statusColor = "status-not-read"
            break;
        case "In Progress":
            statusColor = "status-progress"
            break;
        case "Finished":
            statusColor = "status-finished"
            break;
        default:
            statusColor = "status-not-read"
            break;                
    }  
}
// Note:
// Use change event listener to prororrtype current pages

// `
// <div class="card-list">
//     <div class="card-title">
//         <b>Title: </b>
//         <span>${getBook.title}</span>
//     </div>
//     <div class="card-author">
//         <b>Author: </b>
//         <span>${getBook.author}</span>
//     </div>
//     <div class="card-total-pages">
//         <b>Total Pages:</b>
//         <span>${getBook.pages}</span>
//     </div>
//     <div class="card-status">
//         <b>Status: </b>
//         <span class="card-book-status">${getBook.status}</span>
//     </div>
//     <div class="modal-btns">
//         <button type="button" class="remove-btn red-btn">
//             <label for="close-modal">
//                 <span>Remove</span>
//             </label>            
//         </button>   
//     </div>
//     <input type="hidden" value="${getBook.id}" class="input-id">
// </div>
// `;

/* <select class="card-book-status">
    <option value="not-read">Not Read</option>
    <option value="in-progress">In Progress</option>
    <option value="finished">Finished</option>
</select> */