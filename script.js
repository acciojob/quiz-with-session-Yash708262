// Quiz questions
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars", "Saturn"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// References to DOM elements
const questionsElement = document.getElementById("questions");
const submitButton = document.getElementById("submit");
const scoreElement = document.getElementById("score");

// Load previous progress from session storage
let userAnswers = sessionStorage.getItem("progress")
  ? JSON.parse(sessionStorage.getItem("progress"))
  : {};

// Function to render quiz
function renderQuestions() {
  questionsElement.innerHTML = ""; // Clear previous content
  questions.forEach((q, i) => {
    const questionDiv = document.createElement("div");
    questionDiv.classList.add("question");

    const questionText = document.createElement("p");
    questionText.textContent = q.question;
    questionDiv.appendChild(questionText);

    q.choices.forEach((choice) => {
      const choiceLabel = document.createElement("label");
      choiceLabel.style.display = "block";

      const choiceInput = document.createElement("input");
      choiceInput.type = "radio";
      choiceInput.name = `question-${i}`;
      choiceInput.value = choice;
      // Check previously selected answer
      if (userAnswers[i] === choice) {
        choiceInput.checked = true;
      }

      // Event listener for saving selection in session storage
      choiceInput.addEventListener("change", () => {
        userAnswers[i] = choice;
        sessionStorage.setItem("progress", JSON.stringify(userAnswers));
      });

      choiceLabel.appendChild(choiceInput);
      choiceLabel.appendChild(document.createTextNode(choice));
      questionDiv.appendChild(choiceLabel);
    });

    questionsElement.appendChild(questionDiv);
  });
}

// Function to calculate score and display
function submitQuiz() {
  let score = 0;
  questions.forEach((q, i) => {
    if (userAnswers[i] === q.answer) score++;
  });

  scoreElement.textContent = `Your score is ${score} out of ${questions.length}.`;

  // Save score in local storage
  localStorage.setItem("score", score);
}

// Event listener for submit button
submitButton.addEventListener("click", submitQuiz);

// Render questions on page load
renderQuestions();

// Display previous score if exists
if (localStorage.getItem("score") !== null) {
  scoreElement.textContent = `Your score is ${localStorage.getItem(
    "score"
  )} out of ${questions.length}.`;
}
