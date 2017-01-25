//back-end (business logic)

function Player (currentScore, totalScore) {
  this.currentScore = currentScore,
  this.totalScore = totalScore
}

var player1 = new Player(0, 0);

var diceRoll = function() {
  return Math.floor(Math.random() * 6) + 1;
}



//front-end (UI)

$(document).ready(function() {
  $(".p1-roll").click(function() {
    var rollResult = diceRoll();
    console.log(rollResult);
  });
});
