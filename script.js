// Get elements
const form = document.getElementById("surveyForm");
const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const rating = document.getElementById("rating");
const feedback = document.getElementById("feedback");
const submitButton = document.getElementById("submitButton");

// Preview elements
const previewName = document.getElementById("previewName");
const previewEmail = document.getElementById("previewEmail");
const previewRating = document.getElementById("previewRating");
const previewFeedback = document.getElementById("previewFeedback");

// Summary elements
const totalResponses = document.getElementById("totalResponses");
const averageRating = document.getElementById("averageRating");

// Responses table
const responseTable = document.querySelector("#responseTable tbody");

// Track responses
let responses = [];

// Update preview on input
function updatePreview() {
  previewName.textContent = fullName.value || "N/A";
  previewEmail.textContent = email.value || "N/A";
  previewRating.textContent = rating.value || "N/A";
  previewFeedback.textContent = feedback.value || "N/A";
}

// Validate form
function validateForm() {
  let valid = true;

  // Full name
  if (!fullName.value.trim()) {
    document.getElementById("fullNameError").textContent = "Name is required";
    document.getElementById("fullNameError").style.display = "block";
    valid = false;
  } else {
    document.getElementById("fullNameError").style.display = "none";
  }

  // Email
  if (!email.value.includes("@")) {
    document.getElementById("emailError").textContent = "Valid email required";
    document.getElementById("emailError").style.display = "block";
    valid = false;
  } else {
    document.getElementById("emailError").style.display = "none";
  }

  // Rating
  if (!rating.value) {
    document.getElementById("ratingError").textContent = "Please select a rating";
    document.getElementById("ratingError").style.display = "block";
    valid = false;
  } else {
    document.getElementById("ratingError").style.display = "none";
  }

  submitButton.disabled = !valid;
}

// Handle form submission
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const response = {
    name: fullName.value,
    email: email.value,
    rating: parseInt(rating.value),
    feedback: feedback.value
  };

  responses.push(response);

  // Add to table
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${response.name}</td>
    <td>${response.email}</td>
    <td>${response.rating}</td>
    <td>${response.feedback}</td>
  `;
  responseTable.appendChild(row);

  // Update summary
  totalResponses.textContent = responses.length;
  const avg = (responses.reduce((sum, r) => sum + r.rating, 0) / responses.length).toFixed(2);
  averageRating.textContent = avg;

  // Reset form
  form.reset();
  updatePreview();
  submitButton.disabled = true;
});

// Event listeners
[fullName, email, rating, feedback].forEach(input => {
  input.addEventListener("input", () => {
    updatePreview();
    validateForm();
  });
});
