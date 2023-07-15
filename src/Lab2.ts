

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
function addBooks(): void {
    var bookId = parseInt((<HTMLInputElement>document.getElementById("bookId")).value);
    var name = (<HTMLInputElement>document.getElementById("name")).value;
    var author = (<HTMLInputElement>document.getElementById("author")).value;
    var edition = (<HTMLInputElement>document.getElementById("edition")).value;

    let bookList: Book[] = JSON.parse(localStorage.getItem("bookList"));
    bookList.push(new Book(bookId, name, author, edition))
    window.localStorage.setItem("bookList", JSON.stringify(bookList))
    populateBookList();

    (<HTMLInputElement>document.getElementById("bookId")).value = "";
    (<HTMLInputElement>document.getElementById("name")).value = "";
    (<HTMLInputElement>document.getElementById("author")).value = "";
    (<HTMLInputElement>document.getElementById("edition")).value = "";


}

function deleteRecords(record: number): void {
    let bookList: Book[] = JSON.parse(localStorage.getItem("bookList"));
    console.log('deleted ', bookList[record])
    bookList.splice(record, 1);

    localStorage.setItem("bookList", JSON.stringify(bookList));
    populateBookList();
}

function updateBook() {
    var bookId = parseInt((<HTMLInputElement>document.getElementById("bookId")).value);
    var name = (<HTMLInputElement>document.getElementById("name")).value;
    var author = (<HTMLInputElement>document.getElementById("author")).value;
    var edition = (<HTMLInputElement>document.getElementById("edition")).value;

    let bookList: Book[] = JSON.parse(localStorage.getItem("bookList"));
    let updateRecordIndex: number = parseInt(localStorage.getItem("updateRecordIndex"));
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

    (<HTMLInputElement>document.getElementById("bookId")).value = "";
    (<HTMLInputElement>document.getElementById("name")).value = "";
    (<HTMLInputElement>document.getElementById("author")).value = "";
    (<HTMLInputElement>document.getElementById("edition")).value = "";
}
function updateRecords(record: number) : void {
    document.getElementById("addBooks").hidden = true;
    document.getElementById("addBtn").hidden = true;
    document.getElementById("updateBooks").hidden = false;
    document.getElementById("updateBtn").hidden = false;

    localStorage.setItem("updateRecordIndex", record.toString());
    let bookList: Book[] = JSON.parse(localStorage.getItem("bookList"));

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
    console.log(typeof booksArray);

    let bookTable: HTMLTableElement = <HTMLTableElement>document.getElementById("bookListTable");
    let tbody: HTMLTableSectionElement = bookTable.createTBody();
    let thead: HTMLTableSectionElement = bookTable.createTHead();



    var hrow: HTMLTableRowElement;
    hrow = <HTMLTableRowElement> thead.insertRow(0);
    var cell0: HTMLTableCellElement = hrow.insertCell(0);
    cell0.innerHTML = "ID";

    var cell1: HTMLTableCellElement = hrow.insertCell(1);
    cell1.innerHTML = "Name";

    var cell2: HTMLTableCellElement = hrow.insertCell(2);
    cell2.innerHTML = "Author";

    var cell3: HTMLTableCellElement = hrow.insertCell(3);
    cell3.innerHTML = "Edition";

    var cell4: HTMLTableCellElement = hrow.insertCell(4);
    cell4.innerHTML = "Update";

    var cell5: HTMLTableCellElement = hrow.insertCell(5);
    cell5.innerHTML = "Delete";

    if (booksArray.length > 0) {
        for (let i: number = 0; i<booksArray.length; i++) {
            let id: number = booksArray[i].id;
            let bookName: string = booksArray[i].name;
            let author = booksArray[i].author;
            let edition = booksArray[i].edition;

            console.log("llll",booksArray)
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
        // @ts-ignore
        dRow = document.getElementById("bookListTable").insertRow(1);
        dRow.innerText = "No Data";
    }


}