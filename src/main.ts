

class Book {
    id: number;
    name: string;
    author: string;
    edition: string;

    constructor(id, name, author, edition) {
        this.id = id;
        this.name = name;
        this.author = author;
        this.edition = edition;
    }
}

window.localStorage.setItem("bookList", JSON.stringify([]))
let searchResult: Book[] = [];
let bookList: Book[] = [];
var regExpr: RegExp =  /^-?\d*\.?\d*$/;

function addBooks(): void {
    let bookId: number = parseInt((<HTMLInputElement>document.getElementById("bookId")).value);
    let name: string = (<HTMLInputElement>document.getElementById("name")).value;
    let author: string = (<HTMLInputElement>document.getElementById("author")).value;
    let edition: string = (<HTMLInputElement>document.getElementById("edition")).value;

    if (!regExpr.test((<HTMLInputElement>document.getElementById("bookId")).value)) {
        alert("Id for a book should be a number.");
    } else if (this.bookList.filter(book => {return (book.id == bookId)}).length > 0) {
        alert("Book Id cannot be duplicated.");
    } else if (bookId.toString() == "" || name == "" || author == "" || edition == "") {
        alert("All the fields are required to fill.");
    } else {
        this.bookList = JSON.parse(localStorage.getItem("bookList"));
        bookList.push(new Book(bookId, name, author, edition))
        window.localStorage.setItem("bookList", JSON.stringify(bookList))
        populateBookList();

        (<HTMLInputElement>document.getElementById("bookId")).value = "";
        (<HTMLInputElement>document.getElementById("name")).value = "";
        (<HTMLInputElement>document.getElementById("author")).value = "";
        (<HTMLInputElement>document.getElementById("edition")).value = "";
    }


}

function deleteRecords(record: number): void {
    this.bookList = JSON.parse(localStorage.getItem("bookList"));

    bookList.splice(record, 1);

    localStorage.setItem("bookList", JSON.stringify(bookList));
    populateBookList();
}

function searchBooks(): void {
    document.getElementById("searchResultTable").innerHTML = "";
    this.searchResult = [];
    document.getElementById("bookListTable").hidden = true;
    document.getElementById("searchResultTable").hidden = false;

    let searchTxt: string = (<HTMLInputElement>document.getElementById("search")).value;
    let searchFields: HTMLSelectElement = (document.getElementById("searchFields")) as HTMLSelectElement;
    let selectedVal: number = searchFields.selectedIndex;
    let selectedOpt: HTMLOptionElement = searchFields.options[selectedVal];

    for (let i: number = 0; i < this.bookList.length; i++) {
        if ((selectedOpt.value == "nameSearch" && (bookList[i].name).match(searchTxt)) ||
            selectedOpt.value == "authorSearch" && (bookList[i].author).match(searchTxt) ||
            selectedOpt.value == "editionSearch" && (bookList[i].edition).match(searchTxt) ||
            selectedOpt.value == "idSearch" && (bookList[i].id.toString()).match(searchTxt)) {
            searchResult.push(bookList[i]);
        }
    }
    console.log(searchResult)

    let searchResultTable: HTMLTableElement = <HTMLTableElement>document.getElementById("searchResultTable");
    generateTable(searchResult, searchResultTable);
}

function clearSearch() {
    this.searchResult = [];
    (<HTMLInputElement>document.getElementById("search")).value = "";
    document.getElementById("searchResultTable").hidden = true;
    document.getElementById("bookListTable").hidden = false;

}

function updateBook() {
    const bookId: number = parseInt((<HTMLInputElement>document.getElementById("bookId")).value);
    const name: string = (<HTMLInputElement>document.getElementById("name")).value;
    const author: string = (<HTMLInputElement>document.getElementById("author")).value;
    const edition: string = (<HTMLInputElement>document.getElementById("edition")).value;

    this.bookList = JSON.parse(localStorage.getItem("bookList"));
    let updateRecordIndex: number = parseInt(localStorage.getItem("updateRecordIndex"));
    bookList[updateRecordIndex].name = name;
    bookList[updateRecordIndex].author = author;
    bookList[updateRecordIndex].edition = edition;

    if (!regExpr.test(bookId.toString())) {
        alert("Id for a book should be a number.");
    } else if (bookList[updateRecordIndex].id != bookId) {
        alert("You can't update id of a book.");
    } else {
        localStorage.setItem("bookList", JSON.stringify(bookList));
        populateBookList();
        document.getElementById("addBooks").hidden = false;
        document.getElementById("addBtn").hidden = false;
        document.getElementById("updateBooks").hidden = true;
        document.getElementById("updateBtn").hidden = true;

        (<HTMLInputElement>document.getElementById("bookId")).value = "";
        (<HTMLInputElement>document.getElementById("name")).value = "";
        (<HTMLInputElement>document.getElementById("author")).value = "";
        (<HTMLInputElement>document.getElementById("edition")).value = "";
    }

    (document.getElementById('bookId') as HTMLInputElement).disabled = false;

}

