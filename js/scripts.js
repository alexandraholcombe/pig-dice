//back-end (business logic)

function Player (name, currentScore, totalScore) {
  this.playerName = name,
  this.currentScore = currentScore,
  this.totalScore = totalScore
}

var player1 = new Player("Player 1", 0, 0);
var player2 = new Player("Player 2", 0, 0);

var diceRoll = function() {
  return Math.floor(Math.random() * 6) + 1;
}

var scoreChecker = function(current, total) {
  if ((current + total) >= 100) {
    //pop the winner div
  }
}
//front-end (UI)

$(document).ready(function() {
  $("#p1-die, #p2-die").text(0);

  var togglePlayerDiv = function(string) {
    setTimeout (function() {
      if (confirm(string)) {
        $("#player-2-container .overlay, #player-1-container .overlay").toggle();
      };
    }, 100);
  }

  $("#p1-current-score").text(player1.currentScore);
  $("#p1-total-score").text(player1.totalScore);
  $("#p2-current-score").text(player2.currentScore);
  $("#p2-total-score").text(player2.currentScore);
  $(".p1-roll").click(function() {
    $("#player-2-container .overlay").show();
    var rollResult = diceRoll();
    if (rollResult === 1) {
      player1.currentScore = 0;
      $("#p1-current-score").text(player1.currentScore);
      $("#p1-die").text("J");
      togglePlayerDiv ("Turn over, no change to total score");
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
    togglePlayerDiv("End of turn. Total Score:" + player1.totalScore);
  });
});
