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
function addBooks() {
    var bookId = parseInt(document.getElementById("bookId").value);
    var name = document.getElementById("name").value;
    var author = document.getElementById("author").value;
    var edition = document.getElementById("edition").value;
    var bookList = JSON.parse(localStorage.getItem("bookList"));
    bookList.push(new Book(bookId, name, author, edition));
    window.localStorage.setItem("bookList", JSON.stringify(bookList));
    populateBookList();
    document.getElementById("bookId").value = "";
    document.getElementById("name").value = "";
    document.getElementById("author").value = "";
    document.getElementById("edition").value = "";
}
function deleteRecords(record) {
    var bookList = JSON.parse(localStorage.getItem("bookList"));
    console.log('deleted ', bookList[record]);
    bookList.splice(record, 1);
    localStorage.setItem("bookList", JSON.stringify(bookList));
    populateBookList();
}
function updateBook() {
    var bookId = parseInt(document.getElementById("bookId").value);
    var name = document.getElementById("name").value;
    var author = document.getElementById("author").value;
    var edition = document.getElementById("edition").value;
    var bookList = JSON.parse(localStorage.getItem("bookList"));
    var updateRecordIndex = parseInt(localStorage.getItem("updateRecordIndex"));
    bookList[updateRecordIndex].id = bookId;
    bookList[updateRecordIndex].name = name;
    bookList[updateRecordIndex].author = author;
    bookList[updateRecordIndex].edition = edition;
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
function updateRecords(record) {
    document.getElementById("addBooks").hidden = true;
    document.getElementById("addBtn").hidden = true;
    document.getElementById("updateBooks").hidden = false;
    document.getElementById("updateBtn").hidden = false;
    localStorage.setItem("updateRecordIndex", record.toString());
    var bookList = JSON.parse(localStorage.getItem("bookList"));
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
    console.log(typeof booksArray);
    var bookTable = document.getElementById("bookListTable");
    var tbody = bookTable.createTBody();
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
            console.log("llll", booksArray);
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
        // @ts-ignore
        dRow = document.getElementById("bookListTable").insertRow(1);
        dRow.innerText = "No Data";
    }
}
