const navbutton = document.querySelector('#han-btn');
const navlink = document.querySelector('#nav-bar');

navbutton.addEventListener('click', () => {
  navbutton.classList.toggle('show');
  navlink.classList.toggle('show');
});

document.addEventListener('DOMContentLoaded', () => {
  const currentYear = new Date().getFullYear();
  document.getElementById('currentYear').textContent = currentYear;

  const lastModified = document.lastModified;
  document.getElementById('lastModified').textContent = `Last Modified: ${lastModified}`;
});

const courses = [
  { subject: 'CSE', number: 110, credits: 2, completed: true },
  { subject: 'WDD', number: 130, credits: 2, completed: true },
  { subject: 'CSE', number: 111, credits: 2, completed: true },
  { subject: 'CSE', number: 210, credits: 2, completed: true },
  { subject: 'WDD', number: 131, credits: 2, completed: true },
  { subject: 'WDD', number: 231, credits: 2, completed: false },
];

const courseElement = document.getElementById('courses');

// Create filter buttons dynamically
const certSection = document.getElementById('certs');
const filterDiv = document.createElement('div');
filterDiv.classList.add('filter-buttons');

['All', 'CSE', 'WDD'].forEach(label => {
  const btn = document.createElement('button');
  btn.textContent = label;
  btn.setAttribute('data-filter', label);
  btn.setAttribute('aria-pressed', label === 'All'); // "All" active by default
  filterDiv.appendChild(btn);
});
certSection.insertBefore(filterDiv, courseElement);

// Add total credits placeholder
const creditDiv = document.createElement('div');
creditDiv.id = 'creditTotal';
certSection.appendChild(creditDiv);

// Render courses
function renderCourses(courseArray) {
  courseElement.innerHTML = ''; // Clear existing content

  let totalCredits = 0;

  courseArray.forEach(course => {
    const courseDiv = document.createElement('div');
    courseDiv.classList.add('course-item');
    if (course.completed) {
      courseDiv.classList.add('completed');
    }

    // Display only course code: subject + number
    courseDiv.textContent = `${course.subject} ${course.number}`;
    courseElement.appendChild(courseDiv);

    // Add credits
    totalCredits += course.credits;
  });

  // Update credits total
  creditDiv.textContent = `The total credits for courses listed above is ${totalCredits}`;
}

// Filter logic
function filterCourses(subject) {
  let filteredCourses = courses;
  if (subject !== 'All') {
    filteredCourses = courses.filter(course => course.subject === subject);
  }
  renderCourses(filteredCourses);
}

// Add event listeners to filter buttons
filterDiv.querySelectorAll('button').forEach(button => {
  button.addEventListener('click', () => {
    // Reset aria-pressed
    filterDiv.querySelectorAll('button').forEach(btn => btn.setAttribute('aria-pressed', false));
    button.setAttribute('aria-pressed', true);

    filterCourses(button.getAttribute('data-filter'));
  });
});

// Initial render (All courses)
renderCourses(courses);
