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

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

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

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    console.log(availableQuestions);
    getNewQuestion();

};

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter ≥ MAX_QUESTIONS) {
        //go to end page
        return window.location.assign("end.html");
    }

};
questionCounter++;
const questionIndex = Math.floor(Math.random() * availableQuestions.length);
currentQuestion = availableQuestions[questionIndex];
question.innerText = currentQuestion.question;


choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];
        console.log(selectedAnswer);
        getNewQuestion();
    });
});
startGame(); 
