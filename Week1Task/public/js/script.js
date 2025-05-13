async function getQuote() {
  const response = await fetch('/random-quote');
  const data = await response.json();
  document.getElementById('quote-text').textContent = data.content;
  document.getElementById('quote-author').textContent = `— ${data.author}`;
  document.getElementById('quote-content-input').value = data.content;
  document.getElementById('quote-author-input').value = data.author;
}

async function searchByAuthor() {
  const author = document.getElementById('search-author').value;
  const res = await fetch(`/search?author=${encodeURIComponent(author)}`);
  const results = await res.json();

  const container = document.getElementById('search-results');
  container.innerHTML = results.map(q =>
    `<div class="alert alert-info">"${q.content}" — <strong>${q.author}</strong></div>`
  ).join('');
}
