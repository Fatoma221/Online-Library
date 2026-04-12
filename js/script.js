
function initializeStorage() {
    if (!localStorage.getItem('books')) {
        const initialBooks = [
            { id: "101", name: "Clean Code", author: "Robert Martin", status: "Available", category: "Programming", description: "A handbook of agile software craftsmanship." },
            { id: "102", name: "Java Basics", author: "John Smith", status: "Available", category: "Programming", description: "Introduction to Java." },
            { id: "103", name: "Database Systems", author: "Elmasri", status: "Available", category: "Database", description: "Fundamentals of database design." }
        ];
        localStorage.setItem('books', JSON.stringify(initialBooks));
    }
}

window.onload = function() {
    initializeStorage();
    
    
    const urlParams = new URLSearchParams(window.location.search);
    const bookId = urlParams.get('id');
    const idField = document.getElementById('bookID');

    if (bookId && idField) {
        idField.value = bookId;
        const books = JSON.parse(localStorage.getItem('books'));
        const book = books.find(b => b.id === bookId);
        if (book) {
            document.getElementById('bookName').value = book.name;
            document.getElementById('author').value = book.author;
            document.getElementById('category').value = book.category;
            document.getElementById('description').value = book.description;
        }
    }

    
    displayBooksTable();
};


function displayBooksTable() {
    const tableBody = document.querySelector('#booksTable tbody');
    if (!tableBody) return;

    const books = JSON.parse(localStorage.getItem('books')) || [];
    tableBody.innerHTML = ''; 

    books.forEach(book => {
        const row = `
            <tr>
                <td>${book.id}</td>
                <td>${book.name}</td>
                <td>${book.author}</td>
                <td>${book.status}</td>
                <td>
                    <a href="Edit-Book.html?id=${book.id}" class="btn edit-btn">Edit</a>
                    <button class="btn delete-btn" onclick="deleteBookFromStorage('${book.id}')">Delete</button>
                </td>
            </tr>`;
        tableBody.innerHTML += row;
    });
}


function deleteBookFromStorage(id) {
    if (confirm("Are you sure you want to delete this book?")) {
        let books = JSON.parse(localStorage.getItem('books'));
        books = books.filter(b => b.id !== id);
        localStorage.setItem('books', JSON.stringify(books));
        displayBooksTable();
        alert("Book removed successfully from storage.");
    }
}


document.addEventListener('submit', function(e) {
    if (e.target.id === 'editBookForm') {
        e.preventDefault(); 

        const id = document.getElementById('bookID').value;
        const name = document.getElementById('bookName').value.trim();
        const author = document.getElementById('author').value.trim();
        const category = document.getElementById('category').value;
        const description = document.getElementById('description').value;

        
        if (name === "" || author === "") {
            alert("Mandatory fields missing!");
            return;
        }

        let books = JSON.parse(localStorage.getItem('books'));
        const index = books.findIndex(b => b.id === id);

        if (index !== -1) {
            books[index] = { ...books[index], name, author, category, description };
            localStorage.setItem('books', JSON.stringify(books));
            alert("Storage Updated: Book details saved successfully.");
            window.location.href = 'Books-Management.html'; 
        }
    }
});
