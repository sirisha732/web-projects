// Quiz Data
const questions = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris"
  },
  {
    question: "Which language is used for web apps?",
    options: ["Python", "Java", "JavaScript", "C++"],
    answer: "JavaScript"
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Computer Style Sheets",
      "Cascading Style Sheets",
      "Creative Style System",
      "Colorful Style Syntax"
    ],
    answer: "Cascading Style Sheets"
  }
];

function loadQuiz() {
  const quizContainer = document.getElementById('quiz');
  questions.forEach((q, index) => {
    const div = document.createElement('div');
    div.innerHTML = `
      <p><strong>${index + 1}. ${q.question}</strong></p>
      ${q.options.map(opt =>
        `<label><input type="radio" name="q${index}" value="${opt}"> ${opt}</label><br>`
      ).join('')}
    `;
    quizContainer.appendChild(div);
  });
}

function submitQuiz() {
  let score = 0;
  questions.forEach((q, index) => {
    const selected = document.querySelector(`input[name="q${index}"]:checked`);
    if (selected && selected.value === q.answer) {
      score++;
    }
  });
  document.getElementById('result').textContent = `✅ You scored ${score} out of ${questions.length}`;
}

// API Fetch for Joke
function getJoke() {
  fetch('https://official-joke-api.appspot.com/random_joke')
    .then(res => res.json())
    .then(data => {
      document.getElementById('joke').textContent = `${data.setup} — ${data.punchline}`;
    })
    .catch(error => {
      console.error('Error fetching joke:', error);
      document.getElementById('joke').textContent = '⚠️ Failed to load joke.';
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', loadQuiz);
