# Pig Dice Game

#### _Two Player Pig Dice Game_

#### By _**Alexandra Holcombe && Elise St Hilaire**_

## Description

This web application will take a number from a user and return a range of numbers from 1 to the chosen number with the following exceptions:
* Numbers divisible by 3 are replaced with "ping"
* Numbers divisible by 5 are replaced with "pong"
* Numbers divisible by 15 are replaced with "ping-pong"

## Setup/Installation Requirements

* Clone to local machine
* Open files in web browser or text editor
* JQuery and Bootstrap included, no internet connection required

## Specifications

**The application will return a random number 1-6 when the user clicks on the die.**
* Example Input: *die clicky*
* Example Output: 5

**The application will add the returned number to the "this turn" user score.**
* Example Input: *die clicky*
* Example Output: 32

**If the returned number is 1, then "this turn" is cleared and the player's turn is over.**
* Example Input: *die clicky*
* Example Output: "Turn over, no change to score"

**If the user clicks "Hold", then the "this turn" score is added to the total score.**
* Example Input: *hold clicky*
* Example Output: "Score updated", Total Score: 48

**When the user clicks "Hold" or a 1 is rolled, an "OK"/acknowledgement alert appears.**
* Example Input: Hold
* Example Output: Alert: "Score updated, current score: 67" "OK"

**When the user closes/acknowledges the alert, that side of the screen will "gray out" and the other player's side will "gray in."**
* Example Input: OK
* Example Output: Player 2

**When one of players' total score plus "this turn" score is equal to or greater than 100, a pop-up div will appear over the entire page with the winning player and final scores.**
* Example Input: *die clicky*
* Example Output: "Player 2 wins!" "Player 1 Final Score: 81" "Player 2 Final Score: 103" "Would you like to play again?"

**If user selects "ok" at bottom of winner pop-up div, the game re-sets.**
* Example Input: OK
* Example Output: New game appears



## Specifications for Playing against Computer

**When you choose to play against the computer, the computer will be player 2.**
* Example Input: *Play Against Computer clicky*
* Example Output: "You are player 1, the computer is player 2".

**The computer rolls twice for player 2, after player 1's turn is over**
* Example Input: Player 1 holds/rolls a 1
* Example Output: Computer rolls.

## Support and contact details

Please contact Allie Holcombe at alexandra.holcombe@gmail.com or Elise St Hilaire at eliseylenore@gmail.com with any questions, concerns, or suggestions.

## Technologies Used

This webpage uses the JQuery and Bootstrap libraries.

### License

*This project is licensed under the MIT license.*

Copyright (c) 2017 **_Alexandra Holcombe & Elise St Hilaire_**
