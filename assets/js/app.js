
    
var trivia = {
initialScreen: "",
correctCounter: 0,
inCorrectCounter: 0,
unAnsweredCounter: 0,
gameHTML: "",

questionsArray: [
"Which player has played the most games as a member of the Chicago Blackhawks?", "Which of the following players has never won the Art Ross Trophy, the annual award given to the player with the most points in the regular season?", "Who has never been head coach of the Blackhawks?", "Who is the Blackhawks all-time leader in penalty minutes?", "Which player has not won Rookie of the Year as a member of the Blackhawks?","Which player, widely regarded as the best defenseman of all time, ended his Hall of Fame career on the Blackhawks?","Who has scored the most powerplay goals as a member of the Blackhawks?","What is the official listed capacity of the United Center?"],
answerArray: [
            ["Bobby Hull", "Brent Seabrook", "Stan Mikita", "Denis Savard"], ["Patrick Kane", "Roy Conacher", "Bobby Hull", "Jonathan Toews"], ["Alpo Suhonen", "Scotty Bowman", "Mike Keenan", "Lorne Molleken"], ["Bob Probert", "Keith Magnuson", "Chris Chelios", "Dave Manson"], ["Artemi Panarin", "Ed Belfour", "Steve Larmer", "Duncan Keith"],["Bobby Orr", "Chris Chelios", "Pierre Pilote", "Paul Coffey"],["Jeremy Roenick", "Steve Larmer","Tony Amonte", "Eric Daze"],["18,555", "19,717", "20,240", "22,259"]],
correctAnswers: [
              "C. Stan Mikita", "D. Jonathan Toews", "B. Scotty Bowman", "C. Chris Chelios", "D. Duncan Keith", "A. Bobby Orr", "B. Steve Larmer", "B. 19,717"],
imageArray: [
"<img class='center-block img-right' src='assets/images/Mikita.gif'>", "<img class='center-block img-right' src='assets/images/captain.gif'>", "<img class='center-block img-right' src='assets/images/bowman.gif'>", "<img class='center-block img-right' src='assets/images/chelios.gif'>", "<img class='center-block img-right' src='assets/images/duncan.gif'>","<img class='center-block img-right' src='assets/images/orr.gif'>", "<img class='center-block img-right' src='assets/images/larmer.gif'>", "<img class='center-block img-right' src='assets/images/unitedcenter.gif'>"],

clock: "",
questionCounter: 0,
timeCounter: 10,
};

var questionCount = 0
var correctAnswers = 0
var wrongAnswers = 0

var questionNumber = 0;

$( document ).ready(function(){

function startScreen(){

trivia.initialScreen = "<p class='text-center main-button'><a class='btn btn-primary btn-lg start-button text-center' href='#'>PLAY</a></p>";

$(".main-area").html(trivia.initialScreen);
};

function timer(){
trivia.clock = setInterval(tenSeconds, 1000);
function tenSeconds(){
if(trivia.timeCounter === 0){
  timeOutLoss();
  clearInterval(trivia.clock);
}
if(trivia.timeCounter > 0) {
  trivia.timeCounter --;
}
$(".timer").html(trivia.timeCounter);
}
};

function wait(){
if(trivia.questionCounter < 7) {
trivia.questionCounter ++;
generateHTML();
trivia.timeCounter = 10;
timer();
}
else if (trivia.questionCounter === trivia.questionsArray.length - 1) {
finalScreen();
}
};

function win(){
trivia.correctCounter ++;
trivia.gameHTML = "<p class='text-center'> Time Remaining: <span class='timer'>" + trivia.timeCounter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + trivia.correctAnswers[trivia.questionCounter] + "</p>" + trivia.imageArray[trivia.questionCounter];
$(".main-area").html(trivia.gameHTML);
setTimeout(wait, 5000);
};

function loss(){
trivia.inCorrectCounter ++;
trivia.gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + trivia.timeCounter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ trivia.correctAnswers[trivia.questionCounter] + "</p>" + trivia.imageArray[trivia.questionCounter];
$(".main-area").html(trivia.gameHTML);
setTimeout(wait, 5000);
};

function timeOutLoss(){
trivia.unAnsweredCounter ++;
trivia.gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + trivia.timeCounter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + trivia.correctAnswers[trivia.questionCounter] + "</p>" + trivia.imageArray[trivia.questionCounter];
$(".main-area").html(trivia.gameHTML);
setTimeout(wait, 5000);
};

function finalScreen(){
trivia.gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + trivia.timeCounter + "</span></p>" + "<p class='text-center'>All done!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + trivia.correctCounter + "</p>" + "<p>Wrong Answers: " + trivia.inCorrectCounter + "</p>" + "<p>Unanswered: " + trivia.unAnsweredCounter + "</p>" 
$(".main-area").html(trivia.gameHTML);
};

function resetGame(){
trivia.questionCounter = 0;
trivia.correctCounter = 0;
trivia.inCorrectCounter = 0;
trivia.unAnsweredCounter = 0;
trivia.timeCounter = 10;
generateHTML();
timer();
};

function generateHTML(){
trivia.gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'></span></p><p class='text-center'>" + trivia.questionsArray[trivia.questionCounter] + "</p><button class='first-answer answer'>A. " + trivia.answerArray[trivia.questionCounter][0] + "</button><br><button class='answer'>B. "+trivia.answerArray[trivia.questionCounter][1]+"</button><br><button class='answer'>C. "+trivia.answerArray[trivia.questionCounter][2]+"</button><br><button class='answer'>D. "+trivia.answerArray[trivia.questionCounter][3]+"</button>";
$(".main-area").html(trivia.gameHTML);
}



startScreen();


$("body").on("click", ".start-button", function(event){
event.preventDefault();
generateHTML();
$("#logo").toggle(2000);
$("#rules").toggle(2000)
$("#game").add(2000)
timer();
}); 

$("body").on("click", ".answer", function(event){

selectedAnswer = $(this).text();
if(selectedAnswer === trivia.correctAnswers[trivia.questionCounter]) {

    clearInterval(trivia.clock);
    win();
}

else {

    clearInterval(trivia.clock);
    loss();
}
}); 


