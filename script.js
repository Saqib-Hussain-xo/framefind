// FrameFind — Part 2: Fetch & Render Image Search

const form = document.getElementById("search-form");
const input = document.getElementById("search-input");
const results = document.getElementById("results");
const emptyState = document.getElementById("empty-state");
const resultCount = document.getElementById("result-count");

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

  const url =
    "https://commons.wikimedia.org/w/api.php?action=query" +
    "&generator=search&gsrsearch=" + encodeURIComponent(query) +
    "&gsrnamespace=6&gsrlimit=12" +
    "&prop=imageinfo&iiprop=url&iiurlwidth=300" +
    "&format=json&origin=*";

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(response.status);
  }

  const data = await response.json();

  const items = data.query ? Object.values(data.query.pages) : [];

  if (items.length > 0) {
    emptyState.hidden = true;
    const emptyContainer = emptyState.closest(".empty-state-container");
    if (emptyContainer) {
      emptyContainer.hidden = true;
    }
    resultCount.textContent = `Showing ${items.length} results for "${query}"`;
    render(items);
  } else {
    results.innerHTML = "";
    emptyState.hidden = false;
    emptyState.textContent = `No results found for "${query}". Try another search.`;
    const emptyContainer = emptyState.closest(".empty-state-container");
    if (emptyContainer) {
      emptyContainer.hidden = false;
    }
    resultCount.textContent = `Showing 0 results for "${query}"`;
  }
});
