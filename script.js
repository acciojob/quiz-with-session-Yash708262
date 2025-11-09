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

const questionsElement = document.getElementById("questions");
const submitButton = document.getElementById("submit");
const scoreElement = document.getElementById("score");

// Load previous progress
let userAnswers = sessionStorage.getItem("progress")
  ? JSON.parse(sessionStorage.getItem("progress"))
  : {};

// Render quiz questions
function renderQuestions() {
  questionsElement.innerHTML = "";

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

      // Restore from session storage
      if (userAnswers[i] === choice) {
        choiceInput.checked = true;
        choiceInput.setAttribute("checked", "true"); // <-- important for Cypress
      }

      // Save to session storage on change
      choiceInput.addEventListener("change", () => {
        userAnswers[i] = choice;
        sessionStorage.setItem("progress", JSON.stringify(userAnswers));

        // Also ensure attribute is set for Cypress
        choiceInput.setAttribute("checked", "true");
      });

      choiceLabel.appendChild(choiceInput);
      choiceLabel.appendChild(document.createTextNode(choice));
      questionDiv.appendChild(choiceLabel);
    });

    questionsElement.appendChild(questionDiv);
  });
}

// Calculate and display score
function submitQuiz() {
  let score = 0;
  questions.forEach((q, i) => {
    if (userAnswers[i] === q.answer) score++;
  });

  scoreElement.textContent = `Your score is ${score} out of ${questions.length}.`;
  localStorage.setItem("score", score);
}

// Event listener for submit button
submitButton.addEventListener("click", submitQuiz);

// Render on load
renderQuestions();

// Restore previous score if any
if (localStorage.getItem("score") !== null) {
  scoreElement.textContent = `Your score is ${localStorage.getItem(
    "score"
  )} out of ${questions.length}.`;
}

