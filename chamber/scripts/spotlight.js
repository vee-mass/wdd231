// scripts/spotlights.js
async function loadSpotlights() {
  const container = document.querySelector(".spotlight-container");
  container.innerHTML = ""; // Clear container

  try {
    // Adjust path relative to index.html
    const response = await fetch("./data/members.json");
    if (!response.ok) throw new Error("Failed to fetch members.json");

    const data = await response.json();

    // Filter Gold & Silver members
    let filtered = data.members.filter(
      m => m.membership === "Gold" || m.membership === "Silver"
    );

    if (filtered.length === 0) {
      container.innerHTML = "<p>No members available for spotlight.</p>";
      return;
    }

    // Randomly select up to 3 members
    let selected = [];
    while (selected.length < 3 && filtered.length > 0) {
      const index = Math.floor(Math.random() * filtered.length);
      selected.push(filtered.splice(index, 1)[0]);
    }

    // Display spotlight cards
    selected.forEach(member => {
      const card = document.createElement("div");
      card.classList.add("spotlight");
      card.innerHTML = `
        <img src="images/${member.image}" alt="${member.name}">
        <h3>${member.name}</h3>
        <p>${member.address}</p>
        <p>${member.phone}</p>
        <a href="${member.website}" target="_blank">Visit Website</a>
        <p><strong>${member.membership} Member</strong></p>
      `;
      container.appendChild(card);
    });

  } catch (error) {
    console.error("Spotlight fetch error:", error);
    container.innerHTML = "<p>Unable to load member spotlights at this time.</p>";
  }
}

// Run the function
loadSpotlights();
