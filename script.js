const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const xTwitterBtn = document.getElementById('xTwitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// Show Loader
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loader
function loadingComplete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// Show new quote
function newQuote() {
    loading();
    // Pick a random quote from apiQuotes Array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]
    // Check if author field is empty and replace them with 'Unknown'
    if (!quote.author) {
        authorText.textContent = "Unknown";
    } else {
        authorText.textContent = quote.author;
    }
    // Check quote length
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent = quote.text;
    loadingComplete();
}

// Get Quotes from API
async function getQuotes() {
    loading();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        // Catch error here
    }
}

// Tweet Quote
function postQuote() {
    const xTwitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} ~ ${authorText.textContent}`;
    window.open(xTwitterUrl, '_blank')
}

// Event Listners for buttons
xTwitterBtn.addEventListener('click', postQuote);
newQuoteBtn.addEventListener('click', newQuote);

// On Load
getQuotes();
