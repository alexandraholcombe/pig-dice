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
  $("#screen-overlay, #player-mode").show();

  //initial scores
  $(player1.playerHTML.currentScoreSpan).text(player1.currentScore);
  $(player1.playerHTML.totalScoreSpan).text(player1.totalScore);
  $(player2.playerHTML.currentScoreSpan).text(player2.currentScore);
  $(player2.playerHTML.totalScoreSpan).text(player2.totalScore);




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

  //we roll the die AND decide what to do based on the results of the die
  var decision = function(playerVar) {
    //where we actually roll the die
    var rollResult = diceRoll();
    //decide what to do based on the results of the die
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
  }

  //Roll function
  var chooseToRoll = function(playerVar) {
    //block off player that's not playing
    var indexPlayerVar = playersArray.indexOf(playerVar);
    playersArray.splice(indexPlayerVar, 1);
    $(playersArray[0].playerHTML.containerDiv + " .overlay").show();

    //add player back into array
    playersArray.push(playerVar);

    //we decide what to do based on the results of the die
    decision(playerVar);
  }

  var chooseToHold = function(playerVar) {
    playerVar.totalScore += playerVar.currentScore;
    $(playerVar.playerHTML.totalScoreSpan).text(playerVar.totalScore);
    playerVar.currentScore = 0;
    $(playerVar.playerHTML.currentScoreSpan).text(playerVar.currentScore);
    togglePlayerDiv();
  }

  //Initial display of scores
  var playerLoop = function() {
    playersArray.forEach(function(playerVar){
      $(playerVar.playerHTML.currentScoreSpan).text(playerVar.currentScore);
      $(playerVar.playerHTML.totalScoreSpan).text(playerVar.totalScore);

      //Roll on button click
      $(playerVar.playerHTML.rollButton).click(function() {
        chooseToRoll(playerVar);
      });

      $(playerVar.playerHTML.holdButton).click(function() {
        chooseToHold(playerVar);
      });
    });
  };

  var computerLoop = function() {
      // debugger;
      playersArray.forEach(function(playerVar){
        // debugger;
        $(playerVar.playerHTML.currentScoreSpan).text(playerVar.currentScore);
        $(playerVar.playerHTML.totalScoreSpan).text(playerVar.totalScore);

        if (playerVar.playerName === "Computer") {
          chooseToRoll(playerVar);
          console.log(playerVar.currentScore);
          chooseToRoll(playerVar);
          console.log(playerVar.currentScore);
          chooseToHold(playerVar);
        } else {
          //Roll on button click
          $(playerVar.playerHTML.rollButton).click(function() {
            chooseToRoll(playerVar);
          });

          $(playerVar.playerHTML.holdButton).click(function() {
            chooseToHold(playerVar);
          });
        };
      });
    }

  //One-player selection
  $("#one-player").click(function() {
    player2.playerName = "Computer";
    $(player2.playerHTML.containerDiv + " .overlay").show();
    $("#screen-overlay, #player-mode").hide();
    $(player1.playerHTML.rollButton).click(function() {
      //we decide what to do based on the results of the die
      decision(player1);
      if ($("#p1-container .overlay").is(":visible")) {
        console.log("Computer turn!");
      };
    });
  });
  
  //Two-player selection
  $("#two-player").click(function() {
    $("#screen-overlay, #player-mode").hide();
    playerLoop();
  });


})
