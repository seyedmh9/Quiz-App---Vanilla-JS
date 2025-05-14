const loader = document.getElementById("loader");
const questionsCon = document.querySelector(".Container");
const nextBtn = document.querySelector(".next-btn");
const finishBtn = document.querySelector(".finish-btn");
const answerBtns = document.querySelectorAll(".answer-btn");
const alertEl = document.querySelector(".alert-data");

let difficultyLevel;
JSON.parse(localStorage.getItem("difficultylevel")) != null
  ? (difficultyLevel = JSON.parse(localStorage.getItem("difficultylevel")))
  : (difficultyLevel = "medium");
const questionCounter =
  document.querySelector(".header-title_left").children[1];
const scorCounter = document.querySelector(".header-title_right").children[1];

const Url = `https://opentdb.com/api.php?amount=10&difficulty=${difficultyLevel}&type=multiple`;
let questionsData;

const api = async () => {
  let res;
  let data;
  try {
    res = await fetch(Url);
    data = await res.json();
  } catch (error) {
    alertEl.style.display = "block";
    alertEl.style.animationName = "moveFromTop";
    console.log("error");
  }
  if (data.results.length > 0) {
    loader.style.display = "none";
    questionsCon.style.display = "flex";
    questionsCon.classList.add("moveFromTop");
    questionsData = await data.results;
    questionHndl(questionsData);
  }
};

const randomFun = (Coefficient) => {
  const randomNum = Math.floor(Math.random() * Coefficient);
  return randomNum;
};

let counter = 0;
let scor = 0;
const questionHndl = (questions) => {
  try {
    const question = questions[counter];
    const { incorrect_answers, correct_answer } = question;
    const answers = incorrect_answers.concat(correct_answer);
    const questionBox = document.querySelector(".question-title_text");
    answerBtns.forEach((btn) => {
      const randomIndex = randomFun(answers.length);
      btn.innerText = answers[randomIndex];
      answers.splice(randomIndex, 1);
    });
    questionBox.innerText = question.question;
    questionCounter.innerText = counter + 1;
    counter++;
  } catch (error) {
    console.log(error);
  }
  if (counter + 1 > 10) {
    nextBtn.style.display = "none";
  }
};

let selected = false;

const checkQuestionHndl = (event) => {
  let correctAnswer;
  const selectAnswer = event.target.innerText;
  if (questionsData != null) {
    correctAnswer = questionsData[counter - 1].correct_answer;
  }

  if (selectAnswer == correctAnswer) {
    scor += 10;
    scorCounter.innerText = scor;
    event.target.style.backgroundColor = "green";
    event.target.style.color = "white";
  } else {
    event.target.style.backgroundColor = "red";
    event.target.style.color = "white";
    answerBtns.forEach((btn) => {
      if (btn.innerText == correctAnswer) {
        btn.style.backgroundColor = "green";
        btn.style.color = "white";
      }
    });
  }
};

api();

nextBtn.addEventListener("click", () => {
  if (questionsData != undefined) {
    questionHndl(questionsData);
    if (selected) {
      answerBtns.forEach((btn) => {
        btn.style.backgroundColor = "#ECEFCA";
        btn.style.color = "#213448";
      });
    }
    selected = false;
  } else {
    console.log("Error!");
  }
});

answerBtns.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    if (!selected) {
      checkQuestionHndl(event);
    }
    selected = true;
  });
});

finishBtn.addEventListener("click", (event) => {
  localStorage.setItem("scor", JSON.stringify(scor));
  window.location.href = "end.html";
});
