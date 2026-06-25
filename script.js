const questions = [
  {
    question: "HTML ka full form kya hai?",
    answers: [
      { text: "Hyper Text Markup Language", correct: true },
      { text: "High Text Machine Language", correct: false },
      { text: "Hyper Tool Multi Language", correct: false },
      { text: "Home Text Markup Language", correct: false }
    ]
  },
  {
    question: "CSS ka use kis ke liye hota hai?",
    answers: [
      { text: "Website ka design karne ke liye", correct: true },
      { text: "Database banane ke liye", correct: false },
      { text: "Server start karne ke liye", correct: false },
      { text: "Computer format karne ke liye", correct: false }
    ]
  },
  {
    question: "JavaScript kis type ki language hai?",
    answers: [
      { text: "Programming Language", correct: true },
      { text: "Markup Language", correct: false },
      { text: "Styling Language", correct: false },
      { text: "Database Language", correct: false }
    ]
  },
  {
    question: "DOM ka full form kya hai?",
    answers: [
      { text: "Document Object Model", correct: true },
      { text: "Data Object Method", correct: false },
      { text: "Digital Order Model", correct: false },
      { text: "Document Order Machine", correct: false }
    ]
  },
  {
    question: "JavaScript me array method kaun sa hai?",
    answers: [
      { text: "map()", correct: true },
      { text: "style()", correct: false },
      { text: "html()", correct: false },
      { text: "color()", correct: false }
    ]
  }
];

const questionCounter = document.getElementById("questionCounter");
const progress = document.getElementById("progress");
const quizBox = document.getElementById("quizBox");
const resultBox = document.getElementById("resultBox");
const questionText = document.getElementById("questionText");
const answerButtons = document.getElementById("answerButtons");
const feedback = document.getElementById("feedback");
const nextBtn = document.getElementById("nextBtn");
const scoreText = document.getElementById("scoreText");
const restartBtn = document.getElementById("restartBtn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;

  quizBox.classList.remove("hide");
  resultBox.classList.add("hide");

  nextBtn.innerText = "Next";

  showQuestion();
}

function showQuestion() {
  resetState();

  const currentQuestion = questions[currentQuestionIndex];

  questionText.innerText = currentQuestion.question;

  questionCounter.innerText = `Question ${currentQuestionIndex + 1} of ${questions.length}`;

  const progressPercent = ((currentQuestionIndex + 1) / questions.length) * 100;
  progress.style.width = `${progressPercent}%`;

  currentQuestion.answers.forEach(function(answer) {
    const button = document.createElement("button");

    button.innerText = answer.text;

    button.classList.add("answer-btn");

    button.dataset.correct = answer.correct;

    button.addEventListener("click", selectAnswer);

    answerButtons.appendChild(button);
  });
}

function resetState() {
  feedback.innerText = "";

  nextBtn.style.display = "none";

  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(event) {
  const selectedButton = event.target;

  const isCorrect = selectedButton.dataset.correct === "true";

  if (isCorrect) {
    selectedButton.classList.add("correct");
    feedback.innerText = "Correct answer!";
    score++;
  } else {
    selectedButton.classList.add("wrong");
    feedback.innerText = "Wrong answer!";
  }

  Array.from(answerButtons.children).forEach(function(button) {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }

    button.disabled = true;
  });

  nextBtn.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

function showScore() {
  quizBox.classList.add("hide");

  resultBox.classList.remove("hide");

  progress.style.width = "100%";

  scoreText.innerText = `Your score is ${score} out of ${questions.length}`;
}

nextBtn.addEventListener("click", handleNextButton);

restartBtn.addEventListener("click", startQuiz);

startQuiz();