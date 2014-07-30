function Quiz(elements, questionCount, randomNumberRange) {
  this.questionElement = elements.questionElement;
  this.answerTextElement = elements.answerTextElement;
  this.answerButtonElement = elements.answerButtonElement;
  this.questionNumberContainer = elements.questionNumberContainer;
  this.showScoreContainer = elements.showScoreContainer;
  this.totalQuestions = questionCount;
  this.currentQuestion = 0;
  this.randomNumberRange = randomNumberRange;
  this.correctAnswers = 0;
  this.questions = [];
}

Quiz.prototype.init = function() {
  this.getQuestion();
  this.bindEvents();
};

Quiz.prototype.getQuestionNumber = function() {
  return (this.currentQuestion + 1);
};

Quiz.prototype.displayQuestion = function(currentQuestionObj) {
  this.questionNumberContainer.text("Question No  : " + this.getQuestionNumber());
  this.answerTextElement.val("");
  this.questionElement.text(currentQuestionObj.getString);
};

Quiz.prototype.getQuestion = function() {
  var questionObj = new Question(this.randomNumberRange);
  this.questions.push(questionObj);
  this.displayQuestion(questionObj);
};

Quiz.prototype.isAnswerValid = function(userAnswer) {
  this.questions[this.currentQuestion]["userAnswer"] = userAnswer;
  if(this.questions[this.currentQuestion].answer == parseInt(userAnswer)) {
    return true;
  }
  else {
    return false;
  }
};

Quiz.prototype.showFinalScore = function() {
  alert("Your Final Score : " + this.correctAnswers );
  var finalResult = [];
  for(var i = 0; i < this.questions.length; i++) {
    if(this.questions[i].answer != this.questions[i].userAnswer) {
      finalResult.push("Question: " + (i+1) + " Question String : " + this.questions[i].getString+ " Correct Answer : " + this.questions[i].answer + " Your Answer " + this.questions[i].userAnswer);
    }
  }
  document.write("Following are the wrong Answers :<br>")
  for (var i in finalResult) {
    document.write(finalResult[i] + "<br>");
  }
};

Quiz.prototype.showScore = function() {
  this.showScoreContainer.text("No. of Correct Answers : " +this.correctAnswers + " Answer for last Question was : " +this.questions[this.currentQuestion].answer);
};

Quiz.prototype.bindEvents = function() {
  var _this = this;
  this.answerButtonElement.on("click",function(e) {
    if (_this.isAnswerValid(_this.answerTextElement.val())) {
      _this.correctAnswers++;
    }
    if(_this.questions.length < _this.totalQuestions) {
      _this.showScore();
      _this.currentQuestion++;
      _this.getQuestion();
    }
    else {
      _this.showScore();
      _this.showFinalScore();
      alert("Thanks for Giving test");
    }
  });
};

$(document).ready(function() {
  var elements = {
    "questionElement" : $("#question"),
    "answerTextElement" : $("#answerText"),
    "answerButtonElement" : $("#answerButton"),
    "questionNumberContainer" : $("#questionNumber"),
    "showScoreContainer" : $("#finalscore")
  };
  var questionCount = 20,
      randomNumberRange = 20;
  var quizObj = new Quiz(elements, questionCount, randomNumberRange);
  quizObj.init();
});