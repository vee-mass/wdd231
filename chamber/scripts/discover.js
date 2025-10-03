async function loadDiscover() {
  const grid = document.getElementById('discover-grid');
  try {
    const response = await fetch('data/discover.json');
    const data = await response.json();

    data.places.forEach(place => {
      const card = document.createElement('div');
      card.classList.add('discover-card');
      card.innerHTML = `
        <h2>${place.name}</h2>
        <figure><img src="images/${place.image}" alt="${place.name}"></figure>
        <address>${place.address}</address>
        <p>${place.description}</p>
        <button>Learn More</button>
      `;
      grid.appendChild(card);
    });
  } catch (error) {
    grid.innerHTML = "<p>Unable to load places at this time.</p>";
    console.error("Discover fetch error:", error);
  }
}
loadDiscover();

// Display Visit Message
function displayVisitMessage() {
  const messageDiv = document.getElementById('visit-message');
  const now = Date.now();
  const lastVisit = localStorage.getItem('discoverLastVisit');

  if (!lastVisit) {
    messageDiv.textContent = "Welcome! Let us know if you have any questions.";
  } else {
    const diffDays = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
    if (diffDays === 0) messageDiv.textContent = "Back so soon! Awesome!";
    else messageDiv.textContent = `You last visited ${diffDays} day${diffDays === 1 ? '' : 's'} ago.`;
  }

  localStorage.setItem('discoverLastVisit', now);
}
displayVisitMessage();
