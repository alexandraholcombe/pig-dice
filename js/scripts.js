//back-end (business logic)

function Player (currentScore, totalScore) {
  this.currentScore = currentScore,
  this.totalScore = totalScore
}

var player1 = new Player(0, 0);

var diceRoll = function() {
  return Math.floor(Math.random() * 6) + 1;
}

var togglePlayerDiv = function() {
  if (confirm("Turn over, no change to score")) {
    $("#player-2-container .overlay, #player-1-container .overlay").toggle();
  }
}
//front-end (UI)

$(document).ready(function() {

  $("#p1-current-score").text(player1.currentScore);
  $("#p1-total-score").text(player1.totalScore);

  $(".p1-roll").click(function() {
    $("#player-2-container .overlay").show();
    var rollResult = diceRoll();
    if (rollResult === 1) {
      player1.currentScore = 0;
      $("#p1-current-score").text(player1.currentScore);
      $("#p1-die").text(rollResult);
      setTimeout(function() {
        togglePlayerDiv();
      }, 100);
  } else {
    player1.currentScore += rollResult;
    $("#p1-current-score").text(player1.currentScore);
    $("#p1-die").text(rollResult);
  }
});
$(".p1-hold").click(function() {
  player1.totalScore += player1.currentScore;
  $("#p1-total-score").text(player1.totalScore);
  player1.currentScore = 0;
  $("#p1-current-score").text(player1.currentScore);
  setTimeout(function() {
    alert("End of turn. Total Score:" + player1.totalScore);
  }, 100);
});
});