function updateRecords(record: number) : void {

    document.getElementById("addBooks").hidden = true;
    document.getElementById("addBtn").hidden = true;
    document.getElementById("updateBooks").hidden = false;
    document.getElementById("updateBtn").hidden = false;

    (document.getElementById('bookId') as HTMLInputElement).disabled = true;
    localStorage.setItem("updateRecordIndex", record.toString());
    this.bookList = JSON.parse(localStorage.getItem("bookList"));

    (<HTMLInputElement>document.getElementById("bookId")).value = bookList[record].id.toString();
    (<HTMLInputElement>document.getElementById("name")).value = bookList[record].name;
    (<HTMLInputElement>document.getElementById("author")).value = bookList[record].author;
    (<HTMLInputElement>document.getElementById("edition")).value = bookList[record].edition;

}

function populateBookList() : void {
    document.getElementById("bookListTable").innerHTML = "";
    let booksArray: Book[] = [];

    if (JSON.parse(localStorage.getItem("bookList")) != null || JSON.parse(localStorage.getItem("bookList")) != undefined) {
        booksArray = JSON.parse(localStorage.getItem("bookList"));
    };
    let bookTable: HTMLTableElement = <HTMLTableElement>document.getElementById("bookListTable");
    generateTable(booksArray, bookTable);
}

function generateTable(booksArray: Book[], bookTable: HTMLTableElement): void {

    let thead: HTMLTableSectionElement = bookTable.createTHead();

    let hrow: HTMLTableRowElement;
    hrow = <HTMLTableRowElement> thead.insertRow(0);

    let cell0: HTMLTableCellElement = hrow.insertCell(0);
    cell0.innerHTML = "ID";

    let cell1: HTMLTableCellElement = hrow.insertCell(1);
    cell1.innerHTML = "Name";

    let cell2: HTMLTableCellElement = hrow.insertCell(2);
    cell2.innerHTML = "Author";

    let cell3: HTMLTableCellElement = hrow.insertCell(3);
    cell3.innerHTML = "Edition";

    let cell4: HTMLTableCellElement = hrow.insertCell(4);
    cell4.innerHTML = "Update";

    let cell5: HTMLTableCellElement = hrow.insertCell(5);
    cell5.innerHTML = "Delete";

    if (booksArray.length > 0) {
        for (let i: number = 0; i<booksArray.length; i++) {
            let id: number = booksArray[i].id;
            let bookName: string = booksArray[i].name;
            let author: string = booksArray[i].author;
            let edition: string = booksArray[i].edition;


            var dRow: HTMLTableRowElement = bookTable.insertRow(i+1);
            cell0 = dRow.insertCell(0);
            cell1 = dRow.insertCell(1);
            cell2 = dRow.insertCell(2);
            cell3 = dRow.insertCell(3);
            cell4 = dRow.insertCell(4);
            cell5 = dRow.insertCell(5);

            let updateBtn: HTMLElement = document.createElement('deleteBtn'+(i+1));
            updateBtn.innerText = 'Update';
            updateBtn.onclick = (function(i: number) {return function() : void {updateRecords(i);}})(i);

            let deleteBtn: HTMLElement = document.createElement('deleteBtn'+(i+1));
            deleteBtn.innerText = 'Delete';
            deleteBtn.onclick = (function(i: number) {return function() : void {deleteRecords(i);}})(i);

            cell0.innerHTML = id.toString();
            cell1.innerHTML = bookName;
            cell2.innerHTML = author;
            cell3.innerHTML = edition;
            cell4.appendChild(updateBtn);
            cell5.appendChild(deleteBtn);
        }
    } else {
        dRow = bookTable.insertRow(1);
        dRow.innerText = "No Data";
    }
}