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
  $("#screen-overlay, #number-of-players").show();
  $("#one-player").click(function() {
    player2.playerName = "Computer";
    $("#screen-overlay, #number-of-players").hide();
  });
  $("#two-player").click(function() {
    $("#screen-overlay, #number-of-players").hide();
  });


  //Pops confirmation, then covers previous player and uncovers new player
  var togglePlayerDiv = function(string) {
    $("#p2-container .overlay, #p1-container .overlay").toggle();
  };

  //When score reaches over 100, winner div and screen overlay show
  var scoreChecker = function(current, total, player) {
    if ((current + total) >= 100) {
      $("#winner-name").text(player);
      $("#p2-container .overlay, #p1-container .overlay").hide();
      $("#screen-overlay").show();
    };
  };

  //When click Play Again, game resets
  $("#play-again").click(function() {
      $("#screen-overlay").hide();
      playersArray.forEach(function(playerVar){
        playerVar.currentScore = 0;
        playerVar.totalScore = 0;
        $(playerVar.playerHTML.currentScoreSpan).text(playerVar.currentScore);
        $(playerVar.playerHTML.totalScoreSpan).text(playerVar.totalScore);
        $("#p1-die, #p2-die").text(0);
      });
    });

  //Initial display of scores
  playersArray.forEach(function(playerVar){
    $(playerVar.playerHTML.currentScoreSpan).text(playerVar.currentScore);
    $(playerVar.playerHTML.totalScoreSpan).text(playerVar.totalScore);

    //Roll on button click
    $(playerVar.playerHTML.rollButton).click(function() {
      // debugger;
      var indexPlayerVar = playersArray.indexOf(playerVar);
      playersArray.splice(indexPlayerVar, 1);
      $(playersArray[0].playerHTML.containerDiv + " .overlay").show();
      // $("#p2-container .overlay").show();
      //reset playerArray, since we destroyed it

      playersArray.push(playerVar);
      var rollResult = diceRoll();
      if (rollResult === 1) {
        playerVar.currentScore = 0;
        $(playerVar.playerHTML.currentScoreSpan).text(playerVar.currentScore);
        $(playerVar.playerHTML.dieDiv).text("J");
        togglePlayerDiv();
      } else {
        playerVar.currentScore += rollResult;
        $(playerVar.playerHTML.currentScoreSpan).text(playerVar.currentScore);
        $(playerVar.playerHTML.dieDiv).text(rollResult);
        scoreChecker(playerVar.currentScore, playerVar.totalScore, playerVar.playerName);
      }
    });

    $(playerVar.playerHTML.holdButton).click(function() {
      playerVar.totalScore += playerVar.currentScore;
      $(playerVar.playerHTML.totalScoreSpan).text(playerVar.totalScore);
      playerVar.currentScore = 0;
      $(playerVar.playerHTML.currentScoreSpan).text(playerVar.currentScore);
      togglePlayerDiv();
    });
  });
})
