// Get DOM
const addBookBtn = document.querySelector("#add-book-btn");
const removeAllBookBtn = document.querySelector("#remove-book-btn");

const removeBookBtn = document.querySelector("#remove-book-btn");
const inputTitle = document.querySelector("#input-title");
const inputAuthor = document.querySelector("#input-author");
const inputPages = document.querySelector("#input-pages");
const inputStatus = document.querySelector("#book-status");
const inputCurrentPage = document.querySelector("#input-current-page");
const allRequiredInputs = document.querySelectorAll("input[required]");
const main = document.querySelector("main");

const closeModalInput = document.querySelector("#close-modal");
// Variables
let myLibrary = [];
let statusValues = ["-- Select Status --", "Not Read", "In Progress", "Finished"];
let id = 1;
let getLocalMyLibrary;
let retrieveLocalMyLibrary;
let statusColor
let currentPageValue

// LocalStorage;
// localStorage.setItem("myLocalLibrary", JSON.stringify(myLibrary));

// Object Constructor
function Book(title, author, pages, status, currentPage){    
    this.id = id++;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;    
    this.currentPage = currentPage;
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
    // get current page value
    currentPageValue = inputCurrentPage.value;     

    if(inputTitle.value.trim() != "" && inputAuthor.value.trim() != "" && inputPages.value.trim() != "" && inputPages.value > 0){
        closeModalInput.checked = true;        
        // Validate Current Page
        if(inputStatus.value == "Finished"){
            currentPageValue = inputPages.value

        }else if(inputStatus.value == "Not Read"){
            currentPageValue = 0;

        }else if(currentPageValue >= inputPages.value || currentPageValue < 0){
            // alert(currentPageValue + "- Compare to input pages -" + inputPages.value)
            currentPageValue = 0;            
        }else{
            // alert(currentPageValue)
            currentPageValue = Math.floor(currentPageValue);            
        }

        // Add to the array MyLibrary
        myLibrary.push(new Book(inputTitle.value, inputAuthor.value, inputPages.value, inputStatus.value, currentPageValue))
        // Put it in the Local Storage
        localStorage.setItem("myLocalLibrary", JSON.stringify(myLibrary));
        
        // Clear Inputs
        inputTitle.value = "";
        inputAuthor.value = "";
        inputPages.value = "";        
        inputCurrentPage.value = 1;
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
            <h2> No Data Available </h2>
            <p> It appears there are currently no books in your personal library. Start adding books now to effectively manage and grow your collection! </p>
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
        valueTitleHTML.textContent = getBook.title;
        valueTitleHTML.setAttribute("title", getBook.title);
        cardTitleHTML.append(labelTitleHTML,valueTitleHTML);

        const cardAuthorHTML = document.createElement("div");
        cardAuthorHTML.setAttribute("class", "card-author");
        const labelAuthorHTML = document.createElement("b"); //
        labelAuthorHTML.innerText = "Author: ";
        const valueAuthorHTML = document.createElement("span");
        valueAuthorHTML.textContent = getBook.author;
        valueAuthorHTML.setAttribute("title", getBook.author);
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
        
        cardStatusHTML.append(labelStatusHTML, valueStatusHTML);
        
        const currentPageHTML = document.createElement("div");
        currentPageHTML.setAttribute("class", "card-page-bookmark");
        const labelCurrentPageHTML = document.createElement("b");
        labelCurrentPageHTML.innerText = "Current Page: ";
        const valueCurrentPageHTML = document.createElement("span");
        valueCurrentPageHTML.textContent = getBook.currentPage
        valueCurrentPageHTML.setAttribute("class", `status-color ${statusColor}`)
        currentPageHTML.append(labelCurrentPageHTML, valueCurrentPageHTML);

        // Add Event Listener for change status
        valueStatusHTML.addEventListener("click", ()=>{
            changeBookStatus(cardStatusHTML, valueStatusHTML, bookPosition, valueCurrentPageHTML);
            // alert(bookPosition)
        })
        valueCurrentPageHTML.addEventListener("click", ()=>{
            changeCurrentPageHTML(currentPageHTML, valueCurrentPageHTML, bookPosition, valueStatusHTML);
        })


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
        cardListHTML.append(cardTitleHTML, cardAuthorHTML, cardTotalPagesHTML, cardStatusHTML, currentPageHTML,modalBtnsHTML);
       
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
function changeBookStatus(getContainer, getSelf, bookId, getCurrentPageHTML){
    const selectHTML = document.createElement("select");
    
    statusValues.forEach(optionTxt => {
        const option = document.createElement("option");
        option.value = optionTxt;
        option.textContent = optionTxt;
        selectHTML.append(option);
    });

    getContainer.replaceChild(selectHTML, getSelf);
    selectHTML.focus();
    selectHTML.addEventListener("change", function(){
        // get value
        const selectedValue = this.value; 
        // Get index position of the selected book
        const indexSelect = myLibrary.findIndex(itemId => itemId.id === bookId);          
        let tempCurrData = myLibrary[indexSelect].currentPage;
        let tempTotalPage = myLibrary[indexSelect].pages;
        let storeCurrData
        
        // Dynamic Current Page
        if(selectedValue == "Finished"){
            storeCurrData = tempTotalPage;
        }else if(selectedValue == "In Progress"){
            storeCurrData = tempCurrData;
        }else{
            storeCurrData = 0;
        }        
        getCurrentPageHTML.textContent = storeCurrData        
        
        // Update the Array    
        console.log("index: ", indexSelect);
        console.log(myLibrary[indexSelect]);
        myLibrary[indexSelect].status = selectedValue; // Update Status
        myLibrary[indexSelect].currentPage = storeCurrData;
        console.log(myLibrary[indexSelect]);


        // const newStatus = document.createElement("span"); // No need to create instead call the getSelf to avoid bug ' - RommJames
        getSelf.textContent = selectedValue;

        // Change Status Color
        switchStatusColor(selectedValue);        
        getSelf.setAttribute("class", `status-color ${statusColor}`)     
        getCurrentPageHTML.setAttribute("class", `status-color ${statusColor}`) 
        

        getSelf.addEventListener('click', function() {
            // Repeat the same process when span is clicked again
            getContainer.replaceChild(selectHTML, getSelf);
            // alert("hi")
        });

        getContainer.replaceChild(getSelf, selectHTML);
        
        
        // Update Local Storage
        localStorage.setItem("myLocalLibrary", JSON.stringify(myLibrary));
        // console.log(myLibrary);
    })
}

// change current page for bookmark
function changeCurrentPageHTML(getContainer, getSelf, bookId, getStatusHTML){
    const inputChangeCurrPage = document.createElement("input");
    inputChangeCurrPage.setAttribute("type", "number");
    inputChangeCurrPage.value = getSelf.textContent;
    inputChangeCurrPage.style.width = "100%";

    getContainer.replaceChild(inputChangeCurrPage, getSelf);

    inputChangeCurrPage.focus();

    inputChangeCurrPage.addEventListener("blur", (e)=>{
        const inputValue = e.target.value

        // find position of the selected item
        const indexSelect = myLibrary.findIndex(itemId => itemId.id === bookId);          
        let tempCurrData = myLibrary[indexSelect].currentPage;
        let tempTotalPage = myLibrary[indexSelect].pages;
        let storeCurrData
        let updateStatusData        
        console.log(`"inputValueData: ${inputValue}" > "TempTotalPage: ${tempTotalPage}"`);
        // Validation
        if(+inputValue < 0){
            storeCurrData = 0
        }else if(+inputValue > +tempTotalPage){            
            // alert(`"inputValueData: ${inputValue}" > "TempTotalPage: ${tempTotalPage}"`)
            storeCurrData = 0
        }else{
            storeCurrData = inputValue;
        }

        // Dynamic Change of Status
        if(+tempTotalPage == +inputValue){
            getStatusHTML.textContent = "Finished";
            updateStatusData = "Finished"
        }else if(+inputValue >= 1 && +inputValue <= +tempTotalPage){
            getStatusHTML.textContent = "In Progress";
            updateStatusData = "In Progress"
        }else{
            getStatusHTML.textContent = "Not Read";
            updateStatusData = "Not Read"
        }

        getStatusHTML.textContent = updateStatusData;
        myLibrary[indexSelect].status = updateStatusData;
        myLibrary[indexSelect].currentPage = storeCurrData;

        // Create new element for dynamic change
        // const newCurrPage = document.createElement("span"); // same with the status change evemt
        getSelf.textContent = storeCurrData;

        // Change Status Color
        switchStatusColor(updateStatusData);        
        getSelf.setAttribute("class", `status-color ${statusColor}`)     
        getStatusHTML.setAttribute("class", `status-color ${statusColor}`) 
        

        getSelf.addEventListener('click', function() {
            // Repeat the same process when span is clicked again
            getContainer.replaceChild(inputChangeCurrPage, getSelf);
            inputChangeCurrPage.focus();
        });

        getContainer.replaceChild(getSelf, inputChangeCurrPage);

        
        // Update Local Storage
        localStorage.setItem("myLocalLibrary", JSON.stringify(myLibrary));

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
//      
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