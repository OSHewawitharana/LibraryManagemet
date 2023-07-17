var Book = /** @class */ (function () {
    function Book(id, name, author, edition) {
        this.id = id;
        this.name = name;
        this.author = author;
        this.edition = edition;
    }
    return Book;
}());
window.localStorage.setItem("bookList", JSON.stringify([]));
var searchResult = [];
var bookList = [];
var regExpr = /^-?\d*\.?\d*$/;
function addBooks() {
    var bookId = parseInt(document.getElementById("bookId").value);
    var name = document.getElementById("name").value;
    var author = document.getElementById("author").value;
    var edition = document.getElementById("edition").value;
    if (!regExpr.test(document.getElementById("bookId").value)) {
        alert("Id for a book should be a number.");
    }
    else if (this.bookList.filter(function (book) { return (book.id == bookId); }).length > 0) {
        alert("Book Id cannot be duplicated..");
    }
    else if (bookId.toString() != "" || name != "" || author != "" || edition != "") {
        alert("All the fields are required.");
    }
    else {
        this.bookList = JSON.parse(localStorage.getItem("bookList"));
        bookList.push(new Book(bookId, name, author, edition));
        window.localStorage.setItem("bookList", JSON.stringify(bookList));
        populateBookList();
        document.getElementById("bookId").value = "";
        document.getElementById("name").value = "";
        document.getElementById("author").value = "";
        document.getElementById("edition").value = "";
    }
}
function deleteRecords(record) {
    this.bookList = JSON.parse(localStorage.getItem("bookList"));
    bookList.splice(record, 1);
    localStorage.setItem("bookList", JSON.stringify(bookList));
    populateBookList();
}
function searchBooks() {
    document.getElementById("searchResultTable").innerHTML = "";
    this.searchResult = [];
    document.getElementById("bookListTable").hidden = true;
    document.getElementById("searchResultTable").hidden = false;
    var searchTxt = document.getElementById("search").value;
    for (var i = 0; i < this.bookList.length; i++) {
        if ((bookList[i].name).match(searchTxt)) {
            searchResult.push(bookList[i]);
        }
    }
    console.log(searchResult);
    var searchResultTable = document.getElementById("searchResultTable");
    generateTable(searchResult, searchResultTable);
}
function clearSearch() {
    this.searchResult = [];
    document.getElementById("search").value = "";
    document.getElementById("searchResultTable").hidden = true;
    document.getElementById("bookListTable").hidden = false;
}
function updateBook() {
    var bookId = parseInt(document.getElementById("bookId").value);
    var name = document.getElementById("name").value;
    var author = document.getElementById("author").value;
    var edition = document.getElementById("edition").value;
    this.bookList = JSON.parse(localStorage.getItem("bookList"));
    var updateRecordIndex = parseInt(localStorage.getItem("updateRecordIndex"));
    bookList[updateRecordIndex].name = name;
    bookList[updateRecordIndex].author = author;
    bookList[updateRecordIndex].edition = edition;
    if (!regExpr.test(bookId.toString())) {
        alert("Id for a book should be a number.");
    }
    else if (bookList[updateRecordIndex].id != bookId) {
        alert("You can't update id of a book.");
    }
    else {
        localStorage.setItem("bookList", JSON.stringify(bookList));
        populateBookList();
        document.getElementById("addBooks").hidden = false;
        document.getElementById("addBtn").hidden = false;
        document.getElementById("updateBooks").hidden = true;
        document.getElementById("updateBtn").hidden = true;
        document.getElementById("bookId").value = "";
        document.getElementById("name").value = "";
        document.getElementById("author").value = "";
        document.getElementById("edition").value = "";
    }
    document.getElementById('bookId').disabled = false;
}
function updateRecords(record) {
    document.getElementById("addBooks").hidden = true;
    document.getElementById("addBtn").hidden = true;
    document.getElementById("updateBooks").hidden = false;
    document.getElementById("updateBtn").hidden = false;
    document.getElementById('bookId').disabled = true;
    localStorage.setItem("updateRecordIndex", record.toString());
    this.bookList = JSON.parse(localStorage.getItem("bookList"));
    document.getElementById("bookId").value = bookList[record].id.toString();
    document.getElementById("name").value = bookList[record].name;
    document.getElementById("author").value = bookList[record].author;
    document.getElementById("edition").value = bookList[record].edition;
}
function populateBookList() {
    document.getElementById("bookListTable").innerHTML = "";
    var booksArray = [];
    if (JSON.parse(localStorage.getItem("bookList")) != null || JSON.parse(localStorage.getItem("bookList")) != undefined) {
        booksArray = JSON.parse(localStorage.getItem("bookList"));
    }
    ;
    var bookTable = document.getElementById("bookListTable");
    generateTable(booksArray, bookTable);
}
function generateTable(booksArray, bookTable) {
    var thead = bookTable.createTHead();
    var hrow;
    hrow = thead.insertRow(0);
    var cell0 = hrow.insertCell(0);
    cell0.innerHTML = "ID";
    var cell1 = hrow.insertCell(1);
    cell1.innerHTML = "Name";
    var cell2 = hrow.insertCell(2);
    cell2.innerHTML = "Author";
    var cell3 = hrow.insertCell(3);
    cell3.innerHTML = "Edition";
    var cell4 = hrow.insertCell(4);
    cell4.innerHTML = "Update";
    var cell5 = hrow.insertCell(5);
    cell5.innerHTML = "Delete";
    if (booksArray.length > 0) {
        for (var i = 0; i < booksArray.length; i++) {
            var id = booksArray[i].id;
            var bookName = booksArray[i].name;
            var author = booksArray[i].author;
            var edition = booksArray[i].edition;
            var dRow = bookTable.insertRow(i + 1);
            cell0 = dRow.insertCell(0);
            cell1 = dRow.insertCell(1);
            cell2 = dRow.insertCell(2);
            cell3 = dRow.insertCell(3);
            cell4 = dRow.insertCell(4);
            cell5 = dRow.insertCell(5);
            var updateBtn = document.createElement('deleteBtn' + (i + 1));
            updateBtn.innerText = 'Update';
            updateBtn.onclick = (function (i) { return function () { updateRecords(i); }; })(i);
            var deleteBtn = document.createElement('deleteBtn' + (i + 1));
            deleteBtn.innerText = 'Delete';
            deleteBtn.onclick = (function (i) { return function () { deleteRecords(i); }; })(i);
            cell0.innerHTML = id.toString();
            cell1.innerHTML = bookName;
            cell2.innerHTML = author;
            cell3.innerHTML = edition;
            cell4.appendChild(updateBtn);
            cell5.appendChild(deleteBtn);
        }
    }
    else {
        dRow = bookTable.insertRow(1);
        dRow.innerText = "No Data";
    }
}
