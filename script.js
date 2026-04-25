const favoritesKey = "india-trails-favorites";
const themeKey = "india-trails-theme";
const contactMessagesKey = "india-trails-contact-messages";

function getFavorites() {
  return JSON.parse(localStorage.getItem(favoritesKey) || "[]");
}

function setFavorites(favorites) {
  localStorage.setItem(favoritesKey, JSON.stringify(favorites));
}

function isFavorite(id) {
  return getFavorites().includes(id);
}

function toggleFavorite(id) {
  const favorites = getFavorites();
  const updatedFavorites = favorites.includes(id)
    ? favorites.filter((favoriteId) => favoriteId !== id)
    : [...favorites, id];

  setFavorites(updatedFavorites);
  syncFavoriteButtons();
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem(themeKey, theme);
}

function initTheme() {
  const savedTheme = localStorage.getItem(themeKey);
  const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  applyTheme(savedTheme || preferredTheme);

  const themeToggle = document.querySelector("[data-theme-toggle]");
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      applyTheme(nextTheme);
    });
  }
}

function initMobileNav() {
  const toggle = document.querySelector("[data-nav-toggle]");
  const menu = document.querySelector("[data-nav-menu]");

  if (!toggle || !menu) {
    return;
  }

  toggle.addEventListener("click", () => {
    menu.classList.toggle("is-open");
  });
}

function createFavoriteButton(destinationId) {
  const active = isFavorite(destinationId);
  return `
    <button class="favorite-btn ${active ? "is-active" : ""}" type="button" data-favorite-id="${destinationId}">
      ${active ? "Saved" : "Save to Favorites"}
    </button>
  `;
}

function createDestinationCard(destination) {
  return `
    <article class="destination-card reveal">
      <div class="destination-card__image" style="background-image: url('${destination.heroImage}')">
        <span class="destination-chip">${destination.type}</span>
      </div>
      <div class="destination-card__content">
        <div class="destination-card__meta">
          <span>${destination.state}</span>
          <span>${destination.budget}</span>
        </div>
        <h3>${destination.name}</h3>
        <p>${destination.tagline}</p>
        <div class="destination-card__actions">
          <a class="button-secondary" href="destination.html?id=${destination.id}">View Details</a>
          ${createFavoriteButton(destination.id)}
        </div>
      </div>
    </article>
  `;
}

function syncFavoriteButtons() {
  document.querySelectorAll("[data-favorite-id]").forEach((button) => {
    const id = button.getAttribute("data-favorite-id");
    const active = isFavorite(id);
    button.classList.toggle("is-active", active);
    button.textContent = active ? "Saved" : "Save to Favorites";
  });
}

function initFavoriteButtons() {
  document.addEventListener("click", (event) => {
    const favoriteButton = event.target.closest("[data-favorite-id]");
    if (!favoriteButton) {
      return;
    }

    toggleFavorite(favoriteButton.getAttribute("data-favorite-id"));
  });
}

function initRevealAnimations() {
  const revealItems = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  revealItems.forEach((item) => observer.observe(item));
}

function renderFeaturedDestinations() {
  const container = document.querySelector("[data-featured-grid]");
  if (!container) {
    return;
  }

  container.innerHTML = destinations.slice(0, 3).map(createDestinationCard).join("");
  syncFavoriteButtons();
  initRevealAnimations();
}

function populateFilterOptions(selector, values) {
  const field = document.querySelector(selector);
  if (!field) {
    return;
  }

  values.forEach((value) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    field.appendChild(option);
  });
}

function renderDestinationGrid(filteredDestinations) {
  const grid = document.querySelector("[data-destination-grid]");
  const count = document.querySelector("[data-results-count]");
  const emptyState = document.querySelector("[data-empty-state]");

  if (!grid || !count || !emptyState) {
    return;
  }

  grid.innerHTML = filteredDestinations.map(createDestinationCard).join("");
  count.textContent = `${filteredDestinations.length} destination${filteredDestinations.length === 1 ? "" : "s"} found`;
  emptyState.hidden = filteredDestinations.length !== 0;
  syncFavoriteButtons();
  initRevealAnimations();
}

