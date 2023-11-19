const cotainer = document.getElementById("container");
function renderQuoteCard(author, quote) {
  return `<div class="card">
  <span class="author">${author}</span>
  <span class="quote">${quote}</span>
  </div>
  `;
}




//adding the card in my page:



fetch('https://dummyjson.com/quotes').then(res => res.json())
  .then(json => {
    for (const quoteObj of json.quotes) {
      const quoteCard = document.createElement('div');
      quoteCard.innerHTML = renderQuoteCard(quoteObj.author, quoteObj.quote);
      container.appendChild(quoteCard);

    }
  })

