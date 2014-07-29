function CreateQuiz(elements) {
  this.number1Element = elements.number1Element;
  this.number2Element = elements.number2Element;
  this.operatorElement = elements.operatorElement;
  this.answerTextElement = elements.answerTextElement;
  this.answerButtonElement = elements.answerButtonElement;
  this.currentQuestionNumber = 0;
  this.correctAnswers = 0;
  this.answer = 0;
}

CreateQuiz.prototype.operatorArray =  ['+', '-', '/', '*'];

CreateQuiz.prototype.init = function() {
  this.createQuestion();
  this.bindEvents();
};

CreateQuiz.prototype.createRandomNumber = function(value) {
  return (Math.floor((Math.random() * value) + 1));
}

CreateQuiz.prototype.createQuestion = function() {
  this.currentQuestionNumber++;
  $("h2").text("Question No  : " + this.currentQuestionNumber);
  this.answerTextElement.val("");
  this.number1Element.text(this.createRandomNumber(20));
  this.number2Element.text(this.createRandomNumber(20));
  this.operatorElement.text(this.operatorArray[this.createRandomNumber(4)]);
};

CreateQuiz.prototype.covertToInteger = function(value) {
  return (parseInt(value));
};

CreateQuiz.prototype.isAnswerValid = function(currentAnswer) {
  this.answer = this.covertToInteger(eval(this.covertToInteger(this.number1Element.text()) + (this.operatorElement.text()) + this.covertToInteger(this.number2Element.text())));
  if(this.answer == currentAnswer) {
    return true;
  }
  else {
    return false;
  }
};

CreateQuiz.prototype.showScore = function() {
  $("#finalscore").text("No. of Correct Answers : " +this.correctAnswers + " Answer for last Question was : " +this.answer);
};

CreateQuiz.prototype.bindEvents = function() {
  var _this = this;
  this.answerButtonElement.on("click",function(e) {
    if (_this.isAnswerValid(_this.answerTextElement.val())) {
      _this.correctAnswers++;
    }
    if(_this.currentQuestionNumber >= 20) {
      e.preventDefault();
      alert("Thanks For Giving Test " + " No. of Correct Answered was: " +_this.correctAnswers);
    }
    else {
      _this.showScore();
      _this.createQuestion();
    } 
  });
};

$(document).ready(function() {
  var elements = {
    "number1Element" : $("#number1"),
    "number2Element" : $("#number2"),
    "operatorElement" : $("#operator"),
    "answerTextElement" : $("#answerText"),
    "answerButtonElement" : $("#answerButton")
  };
  var quizObj = new CreateQuiz(elements);
  quizObj.init();
});