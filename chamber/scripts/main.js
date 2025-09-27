document.getElementById('currentYear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = document.lastModified;

const membersContainer = document.getElementById('members');
const gridViewBtn = document.getElementById('gridView');
const listViewBtn = document.getElementById('listView');

if (membersContainer) {
  async function getMembers() {
    const response = await fetch('data/members.json');
    const data = await response.json();
    displayMembers(data.members);
  }

  function displayMembers(members) {
    membersContainer.innerHTML = '';
    members.forEach(member => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.innerHTML = `
        <img src="images/${member.image}" alt="${member.name}">
        <div class="card-content">
          <h2>${member.name}</h2>
          <p>${member.address}</p>
          <p>${member.phone}</p>
          <a href="${member.website}" target="_blank">Visit Website</a>
          <p><strong>Membership:</strong> ${member.membership}</p>
        </div>
      `;
      membersContainer.appendChild(card);
    });
  }

  if (gridViewBtn && listViewBtn) {
    gridViewBtn.addEventListener('click', () => {
      membersContainer.classList.add('grid');
      membersContainer.classList.remove('list');
    });

    listViewBtn.addEventListener('click', () => {
      membersContainer.classList.add('list');
      membersContainer.classList.remove('grid');
    });
  }

  getMembers();
}

document.addEventListener('DOMContentLoaded', () => {
  const modalLinks = document.querySelectorAll('.learn-more');
  const modals = document.querySelectorAll('.modal');
  const closes = document.querySelectorAll('.modal .close');

  modalLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const modalId = link.getAttribute('data-modal');
      const modal = document.getElementById(modalId);
      if (modal) modal.style.display = 'block';
    });
  });

  closes.forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
      closeBtn.closest('.modal').style.display = 'none';
    });
  });

  window.addEventListener('click', e => {
    modals.forEach(modal => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });
  });

  const timestampField = document.getElementById('timestamp');
  if (timestampField) {
    timestampField.value = new Date().toISOString();
  }

  if (document.getElementById('firstName') &&
      document.getElementById('lastName') &&
      document.getElementById('email') &&
      document.getElementById('phone') &&
      document.getElementById('businessName') &&
      document.getElementById('timestamp')) {

    function getQueryParam(param) {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get(param) || '';
    }

    document.getElementById('firstName').textContent = getQueryParam('firstName');
    document.getElementById('lastName').textContent = getQueryParam('lastName');
    document.getElementById('email').textContent = getQueryParam('email');
    document.getElementById('phone').textContent = getQueryParam('phone');
    document.getElementById('businessName').textContent = getQueryParam('organization'); // matches form field name
    const timestamp = getQueryParam('timestamp');
    document.getElementById('timestamp').textContent = timestamp ? new Date(timestamp).toLocaleString() : '';
  }
});
