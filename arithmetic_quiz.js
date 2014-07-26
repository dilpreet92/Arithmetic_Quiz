function CreateQuiz(getElements) {
  this.number1Element = getElements.number1Element;
  this.number2Element = getElements.number2Element;
  this.operatorElement = getElements.operatorElement;
  this.answerTextElement = getElements.answerTextElement;
  this.answerButtonElement = getElements.answerButtonElement;
  this.count = 0;
  this.correctAnswers = 0;
  this.answer = 0;
}

CreateQuiz.prototype.init = function() {
  this.createAssignment();
  this.bindEvents();
};

CreateQuiz.prototype.createRandomNumber = function(value) {
  return (Math.floor((Math.random() * value) + 1));
}

CreateQuiz.prototype.createAssignment = function() {
  this.count++;
  $("h2").text("Question No  : " + this.count);
  this.number1Element.text(this.createRandomNumber(20));
  this.number2Element.text(this.createRandomNumber(20));
  var operator = this.createRandomNumber(4);
  switch(operator) {
    case 1 :
    this.operatorElement.text("+");
    break; 
    case 2 :
    this.operatorElement.text("-");
    break
    case 3 :
    this.operatorElement.text("*");
    break
    case 4 :
    this.operatorElement.text("/");
  }
};

CreateQuiz.prototype.isAnswerValid = function(currentAnswer) {
  this.answer = parseInt(eval(parseInt(this.number1Element.text()) + (this.operatorElement.text()) + parseInt(this.number2Element.text())));
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
    if(_this.count >= 20) {
      e.preventDefault();
      alert("Thanks For Giving Test " + " No. of Correct Answered was: " +_this.correctAnswers);
    }
    else {
      _this.showScore();
      _this.createAssignment();
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