const startButton = document.querySelector("#startBtn");
const nextButton = document.querySelector("#nextBtn");
const quizContainerEl = document.querySelector("#quiz-container");
const questionEl = document.querySelector("#question");
const answerBtns = document.querySelector("#answer-buttons");
const end = document.querySelector("#end");
const containerEl = document.querySelector("#container");
const controls = document.querySelector("#controls");

var showElement = (element) => element.style.display = 'block';
var hideElement = (element) => element.style.display = 'none';


let shuffledQuestions, currentQuestionIndex
let totalTime = 8;
let totalTimeInterval;

const questions = [
    {
        question: "What does API stand for?",
        answers: [
            { text: "American Pizza Initiative", correct: false},
            { text: "Amazing Products International", correct:false},
            { text: "Argumentative Property Inspector", correct: false},
            { text: "Application Program Interface", correct: true},
        ]
    },
    {
        question: "Which of the following is written in Camelcase?",
        answers: [
            { text: "GetElementById", correct: false},
            { text: "getelementbyID", correct:false},
            { text: "getElementById", correct: true},
            { text: "GETELEMENTBYID", correct: false},
        ]
    },
    {
        question: "Which programming language controls the style and appearance of a web page?",
        answers: [
            { text: "CSS", correct: true},
            { text: "Javascript", correct:false},
            { text: "HTML", correct: false},
            { text: "Gmail", correct: false}
        ]
    }
]

startBtn.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

function startGame() {
    console.log("HEAH WE GO AGIN MUTHURFUCKUR!")
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    quizContainerEl.classList.remove('hide')
    displayTime()
    startTimer()
    setNextQuestion()
}

function displayTime() {
    timeRemaining.textContent = totalTime;
}

function startTimer() {
    totalTimeInterval = setInterval(function() {
        totalTime--;
        displayTime();
        checkTime();
    }, 1000);
}

function checkTime() {
    if (totalTime <= 0) {
        totalTime = 0;
        endGame();
    }
}

function endGame() {
    clearInterval(totalTimeInterval);    
    showElement(end);
    clearElement(containerEl);
    displayScore();
    setEndHeading();
}

function displayScore() {
    score.textContent = totalTime;
}

function setEndHeading() {
    if (totalTime === 0) {
        endTitle.textContent = "Time's Up!"
    } else {
        endTitle.textContent = "Congratulations!"
    }
    clearQuiz();
}

function clearQuiz() {
    containerEl.style.display = "none";
}


function processInput(event) {
    event.preventDefault();
    const initials = initials.value.toUpperCase();

    if (isInputValid(initials)) {
        const score = totalTime;
        const highScoreEntry = getNewHighScoreEntry(initials, score);
        saveHighScoreEntry(highScoreEntry);
        window.location.href="./highscores_redux.html"
    }
}

function getNewHighScoreEntry(initials, score) {
    const entry = {
        intials: initials,
        score: score,
    }
    return;entry
}

function isInputValid(initials) {
    let errorMessage = "";
    errorMessage = "Invalid - cannot submit an empty form!";
    displayFormError(errorMessage);
    return false;
// } if (initials.match(/[a-z]/ig)) {
//     errorMessage = "Uppercase letters only!"
//     displayFormError(errorMessage);
//     return false;
// } else {
//     return true;
}

function displayFormError() {
    errorMessage.textContent = errorMessage;
    if (!initials.classList.contains("error")) {
        initials.classList.add("error");
    }
}

function saveHighScoreEntry(highScoreEntry) {
    const currentScores = getScoreList();
    placeEntryInHighScoreList(highScoreEntry, currentScores);
    localStorage.setItem('scoreList', JSON.stringify(currentScores));
}

function getScoreList() {
    const currentScores = localStorage.getItem('scoreList');
    if(currentScores) {
        return JSON.parse(currentScores);
    } else {
        return [];
    }
}

function placeEntryInHighScoreList(newEntry, scoreList) {
    const newScoreIndex = getNewScoreIndex(newEntry, scoreList);
    scoreList.splice(newScoreIndex, 0, newEntry);
}

function getNewScoreIndex(newEntry, scoreList) {
    if (scoreList.length > 0) {
        for (let i =0; i < scoreList.length; i++) {
            if (scoreList[i].score <= newEntry.score) {
                return i;
            }
        }
    }
    return scoreList.length;
}



function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionEl.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct 
        }
        button.addEventListener('click', selectAnswer)
        answerBtns.appendChild(button)
    })
}

function resetState() {
    nextButton.classList.add('hide')
    while (answerBtns.firstChild) {
        answerBtns.removeChild
        (answerBtns.firstChild)
    }

}

function selectAnswer(e) {
    const selectedBtn = e.target
    const correct = selectedBtn.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerBtns.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex +1) {
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}






















































    



