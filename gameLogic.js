
// Keep track of the current player
let currentPlayer = 1;
// Keep track of the current card on top of the draw pile
let currentCard = deck[0];
// Create a draw pile using the imported deck
let drawPile = deck.slice();
// Create an empty discard pile
let discardPile = [];
// Keep track of the winner
let winner = null;

// Function to check if the play is valid
function isValidPlay(playerHand, cardToPlay) {
  if (cardToPlay.color === currentCard.color || cardToPlay.value === currentCard.value || cardToPlay.action === currentCard.action) {
    return true;
  }
  return false;
}

// Function to handle a player's turn
function playerTurn(player, playerHand) {
  let validPlay = false;
  while (!validPlay) {
    // Prompt the player to select a card to play
    let selectedCardIndex = prompt(`Player ${player}, select a card to play:`);
    let selectedCard = playerHand[selectedCardIndex];
    if (isValidPlay(playerHand, selectedCard)) {
      validPlay = true;
      // Remove the selected card from the player's hand
      playerHand.splice(selectedCardIndex, 1);
      // Add the selected card to the discard pile
      discardPile.push(selectedCard);
      // Update the current card
      currentCard = selectedCard;
    } else {
      console.log("Invalid play, please select a different card.");
    }
  }
}

// Function to handle the game logic
function play() {
  while (!winner) {
    console.log(`Player ${currentPlayer}'s turn`);
    console.log(`Current card on top of the draw pile: ${currentCard.color} ${currentCard.value}`);
    console.log(`Player 1 hand: ${player1Hand}`);
    console.log(`Player 2 hand: ${player2Hand}`);

    // If the current player has no cards in their hand, draw a card from the draw pile
    if (currentPlayer === 1 && player1Hand.length === 0) {
      player1Hand.push(drawPile.shift());
      console.log(`Player 1 draws a card`);
    } else if (currentPlayer === 2 && player2Hand.length === 0) {
      player2Hand.push(drawPile.shift());
      console.log(`Player 2 draws a card`);
    }

    // If the draw pile is empty, shuffle the discard pile to form a new draw pile
    if (drawPile.length === 0) {
      console.log("Draw pile is empty, shuffling the discard pile");
      drawPile = shuffle(discardPile);
      discardPile = [];
    }

    // Call the playerTurn function to handle the current player's turn
    if (currentPlayer === 1) {
      playerTurn(currentPlayer, player1Hand);
    } else {
      playerTurn(currentPlayer, player2Hand);
    }

    // Check if the current player has won the game
    if (player1Hand.length === 0) {
      winner = 1;console.log(`Player ${winner} has won the game!`);
      return;
      }
      // Check if Player 2 has won the game
      else if (player2Hand.length === 0) {
      winner = 2;
      console.log(`Player ${winner} has won the game!`);
      return;
      }
      // Check if the draw pile is empty
      else if (drawPile.length === 0) {
      // Find the player with the lower hand count
      if (player1Hand.length < player2Hand.length) {
      winner = 1;
      } else if (player2Hand.length < player1Hand.length) {
      winner = 2;
      } else {
      console.log("The game is a draw!");
      return;
      }
      console.log(`Player ${winner} has won the game with the lower hand count!`);
      return;
      }
      
      // Switch players
      currentPlayer = (currentPlayer === 1) ? 2 : 1;
      
      // Call the playerTurn function again
      gameLogic(player1Hand, player2Hand);}}