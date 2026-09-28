// FrameFind — Part 3: Polish, Error States & Deploy

const form = document.getElementById("search-form");
const input = document.getElementById("search-input");
const results = document.getElementById("results");
const emptyState = document.getElementById("empty-state");
const resultCount = document.getElementById("result-count");
const loadingIndicator = document.getElementById("loading");
const errorState = document.getElementById("error-state");
const emptyContainer = document.getElementById("empty-state-wrapper") || emptyState.closest(".empty-state-container");

function hideAllStates() {
  if (loadingIndicator) loadingIndicator.hidden = true;
  if (errorState) errorState.hidden = true;
  if (emptyContainer) emptyContainer.hidden = true;
  emptyState.hidden = true;
}

function showLoading() {
  results.innerHTML = "";
  hideAllStates();
  if (loadingIndicator) loadingIndicator.hidden = false;
  resultCount.textContent = "Searching…";
}

function showResults(items, query) {
  hideAllStates();
  resultCount.textContent = `Showing ${items.length} results for "${query}"`;
  render(items);
}

function showEmpty(query) {
  results.innerHTML = "";
  hideAllStates();
  resultCount.textContent = `No results for "${query}". Try another search.`;
  emptyState.hidden = false;
  emptyState.textContent = `Nothing matched "${query}". Try another topic.`;
  if (emptyContainer) emptyContainer.hidden = false;
}

function showError() {
  results.innerHTML = "";
  hideAllStates();
  resultCount.textContent = "Something went wrong. Please try again.";
  if (errorState) errorState.hidden = false;
}

function render(items) {
  results.innerHTML = "";

  items.forEach((item) => {
    if (!item.imageinfo || !item.imageinfo[0] || !item.imageinfo[0].thumburl) {
      return;
    }

    const card = document.createElement("article");
    const img = document.createElement("img");
    const caption = document.createElement("p");

    img.src = item.imageinfo[0].thumburl;
    img.alt = item.title;
    caption.textContent = item.title;

    card.appendChild(img);
    card.appendChild(caption);
    results.appendChild(card);
  });
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const query = input.value.trim();

  if (!query) return;

  // 1. Immediate Loading State before fetch
  showLoading();

  const url =
    "https://commons.wikimedia.org/w/api.php?action=query" +
    "&generator=search&gsrsearch=" + encodeURIComponent(query) +
    "&gsrnamespace=6&gsrlimit=12" +
    "&prop=imageinfo&iiprop=url&iiurlwidth=300" +
    "&format=json&origin=*";

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();

    const items = data.query ? Object.values(data.query.pages) : [];

    if (items.length > 0) {
      // 2. Results State
      showResults(items, query);
    } else {
      // 3. Empty-Result State
      showEmpty(query);
    }
  } catch (error) {
    // 4. Resilient Error State
    showError();
  }
});
