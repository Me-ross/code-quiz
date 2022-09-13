var startPage = document.querySelector(".start-quiz");
var startButton = document.querySelector("#start");
var timerElement = document.querySelector(".timer-count");
var qContainer = document.querySelector(".question-container");
var finishEl = document.querySelector(".finish-container");
var finishHeader = document.querySelector("#finish-header");
var submitButton = document.querySelector("#submit");

var timer;
var timerCount;
var questionEl;
var answer;
var correctCounter = 0;
var correct;
var wrong;
var loseTen;

// setting values for question array, answer choices & correct answers
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
    qContainer.setAttribute('style', 'visibility: visible;');
    i=0;
    startTimer();
    askQuestion();
}


// The setTimer function starts and stops the timer
function startTimer() {
    // Sets timer
    timer = setInterval(function() {
      timerCount--;
      timerElement.textContent = timerCount;
      if (timerCount >= 0) {
        // Tests if answer wrong to deduct 10 second from timer
        if (loseTen && timerCount > 0) {
          timerCount = timerCount - 10;
          loseTen = "";
        }
      }
      // Tests if time has run out
      if (timerCount === 0 || timerCount < 0) {
        // Clears interval and goes to finish screen
        clearInterval(timer);
        qContainer.setAttribute('style', 'display: none');
        finish();
      }
    }, 1000);
  }

//create question and 4 answer choices
  function askQuestion() {
    if (i > questions.length-1) {
      qContainer.setAttribute('style', 'display: none');
        if (correct) {
          promptEl.textContent = "Answer to previous question was Correct!! ";
          correct ="";
        } else if (wrong) {
          promptEl.textContent = "Answer to previous question was Wrong!!";
          wrong ="";
          loseTen = true;
        }
      clearInterval(timer);  
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
    promptEl = document.createElement('p');
    qContainer.appendChild(promptEl);

    btnEl1.textContent = qanda.choices[i][0];
    btnEl2.textContent = qanda.choices[i][1];
    btnEl3.textContent = qanda.choices[i][2];
    btnEl4.textContent = qanda.choices[i][3];
    
    i++;
    // tells user if their answer is wrong or correct
    if (correct) {
      promptEl.textContent = "Answer to previous question was Correct!! ";
      correct = "";
    } else if (wrong) {
      promptEl.textContent = "Answer to previous question was Wrong!!";
      wrong ="";
      loseTen = true;
    }
    checkClick ();
    }
  }

  // checks click against correct answer
  function checkClick() {
    btnEl1.addEventListener("click", function(){
      qContainer.removeChild(promptEl);
      checkAnswer(answer="b1");
    });
    btnEl2.addEventListener("click", function(){
      qContainer.removeChild(promptEl);
      checkAnswer(answer="b2");
    });
    btnEl3.addEventListener("click", function(){
      qContainer.removeChild(promptEl);
      checkAnswer(answer="b3");
    });
    btnEl4.addEventListener("click", function(){
      qContainer.removeChild(promptEl);
      checkAnswer(answer="b4");
    });
  }

  //sets the value of correct or wrong
  function checkAnswer() {
    if (answer === qanda.correctAnswer[i-1]) {
      correct = true;
      correctCounter ++;

      clearQuestionContainer();
      } else {
        wrong = true;
        clearQuestionContainer();
    }
  }

// question section has to clear to move to the finish section
function clearQuestionContainer() {
  qContainer.removeChild(questionEl);
  qContainer.removeChild(btnEl1);
  qContainer.removeChild(btnEl2);
  qContainer.removeChild(btnEl3);
  qContainer.removeChild(btnEl4);

  askQuestion();
}

// results of the quiz
function finish() {
  finishEl.setAttribute('style', 'display: contents;');
  results = document.createElement('p');
  results.textContent = "You answered " + correctCounter + " out of 5 questions correct in " + (75 - timerCount) + " seconds.";
  finishHeader.appendChild(results);
  timerElement.textContent = 0;

  checkStorage();
}

var submitButton = document.querySelector("#submit");
var initialInput = document.querySelector("#initial-input");

 // if nothing saved in storage then save empty array
 function checkStorage(){

  if(localStorage.getItem('initials') === null){
  localStorage.setItem('initials', '[]');
  }
}

//listen for the submit button to capture the input data
submitButton.addEventListener('click', function(event){
  event.preventDefault();
  saveInitial();
});

function saveInitial(){
  //get data from input box
  var newInitials = initialInput.value;

  //get old data and add it to the new data
  var oldInitials = JSON.parse(localStorage.getItem('initials'));
  oldInitials.push(newInitials);

  //save the old and new data to local storage
  localStorage.setItem('initials', JSON.stringify(oldInitials));

  //clear finish container section
  finishEl.setAttribute('style', 'display: none');

  highScores();
}

var highScoreEl = document.querySelector("#stored-scores");
var clearScoresButton = document.querySelector("#clear-scores");
var goBackButton = document.querySelector("#go-back");

//high score display section and option to quit or clear scores
function highScores() {
  finishHeader.removeChild(results);

  highScoresContainer = document.querySelector(".highscores");
  highScoresContainer.setAttribute('style', 'display: contents;');

  highScoreEl.innerHTML = JSON.parse(localStorage.getItem('initials'));

  clearScoresButton.addEventListener("click", function(){
    localStorage.setItem('initials', '[]');
    highScoreEl.setAttribute('style', 'display: none;');

  }) 
  goBackButton.addEventListener("click", function() {
       highScoresContainer.setAttribute('style', 'display: none;');
        startPage.setAttribute('style', 'visibility: visible;');
     })
}