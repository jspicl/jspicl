// Search functionality - searchData is injected by the template
(function () {
  const searchInput = document.getElementById("search-input");
  const searchResults = document.getElementById("search-results");

  if (!searchInput || !searchResults || typeof searchData === "undefined") {
    return;
  }

  function escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function highlightMatch(text, query) {
    const regex = new RegExp(`(${escapeRegex(query)})`, "gi");
    return text.replace(regex, "<mark>$1</mark>");
  }

  function getExcerpt(content, query) {
    const lowerContent = content.toLowerCase();
    const lowerQuery = query.toLowerCase();
    const index = lowerContent.indexOf(lowerQuery);

    if (index === -1) {
      return content.substring(0, 100) + (content.length > 100 ? "..." : "");
    }

    const start = Math.max(0, index - 30);
    const end = Math.min(content.length, index + query.length + 70);
    let excerpt = content.substring(start, end);

    if (start > 0) excerpt = "..." + excerpt;
    if (end < content.length) excerpt = excerpt + "...";

    return highlightMatch(excerpt, query);
  }

  function performSearch(query) {
    if (!query || query.length < 2) {
      searchResults.classList.remove("visible");
      return;
    }

    const normalizedQuery = query.toLowerCase();
    const results = searchData.filter(
      (item) =>
        item.title.toLowerCase().includes(normalizedQuery) ||
        item.content.toLowerCase().includes(normalizedQuery)
    );

    if (results.length === 0) {
      searchResults.innerHTML =
        '<div class="search-no-results">No results found</div>';
    } else {
      searchResults.innerHTML = results
        .slice(0, 8)
        .map(
          (item) => `
        <a href="${item.url}" class="search-result-item">
          <div class="search-result-title">${highlightMatch(item.title, query)}</div>
          <div class="search-result-excerpt">${getExcerpt(item.content, query)}</div>
        </a>
      `
        )
        .join("");
    }

    searchResults.classList.add("visible");
  }

  // Debounce search input
  let debounceTimer;
  searchInput.addEventListener("input", (e) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => performSearch(e.target.value), 150);
  });

  searchInput.addEventListener("focus", () => {
    if (searchInput.value.length >= 2) {
      performSearch(searchInput.value);
    }
  });

  // Close search results when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".search-container")) {
      searchResults.classList.remove("visible");
    }
  });

  // Keyboard navigation
  searchInput.addEventListener("keydown", (e) => {
    const items = searchResults.querySelectorAll(".search-result-item");
    const activeItem = searchResults.querySelector(".search-result-item:focus");
    let index = Array.from(items).indexOf(activeItem);

    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (index < items.length - 1) {
        items[index + 1].focus();
      } else if (index === -1 && items.length > 0) {
        items[0].focus();
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (index > 0) {
        items[index - 1].focus();
      } else if (index === 0) {
        searchInput.focus();
      }
    } else if (e.key === "Escape") {
      searchResults.classList.remove("visible");
      searchInput.blur();
    }
  });
})();
