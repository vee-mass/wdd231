const navbutton = document.querySelector('#han-btn');
const navlink = document.querySelector('#nav-bar');

const modal = document.getElementById("myModal");
const closeModal = document.getElementById('closeModal')

function displayCourseDetails(course) {
  courseDetails.innerHTML = '';
  courseDetails.innerHTML = `
    <button id="closeModal">❌</button>
    <h2>${course.subject} ${course.number}</h2>
    <h3>${course.title}</h3>
    <p><strong>Credits</strong>: ${course.credits}</p>
    <p><strong>Certificate</strong>: ${course.certificate}</p>
    <p>${course.description}</p>
    <p><strong>Technologies</strong>: ${course.technology.join(', ')}</p>
  `;
  courseDetails.showModal();
  
  closeModal.addEventListener("click", () => {
    courseDetails.close();
  });
}

courseDiv.addEventListener('click', () => {
  displayCourseDetails(course);
});

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

const creditDiv = document.createElement('div');
creditDiv.id = 'creditTotal';
certSection.appendChild(creditDiv);

function renderCourses(courseArray) {
  courseElement.innerHTML = ''; // Clear existing content

  let totalCredits = 0;

  courseArray.forEach(course => {
    const courseDiv = document.createElement('div');
    courseDiv.classList.add('course-item');
    if (course.completed) {
      courseDiv.classList.add('completed');
    }

    courseDiv.textContent = `${course.subject} ${course.number}`;
    courseElement.appendChild(courseDiv);

    totalCredits += course.credits;
  });

  creditDiv.textContent = `The total credits for courses listed above is ${totalCredits}`;
}

function filterCourses(subject) {
  let filteredCourses = courses;
  if (subject !== 'All') {
    filteredCourses = courses.filter(course => course.subject === subject);
  }
  renderCourses(filteredCourses);
}

filterDiv.querySelectorAll('button').forEach(button => {
  button.addEventListener('click', () => {
    filterDiv.querySelectorAll('button').forEach(btn => btn.setAttribute('aria-pressed', false));
    button.setAttribute('aria-pressed', true);

    filterCourses(button.getAttribute('data-filter'));
  });
});

renderCourses(courses);
