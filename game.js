document.getElementById('timer').innerHTML =
    001 + ":" + 00;
startTimer();

function startTimer() {
    var presentTime = document.getElementById('timer').innerHTML;
    var timeArray = presentTime.split(/[:]+/);
    var m = timeArray[0];
    var s = checkSecond((timeArray[1] - 1));
    if (s == 59) { m = m - 1 }
    if (m < 0) {
        alert('Time is Up!');
        return;
    }

    document.getElementById('timer').innerHTML =
        m + ":" + s;
    console.log(m)
    setTimeout(startTimer, 1000);
}

function checkSecond(sec) {
    if (sec < 10 && sec >= 0) { sec = "0" + sec };
    if (sec < 0) { sec = "59" };
    return sec;
};

const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const scoreText = document.getElementById('score');

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

//List of questions
var questions = [
    {
        question: "Inside the HTML which tag do we use for Javascript?",
        choice1: "<javascript>",
        choice2: "<style.js>",
        choice3: "<script>",
        answer: 3
    },

    {
        question: "How do you write 'Hello!' in an alert box?",
        choice1: "msgBox('Hello!');",
        choice2: "alert('Hello!');",
        choice3: "alertBox('Hello!');",
        answer: 2

    },

    {
        question: "The condition of an if/else statement is enclosed within ____.",
        choice1: "quotes",
        choice2: "curly brackets",
        choice3: "parantheses",
        answer: 3
    },

    {
        question: "Commonly used data types DO NOT include:",
        choice1: "alerts",
        choice2: "strings",
        choice3: "booleans",
        answer: 1
    },

    {
        question: "What is the correct syntax referring to the external script called 'xxx.js'?",
        choice1: "<script href='xxx.js'>",
        choice2: "<script src='xxx.js'>",
        choice3: "<script name='xxx.js'>",
        answer: 2
    }
];

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuesions = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {
    if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem("mostRecentScore", score);
        //go to the end page
        return window.location.assign('end.html');
    }
    questionCounter++;
    const questionIndex = Math.floor(Math.random() * availableQuesions.length);
    currentQuestion = availableQuesions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuesions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        const classToApply =
            selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

        if (classToApply === "correct") {
            incrementScore(CORRECT_BONUS);

         }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;


};

startGame();