
// Function to start the game
function startGame() {
    // Initialize the draw and discard piles
    let drawPile = [];
    let discardPile = [];
  
    // Initialize the hands for player 1 and player 2
    let player1Hand = [];
    let player2Hand = [];
  
    // Initialize the current player to player 1
    let currentPlayer = 1;
  
    // Initialize the winner to null
    let winner = null;
  
    // Draw the starting hands for player 1 and player 2
    for (let i = 0; i < 7; i++) {
      player1Hand.push(drawPile.shift());
      player2Hand.push(drawPile.shift());
    }
  
    // Call the play function to start the game
    play();
  
    // Function to play the game
    function play() {
      // If the current player is player 1 and their hand is empty, draw a card for player 1
      if (currentPlayer === 1 && player1Hand.length === 0) {
        player1Hand.push(drawPile.shift());
        console.log("Player 1 draws a card"); // notify player 1 that they have drawn a card
      }
  
      // If the current player is player 2 and their hand is empty, draw a card for player 2
      else if (currentPlayer === 2 && player2Hand.length === 0) {
        player2Hand.push(drawPile.shift());
        console.log("Player 2 draws a card"); // notify player 2 that they have drawn a card
      }
  
      // If the draw pile is empty, shuffle the discard pile to become the draw pile
      if (drawPile.length === 0) {
        console.log("Draw pile is empty, shuffling the discard pile");
        drawPile = shuffle(discardPile);
        discardPile = [];
      }
  
      // Prompt the player to select a card to play
      let cardToPlay = prompt(
        "Player " + currentPlayer + ", select a card to play (index of card in hand)"
      );
  
      // Play the selected card
      let selectedCard = player1Hand[cardToPlay];
      player1Hand.splice(cardToPlay, 1);
      discardPile.unshift(selectedCard);
  
      // Switch the current player
      currentPlayer = currentPlayer === 1 ? 2 : 1;
  
      // Check if player 1 has an empty hand, if so, player 1 wins the game
      if (player1Hand.length === 0) {
        winner = 1;
        console.log("Player " + winner + " has won the game!");
        return;
      }
  
      // Check if player 2 has an empty hand, if so, player 2 wins the game
      else if (player2Hand.length === 0) {
        winner = 2;
        console.log("Player " + winner + " has won the game!");
        return;
      }
  
      // If both player hands are not empty and the draw pile is empty, the game is a draw
else if (drawPile.length === 0) {
    if (player1Hand.length < player2Hand.length) {
    winner = 1;
    } else if (player2Hand.length < player1Hand.length) { winner = 2;
    console.log(`Player ${winner} wins the game!`);
    return;
    }
     // If both player hands are of equal length, the game is a draw
            else {
            console.log("The game is a draw!");
            }
            
            // Prompt the user to start a new game
            let newGame = prompt("Do you want to start a new game? (yes/no)");
            
            // If the user wants to start a new game, call the startGame function again
            if (newGame === "yes") {
            startGame();
            } else {
            console.log("Thanks for playing!");
            }
            }
            }}

startGame()