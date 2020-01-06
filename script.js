var contentBox = document.querySelector("#content-div");
var qObj = questions;

drawOpener();
var qNum = qObj.length;
var target = 0;
var stats = 0;

function runQuiz() {
    //empty the div
    contentBox.innerHTML = "";
    //run through qObj array and print all the questions
    drawQuestion(qObj[target]);
}

//draws quetion, waits for response, and then returns whether it was a correct or incorrect answer
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
            if(target < qNum - 1) {
                target++;
                runQuiz();
            } else {
                drawHighscores();
            }
        }
    })
    contentBox.appendChild(newDiv);
}

function showAnswer(answer) {

    console.log(answer);
}

function drawOpener() {
    //empty div
    contentBox.innerHTML = "";
    //draw elements
    var header = document.createElement("h1");
    header.textContent = "Coding Quiz Challenge";
    var explanation = document.createElement("p");
    explanation.textContent = "Click \"Start Quiz\" to answer the following coding quiz questions. You will have 75 seconds to complete the quiz and your scores will be displayed at the end of the quiz.";
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

function drawHighscores() {
    //empty the div
    contentBox.innerHTML = "";
    //draw current highscores from local storage
    //provide a box to enter initials
    //add this score and the initials to the client local storage
    //call drawOpener
}