var contentBox = document.querySelector("#content-div");
var scoreButton = document.querySelector("#highscores");
var cardDiv = document.querySelector("#card");
var qObj = questions;

//initialize local storage
var localStorage = window.localStorage;
var scoresArray = [];
localStorage.setItem("scores", JSON.stringify(scoresArray));

//header button
scoreButton.addEventListener("click", drawHighscores);

//draw quiz intro initially
drawOpener();
//variable to make sure we try to print the correct number of questions
var target = 0;
//holds number of correct answers
var stats = 0;

function drawOpener() {
    //empty div and reset counter
    target = 0;
    contentBox.innerHTML = "";
    //draw elements
    var header = document.createElement("h1");
    header.textContent = "Coding Quiz Challenge";
    var explanation = document.createElement("p");
    explanation.textContent = "Click \"Start Quiz\" to answer the following coding quiz questions. You will have 75 seconds to complete the quiz. Your scores will be displayed at the end of the quiz.";
    contentBox.appendChild(header);
    contentBox.appendChild(explanation);
    //draw start button and add event listener
    var startButton = document.createElement("button");
    startButton.textContent = "Start Quiz";
    startButton.setAttribute("id", "button")
    startButton.addEventListener("click", function() {
        //start the quiz
        runQuiz();
    });
    contentBox.appendChild(startButton);
}

//function to pause the program between printing questions and controls the drawQuestion function
function runQuiz() {
    //empty the div
    contentBox.innerHTML = "";
    //run through qObj array and print all the questions
    drawQuestion(qObj[target]);
}

//draws quetion, waits for response, and then determines if the answer was correct or not
function drawQuestion(question) {
    //draw questions title
    var title = question.title;
    var qHeader = document.createElement("h1");
    qHeader.textContent = title;
    contentBox.appendChild(qHeader);
    //draw question choices
    var choices = question.choices;
    //div to hold the questions
    var newDiv = document.createElement("div");
    for(var i = 0; i < choices.length; i++) {
        var choiceButton = document.createElement("button");
        choiceButton.textContent = (i+1) + ". " + choices[i];
        choiceButton.setAttribute("id", "button");
        newDiv.appendChild(choiceButton);
    }
    //append the buttons div
    newDiv.addEventListener("click", function(event) {
        if(event.target.id === "button") {
            if(event.target.innerHTML.includes(question.answer)) {
                showAnswer("c");
            } else {
                showAnswer("w");
            }
            if(target < qObj.length - 1) {
                target++;
                runQuiz();
            } else {
                drawFinish();
            }
        }
    })
    contentBox.appendChild(newDiv);
}

//draws the users score and submit page page
function drawFinish() {
    //empty the div
    contentBox.innerHTML = "";
    //draw current highscores from local storage
    var header = document.createElement("h1");
    header.textContent = "Highscores";
    var score = document.createElement("p");
    score.textContent = "Your high score is "
    //provide a box to enter initials
    var textBox = document.createElement("label");
    textBox.textContent = "Enter Initials:"
    var textArea = document.createElement("input")
    textArea.setAttribute("type", "text");
    textArea.setAttribute("id", "text-area");
    textBox.appendChild(textArea);
    console.log(textArea);
    //create button
    var submitButton = document.createElement("button");
    submitButton.textContent = "Submit";
    submitButton.setAttribute("id", "button");
    //add event listeners to the buttons
    submitButton.addEventListener("click", function() {
        var userScore = getUserScore(textArea.value);
        addScore(userScore);
        drawHighscores();
    })
    //append the objects
    contentBox.appendChild(header);
    contentBox.appendChild(score);
    contentBox.appendChild(textBox);
    contentBox.appendChild(submitButton);
    //add this score and the initials to the client local storage
    //back and clear highscores button
}

function drawHighscores() {
    //empty the div
    contentBox.innerHTML = "";
    //draw header
    var header = document.createElement("h1");
    header.textContent = "Highscores";
    //draw buttons
    var backButton = document.createElement("button");
    var clearButton = document.createElement("button");
    backButton.textContent = "Back";
    clearButton.textContent = "Clear Highscores";
    backButton.setAttribute("id", "button");
    clearButton.setAttribute("id", "button");
    //add listeners
    backButton.addEventListener("click", drawOpener);
    //append objects
    contentBox.appendChild(header);
    printScores();
    contentBox.appendChild(backButton);
    contentBox.appendChild(clearButton);
}

//displays a short blurb after a question is answer showing whether the user was correct or not
function showAnswer(answer) {
    var card = document.createElement("h2");
    if(answer === "c") {
        card.textContent = "Correct!";
    } else {
        card.textContent = "Wrong!";
    }
    card.setAttribute("style", "border-top: 2px solid grey");
    cardDiv.appendChild(card);
    setTimeout(function() {
        cardDiv.innerHTML = "";
    }, 1000);
}

//create users score as a string and returns it
function getUserScore(initials) {
    var timeLeft = 0;
    var score = initials + ": " + stats + " Correct " + (qObj.length - stats) + " Wrong " + timeLeft + " Seconds Left";
    return score;
}

//add to highscores list
function addScore(score) {
    var scores = JSON.parse(localStorage.getItem("scores"));
    scores[scores.length] = score;
    localStorage.setItem("scores", JSON.stringify(scores));
}

//retrieve scores from local storage
function printScores() {
    var scores = JSON.parse(localStorage.getItem("scores"));
    for(var i = 0; i < scores.length; i++) {
        var scoreTag = document.createElement("h2");
        scoreTag.textContent = scores[i];
        contentBox.appendChild(scoreTag);
    }
}

//starts timer countdown
function startTimer() {

}