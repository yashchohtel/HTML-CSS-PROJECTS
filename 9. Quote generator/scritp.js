let quotePlace = document.getElementById("quotePlace");
let autherPlace = document.getElementById("autherPlace");
let button = document.getElementById("fetchJokes");
let quoteApi = "https://type.fit/api/quotes";

function fetchQuotes() {
  fetch(quoteApi)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let apiDataLength = data.length;
      let randomNum = Math.floor(Math.random() * (apiDataLength - 1) + 1);
      let quote = data[randomNum].text;
      let auther = data[randomNum].author;
      let comaIndex = auther.indexOf(",");
      let exectAuther = auther.slice(0, comaIndex);

      autherPlace.innerText = exectAuther;
      quotePlace.innerText = quote;
    });
}

button.addEventListener("click", () => {
  fetchQuotes();
});

fetchQuotes();
