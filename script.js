var questions = [
  { q: "HTML is used to…", choices: ["Style pages", "Structure content", "Run server code"], answer: 1 },
  { q: "CSS is mainly for…", choices: ["Styling web pages", "Storing data", "Creating databases"], answer: 0 },
  { q: "Which is a block-level element?", choices: ["<span>", "<a>", "<div>"], answer: 2 }
];

var index = 0;
var score = 0;
var locked = false;

var questionEl = document.getElementById("question");
var choicesEl  = document.getElementById("choices");
var progressEl = document.getElementById("progress");
var resultEl   = document.getElementById("result");
var nextBtn    = document.getElementById("nextBtn");
var restartBtn = document.getElementById("restartBtn");

function renderQuestion() {
  locked = false;
  resultEl.innerHTML = "";
  nextBtn.classList.add("hidden");

  var current = questions[index];
  questionEl.textContent = current.q;
  progressEl.textContent = "Question " + (index + 1) + " of " + questions.length;

  choicesEl.innerHTML = "";
  for (var i = 0; i < current.choices.length; i++) {
    var btn = document.createElement("button");
    btn.className = "choice-btn";
    btn.textContent = current.choices[i];
    btn.value = i;
    btn.addEventListener("click", checkAnswer);
    choicesEl.appendChild(btn);
  }
}

function checkAnswer(e) {
  if (locked) return;
  locked = true;

  var chosen = parseInt(e.target.value, 10);
  var correct = questions[index].answer;

  var allBtns = choicesEl.getElementsByTagName("button");
  for (var i = 0; i < allBtns.length; i++) {
    if (i === correct) allBtns[i].classList.add("correct");
    if (i === chosen && chosen !== correct) allBtns[i].classList.add("incorrect");
    // no disabling, we rely on locked flag to prevent re-clicks
  }

  if (chosen === correct) {
    score++;
    resultEl.innerHTML = "<p class='correct'>Correct!</p>";
  } else {
    resultEl.innerHTML = "";
    var msg = document.createElement("p");
    msg.className = "incorrect";
    msg.textContent = "Correct Answer: " + questions[index].choices[correct];
    resultEl.appendChild(msg);
  }

  // Show Next button for every question (even the last)
  nextBtn.classList.remove("hidden");
}

nextBtn.addEventListener("click", function () {
  if (index < questions.length - 1) {
    index++;
    renderQuestion();
  } else {
    showFinal();
    nextBtn.classList.add("hidden"); // hide Next after final score
  }
});

function showFinal() {
  questionEl.textContent = "Quiz Finished!";
  choicesEl.innerHTML = "";
  progressEl.textContent = "Your Score: " + score + " / " + questions.length;
  restartBtn.classList.remove("hidden");
}

restartBtn.addEventListener("click", function () {
  index = 0;
  score = 0;
  restartBtn.classList.add("hidden");
  renderQuestion();
});

renderQuestion();
