//back-end (business logic)

function Player (name, currentScore, totalScore, playerHTML) {
  this.playerName = name,
  this.currentScore = currentScore,
  this.totalScore = totalScore,
  this.playerHTML = playerHTML
}

function PlayerHTML (dieDiv, containerDiv, currentScoreSpan, totalScoreSpan, rollButton, holdButton) {
  this.dieDiv = dieDiv,
  this.containerDiv = containerDiv,
  this.currentScoreSpan = currentScoreSpan,
  this.totalScoreSpan = totalScoreSpan,
  this.rollButton = rollButton,
  this.holdButton = holdButton
}

var player1HTML = new PlayerHTML("#p1-die", "#p1-container", "#p1-current-score", "#p1-total-score", ".p1-roll", ".p1-hold");
var player2HTML = new PlayerHTML("#p2-die", "#p2-container", "#p2-current-score", "#p2-total-score", ".p2-roll", ".p2-hold");

var player1 = new Player("Player 1", 0, 0, player1HTML);
var player2 = new Player("Player 2", 0, 0, player2HTML);

var playersArray = [player1, player2];

var diceRoll = function() {
  return Math.floor(Math.random() * 6) + 1;
};

//front-end (UI)

$(document).ready(function() {
  $("#p1-die, #p2-die").text(0);

//Pops confirmation, then covers previous player and uncovers new player
  var togglePlayerDiv = function(string) {
    setTimeout (function() {
      if (confirm(string)) {
        $("#p2-container .overlay, #p1-container .overlay").toggle();
      };
    }, 100);
  }

//When score reaches over 100, winner div and screen overlay show
  var scoreChecker = function(current, total) {
    if ((current + total) >= 100) {
      $("#screen-overlay").show();
    };
  };

//Initial display of scores
  playersArray.forEach(function(playerVar){
    $(playerVar.playerHTML.currentScoreSpan).text(playerVar.currentScore);
    $(playerVar.playerHTML.totalScoreSpan).text(playerVar.totalScore);
  })

  $(".p1-roll").click(function() {
    $("#p2-container .overlay").show();
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
