var startPage = document.querySelector(".start-quiz");
var startButton = document.querySelector("#start");
var timerElement = document.querySelector(".timer-count");
var qContainer = document.querySelector(".question-container");
var finishEl = document.querySelector(".finish-container");
var finishHeader = document.querySelector("#finish-header");

var timer;
var timerCount;
var questionEl;
var answer;
var correctCounter = 0;

var questions = [
    "Commonly used data types DO NOT include:",
    "The condition in an if/else statement is enclosed within ___.",
    "Arrays in JavaScript can be used to store ____.",
    "String values must be enclosed within ___ when being assigned to variables.",
    "A very useful tool used during development and debugging for printing content to the debugger is:",
];
var choiceA1 = ["1. strings", "2. booleans", "3. alerts", "4. numbers"];
    var q1True = choiceA1[2];
var choiceA2 = ["1. quotes", "2. curly brackets" , "3. parenthesis", "4. square brackets"];
    var q2True = choiceA2[2];
var choiceA3 = ["1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"];
    var q3True = choiceA3[3];
var choiceA4 = ["1. commas", "2. curly brackets", "3. quotes", "4. parenthesis"];
    var q4True = choiceA4[2];
var choiceA5 = ["1. JavaScript", "2. terminal/bash", "3. for loops", "4. console.log"];
    var q5True = choiceA5[3];
var correctAnswer = ["b3", "b3", "b4", "b3", "b4"];
//Object that includes question, choices and correct answer
var qanda = { questions, choices: [choiceA1, choiceA2, choiceA3, choiceA4, choiceA5], correctAnswer};

// Add eventlistener to start Quiz button to call start quiz function on click
startButton.addEventListener("click", startQuiz);

function startQuiz() {
    timerCount = 75;
    startPage.setAttribute('style', 'display: none;');
    startTimer();
    askQuestion();
}

// The setTimer function starts and stops the timer and triggers winGame() and loseGame()
function startTimer() {
    // Sets timer
    timer = setInterval(function() {
      timerCount--;
      timerElement.textContent = timerCount;
      if (timerCount >= 0) {
        // Tests if win condition is met
        if (timerCount > 0) {
          // Clears interval and stops timer
          clearInterval(timer);
        }
      }
      // Tests if time has run out
      if (timerCount === 0) {
        // Clears interval
        clearInterval(timer);
        
      }
    }, 1000);
  }
var i=0;

//create question and 4 answer choices
  function askQuestion() {
    console.log("Ask Q correct = " + correctCounter);
    console.log("Ask Q i is now " + i);
    if (i > questions.length-1) {
      qContainer.setAttribute('style', 'display: none');
      finish();
    } else {
    
    questionEl = document.createElement('h2');
    questionEl.textContent = qanda.questions[i];
    qContainer.appendChild(questionEl);

    btnEl1 = document.createElement("button");
    qContainer.appendChild(btnEl1);
    btnEl2 = document.createElement("button");
    qContainer.appendChild(btnEl2);
    btnEl3 = document.createElement("button");
    qContainer.appendChild(btnEl3);
    btnEl4 = document.createElement("button");
    qContainer.appendChild(btnEl4);

    btnEl1.textContent = qanda.choices[i][0];
    btnEl2.textContent = qanda.choices[i][1];
    btnEl3.textContent = qanda.choices[i][2];
    btnEl4.textContent = qanda.choices[i][3];
    
    i++;
    checkClick ();
    }
  }

  function checkClick() {
    if (btnEl1.addEventListener("click", function(){
      answer = "b1"
      checkAnswer();
    } else if (btnEl2.addEventListener("click", function(){
      checkAnswer(answer="b2");
    })
  }

  // function checkClick() {
  //   btnEl1.addEventListener("click", function(){
  //     checkAnswer(answer="b1");
  //   });
  //   btnEl2.addEventListener("click", function(){
  //     checkAnswer(answer="b2");
  //   });
  //   btnEl3.addEventListener("click", function(){
  //     checkAnswer(answer="b3");
  //   });
  //   btnEl4.addEventListener("click", function(){
  //     checkAnswer(answer="b4");
  //   });
  // }

  function checkAnswer() {
    console.log("answer button clicked " + answer);
    // if (questionEl.textContent === qanda.questions[i] && answer === qanda.correctAnswer[i]) {
      console.log("I is now " + i + " qanda.correctAnswer[i] is " + qanda.correctAnswer[i]);
      if (answer === qanda.correctAnswer[i]) {
      promptEl = document.createElement('p');
      promptEl.textContent = "Answer to previous question was Correct!! ";
      qContainer.appendChild(promptEl);
      correctCounter ++;

      clearQuestionContainer();
      } else {
        promptEl = document.createElement('p');
        promptEl.textContent = "Answer to previous question was Wrong!!";
        qContainer.appendChild(promptEl);
        clearQuestionContainer();
      }
  }

function clearQuestionContainer() {
  qContainer.removeChild(questionEl);
  qContainer.removeChild(btnEl1);
  qContainer.removeChild(btnEl2);
  qContainer.removeChild(btnEl3);
  qContainer.removeChild(btnEl4);
  askQuestion();
}

function finish() {
  results = document.createElement('p');
  results.textContent = "You answered " + correctCounter + " out of 5 questions correct in " + (timerCount - 75) + " seconds.";
  finishHeader.appendChild(results);
}
  }