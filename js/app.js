// show errors
const toggleError = (isShow, message = '') => {
  document.getElementById("alert-wrapper").style.display = isShow;
  document.getElementById("error-message").innerText = message;
  document.getElementById("books-list").textContent = "";
  document.getElementById("result-info").style.display = "none"
}
// loader when load api
const toggleLoader = (isLoad) => {
  document.getElementById("loader-wrapper").style.display = isLoad;
}
// get the search key event handeler
document.getElementById("search-btn").addEventListener("click", () => {
  const searchField = document.getElementById("search-field");
  const searchKey = searchField.value;
  if (searchKey === "" || searchKey === " ") {
    toggleError("block", "Something want wrong. Search key cannot be empty!!!");
  } else {
    toggleError("none");
    loadBooks(searchKey);
    document.getElementById("result-info").style.display = "initial"
  }
  searchField.value = "";
});

// api call
const loadBooks = (key) => {
  try {
    // loader show
    toggleLoader("flex");
    // load searched result
    const url = `https://openlibrary.org/search.json?q=${key}`;
    fetch(url)
      .then(response => response.json())
      .then(books => displayBooks(books.docs, key));
  } catch (error) {
    toggleError("block", error.message);
  }
}
// set default results
loadBooks("123456");

// show results by searching
const displayBooks = (books, key) => {
  let countResult = 0;
  const container = document.getElementById("books-list");
  container.textContent = '';

  books.forEach(book => {
    const newColumn = document.createElement("div");
    newColumn.classList.add("col-lg-4", "col-md-6");
    newColumn.innerHTML = `
      <div class="card h-100">
      <img src="https://covers.openlibrary.org/b/id/${book?.cover_i ? book.cover_i : "7322602"}-M.jpg" class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title"><strong>Title:</strong> ${book?.title}</h5>
        <p class="card-text mb-1"><strong>Author Name:</strong> ${book?.author_name ? book.author_name : 'Unknown'}</p>
        <p class="card-text mb-1"><strong>First Published:</strong> ${book?.first_publish_year ? book.first_publish_year : 'Unknown'}</p>
        <p class="card-text mb-1"><strong>Published Date:</strong> ${book?.publish_date ? book.publish_date[0] : 'Unknown'}</p>
        <p class="card-text mb-1"><strong>Publishers:</strong> ${book?.publisher ? book.publisher[0] : "Unknown"}</p>
        </div>
      </div>
    `;
    container.appendChild(newColumn);
    countResult++;
    toggleLoader("none")
  });
  resultInfo(countResult, key);
};

// show result count and searched key
const resultInfo = (countResult, key) => {
  // found result count show
  const showCount = document.getElementById("count-result");
  if (countResult > 0) {
    showCount.innerText = countResult;
    if (key === "123456") {
      document.getElementById("you-searched").innerText = 'Shows result by default';
    } else {
      document.getElementById("you-searched").innerHTML = `
        You have searched for "<em class="text-danger">${key}</em>"
      `;
    }
  }else{
    showCount.innerText = "No result found";
    toggleLoader("none");
    toggleError("block", "Your searched key is not valid. No result found!!!!");
  }
}

// file connection test
console.log("connection success");