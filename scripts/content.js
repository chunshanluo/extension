
refreshEconomist();


/**
 * Cannot refresh here, because economist will check user after page loaded.
 * So this function must be used after page complete.
 */
function refreshEconomist() {
    fetch(window.location.href).then(response => response.text()).then(data => { 
        var found = data.match(/<p data-caps="initial" class="article__body-text article__body-text--dropcap">[\s\S]+?(<p class="article__body-text">[\s\S]+<\/p>)<\/div><\/section>/m); 
        var parts = document.getElementsByClassName('article__body-text'); 
        parts[1].parentNode.removeChild(parts[1]); 
        parts[0].insertAdjacentHTML('afterend', found[1]); 
    });
    
    console.log("refreshed");

}

/**
 * This will produce some browser fault.
 */
function addReadTime() {
    const article = document.querySelector("article");

    // `document.querySelector` may return null if the selector doesn't match anything.
    if (article) {
        console.log("get article");
        const text = article.textContent;
        const wordMatchRegExp = /[^\s]+/g; // Regular expression
        const words = text.matchAll(wordMatchRegExp);
        // matchAll returns an iterator, convert to array to get word count
        const wordCount = [...words].length;
        console.log("words: " + wordCount)
        const readingTime = Math.round(wordCount / 200);
        const badge = document.createElement("p");
        // Use the same styling as the publish information in an article's header
        badge.classList.add("color-secondary-text", "type--caption");
        badge.textContent = `⏱️ ${readingTime} min read`;

        // Support for API reference docs
        const heading = article.querySelector("h1");
        // Support for article docs with date
        const date = article.querySelector("time")?.parentNode;

        (date ?? heading).insertAdjacentElement("afterend", badge);
    }
}
