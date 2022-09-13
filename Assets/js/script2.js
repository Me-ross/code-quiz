var submitButton = document.querySelector("#submit");
var initialInput = document.querySelector("#initial-input");

 // if nothing saved in storage then save empty array
function checkStorage(){

   if(localStorage.getItem('initials') === null){
   localStorage.setItem('initials', '[]');
   }
}

checkStorage();

//listen for the submit button to capture the input data
submitButton.addEventListener('click', function(event){
    event.preventDefault();
    saveInput();
});

function saveInput(){
    //get data from input box
    var newInitials = initialInput.value;

    //get old data and add it to the new data
    var oldInitials = JSON.parse(localStorage.getItem('initials'));
    oldInitials.push(newInitials);

    //save the old and new data to local storage
    localStorage.setItem('initials', JSON.stringify(oldInitials));
}



//-------------scirpt with adding li
// var initialForm = document.querySelector("#initial-form");
// // var initialInput = document.querySelector("#initial-input");
// var initialList = document.querySelector("#score-list");

// var initials =

// //new li for each initial

// checkstorage
// //add submit event to form
// initialForm.addEventListener("submit", function(event){
//     event.preventDefault();
//     saveInitial();
//     var initialsText = initialInput.value;
// })
// console.log(initialInput.value);

// function saveInitial(){

// }
// function checkstorage (){
//     var initialInput = document.getElementById('initial-input').value;
//     if(localStorage.getItem('initials') == null){
//         localStorage.setItem('initials', '[]');
//     }
// }

// function renderInitials() {
//   for (var x = 0; x < initials.length; x++) {
//     var initial = initials[x];
//     var li = document.createElement("li");
//     li.textContent = initial;
//     li.setAttribute("data-index", x);
//     initialList.appendChild(li);
//     console.log(initials);
// }
// }

// //set key in localstorage for initials array
// function storeInitial() {
//     localStorage.setItem("initials", JSON.stringify(initials));

// //add submit event to form
// initialForm.addEventListener("submit", function(event){
//     event.preventDefault();
//     var initialText = initialInput.value;
// })
// console.log(initialInput.value);

// //add new initial to initials array
// initials.push(initialText);

// //store updated initias in local storage
// storeInitial();
// renderInitials();
// }

//_______________________________ current script

// var initialForm = document.querySelector("#initial-form");
// var initial = document.querySelector("#initial");

// //Entering initial for storage and scores
// function enterInitial(){
//   initialForm.addEventListener("submit", function(event){
//   event.preventDefault();

//   var initialText = initial.value;

//   localStorage.setItem("initial", initialText);
//   console.log("initial " + initialText);
//   finishEl.setAttribute('style', 'display: none');

//   highScores();
// })
// }

// //high score display section and option to quit or clear scores
// function highScores() {
//   finishHeader.removeChild(results);

//   highScoresContainer = document.querySelector(".highscores");
//   highScoresContainer.setAttribute('style', 'display: contents;');

//   var initial = localStorage.getItem("initial");
//   var highScoreEl = document.querySelector("#stored-scores");
//   highScoreEl.textContent = initial + (75-timerCount);

//   var clearScoresButton = document.querySelector("#clear-scores");
//   clearScoresButton.addEventListener("click", function(){
//     initial = "";
//     localStorage.setItem("initial", initial);
//     highScoreEl.textContent = initial;
//   })
  
// var goBackButton = document.querySelector("#go-back");
// goBackButton.addEventListener("click", function(){
//   highScoresContainer.setAttribute('style', 'display: none;');
//   startPage.setAttribute('style', 'visibility: visible;');
//   })
// }