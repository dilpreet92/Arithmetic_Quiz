function Question(randomNumberRange) {
  this.firstNumber = this.getRandomNumber(randomNumberRange);
  this.secondNumber = this.getRandomNumber(randomNumberRange);
  this.operator = this.getOperator();
  this.answer = parseInt(this.getAnswer());
  this.getString = this.getQuestionString();
}

Question.prototype.getRandomNumber = function(value) {
  return (Math.floor((Math.random() * value) + 1));
};

Question.prototype.getOperator = function() {
  var operatorArray = [' ','+', '-', '/', '*'];
  return(operatorArray[this.getRandomNumber(4)]);
};

Question.prototype.getAnswer = function() {
  switch(this.operator) {
    case "+" :
      return (this.firstNumber + this.secondNumber);
    case "-" :
      return (this.firstNumber - this.secondNumber);
    case "*" :
      return (this.firstNumber * this.secondNumber);
    case "/" :
      return (this.firstNumber / this.secondNumber);      
  };
};

Question.prototype.getQuestionString = function() {
  return (this.firstNumber+ " " +this.operator+ " " +this.secondNumber);
};