function initDestinationFilters() {
  const grid = document.querySelector("[data-destination-grid]");
  if (!grid) {
    return;
  }

  const searchInput = document.querySelector("[data-search-input]");
  const stateFilter = document.querySelector("[data-state-filter]");
  const typeFilter = document.querySelector("[data-type-filter]");
  const budgetFilter = document.querySelector("[data-budget-filter]");
  const params = new URLSearchParams(window.location.search);

  populateFilterOptions("[data-state-filter]", [...new Set(destinations.map((item) => item.state))]);
  populateFilterOptions("[data-type-filter]", [...new Set(destinations.map((item) => item.type))]);

  if (params.get("type")) {
    typeFilter.value = params.get("type");
  }

  const updateGrid = () => {
    const query = searchInput.value.trim().toLowerCase();
    const state = stateFilter.value;
    const type = typeFilter.value;
    const budget = budgetFilter.value;

    const filtered = destinations.filter((destination) => {
      const matchesQuery =
        destination.name.toLowerCase().includes(query) ||
        destination.tagline.toLowerCase().includes(query) ||
        destination.attractions.some((attraction) => attraction.toLowerCase().includes(query));
      const matchesState = state === "All" || destination.state === state;
      const matchesType = type === "All" || destination.type === type;
      const matchesBudget = budget === "All" || destination.budget === budget;

      return matchesQuery && matchesState && matchesType && matchesBudget;
    });

    renderDestinationGrid(filtered);
  };

  [searchInput, stateFilter, typeFilter, budgetFilter].forEach((element) => {
    element.addEventListener("input", updateGrid);
    element.addEventListener("change", updateGrid);
  });

  updateGrid();
}

function initHomeSearch() {
  const form = document.querySelector("[data-home-search]");
  if (!form) {
    return;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const query = formData.get("search");
    const target = query ? `destinations.html?search=${encodeURIComponent(query)}` : "destinations.html";
    window.location.href = target;
  });
}

function applySearchParamToDestinations() {
  const searchInput = document.querySelector("[data-search-input]");
  if (!searchInput) {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const query = params.get("search");

  if (query) {
    searchInput.value = query;
    searchInput.dispatchEvent(new Event("input"));
  }
}

function renderDestinationDetails() {
  const container = document.querySelector("[data-destination-detail]");
  if (!container) {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const current = destinations.find((destination) => destination.id === params.get("id")) || destinations[0];

  document.title = `${current.name} | Incredible India Trails`;

  container.innerHTML = `
    <div class="destination-detail__hero reveal">
      <div class="destination-detail__intro">
        <p class="eyebrow">${current.state} • ${current.type}</p>
        <h1>${current.name}</h1>
        <p class="destination-detail__lead">${current.description}</p>
        <div class="destination-detail__actions">
          ${createFavoriteButton(current.id)}
          <a class="button-secondary" href="destinations.html">Back to destinations</a>
        </div>
      </div>
      <div class="destination-detail__cover" style="background-image: url('${current.heroImage}')"></div>
    </div>

    <div class="gallery-grid">
      ${current.gallery
        .map(
          (image, index) => `
            <div class="gallery-tile reveal" style="background-image: url('${image}')">
              <span>View ${current.name} ${index + 1}</span>
            </div>
          `
        )
        .join("")}
    </div>

    <div class="destination-content">
      <article class="content-card reveal">
        <p class="eyebrow">Overview</p>
        <h2>Why visit ${current.name}?</h2>
        <p>${current.description}</p>
      </article>
      <article class="content-card reveal">
        <p class="eyebrow">Best time to visit</p>
        <h2>${current.bestTime}</h2>
        <p>Plan your trip during this season for the most comfortable weather and best local experiences.</p>
      </article>
      <article class="content-card reveal">
        <p class="eyebrow">Estimated budget</p>
        <h2>${current.budgetEstimate}</h2>
        <p>Costs vary based on season, hotel type, and transport choices, but this is a strong planning range.</p>
      </article>
      <article class="content-card reveal">
        <p class="eyebrow">Top attractions</p>
        <h2>Must-see highlights</h2>
        <ul class="check-list">
          ${current.attractions.map((item) => `<li>${item}</li>`).join("")}
        </ul>
      </article>
      <article class="content-card reveal">
        <p class="eyebrow">Travel tips</p>
        <h2>Smart advice before you go</h2>
        <ul class="check-list">
          ${current.travelTips.map((item) => `<li>${item}</li>`).join("")}
        </ul>
      </article>
      <article class="content-card map-card reveal">
        <p class="eyebrow">Map</p>
        <h2>Location snapshot</h2>
        <div class="map-placeholder">
          <span>${current.mapLabel}</span>
        </div>
      </article>
    </div>
  `;

  syncFavoriteButtons();
  initRevealAnimations();
}

function initContactForm() {
  const form = document.querySelector("[data-contact-form]");
  const message = document.querySelector("[data-form-message]");

  if (!form || !message) {
    return;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const savedMessages = JSON.parse(localStorage.getItem(contactMessagesKey) || "[]");

    savedMessages.push({
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
      submittedAt: new Date().toISOString()
    });

    localStorage.setItem(contactMessagesKey, JSON.stringify(savedMessages));
    message.textContent = "Thanks for reaching out. We have saved your message locally and will get back with travel ideas soon.";
    form.reset();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initMobileNav();
  initFavoriteButtons();
  initRevealAnimations();
  renderFeaturedDestinations();
  initDestinationFilters();
  applySearchParamToDestinations();
  initHomeSearch();
  renderDestinationDetails();
  initContactForm();
});
