// script.js

document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const message = document.getElementById("message");
  const formMessage = document.getElementById("formMessage");

  // Simple email regex
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (name.value.trim() === "" || email.value.trim() === "" || message.value.trim() === "") {
    formMessage.textContent = "All fields are required.";
  } else if (!emailPattern.test(email.value)) {
    formMessage.textContent = "Please enter a valid email address.";
  } else {
    formMessage.style.color = "green";
    formMessage.textContent = "Form submitted successfully!";
    // Optionally reset form
    this.reset();
  }
});
function addTask() {
  const input = document.getElementById("todoInput");
  const task = input.value.trim();
  const list = document.getElementById("todoList");

  if (task === "") return;

  const li = document.createElement("li");
  li.textContent = task;

  const removeBtn = document.createElement("button");
  removeBtn.textContent = "Remove";
  removeBtn.onclick = function () {
    list.removeChild(li);
  };

  li.appendChild(removeBtn);
  list.appendChild(li);

  input.value = ""; // Clear input
}
