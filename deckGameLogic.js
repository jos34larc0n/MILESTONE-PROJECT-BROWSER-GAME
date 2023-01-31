// Define the Card class to represent each card in the deck
class Card {
    // Define a class for each card in the game
    constructor(color, value, action) {
      this.color = color; // store the color of the card
      this.value = value; // store the value of the card
      this.action = action; // store the action of the card
    }
  }
   // Create the deck of cards
   let deck = [];
   let colors = ["red", "yellow", "green", "blue"];
   let values = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "skip", "reverse", "draw two"];
   let actions = ["none", "skip", "reverse", "draw two"];
 
   for (let i = 0; i < colors.length; i++) {
     for (let j = 0; j < values.length; j++) {
       let action = actions[j < 10 ? 0 : j - 9];
       deck.push(new Card(colors[i], values[j], action));
     }
   }

  let currentPlayer = 1; // initialize the current player
  let currentCard = deck[0]; // set the current card to the top of the deck
  let drawPile = deck.slice(); // create a draw pile from the deck
  let discardPile = []; // create an empty discard pile
  let winner = null; // initialize the winner to null
  
  function isValidPlay(playerHand, cardToPlay) {
    // function to check if a card is a valid play
    if (cardToPlay.color === currentCard.color || 
        cardToPlay.value === currentCard.value || 
        cardToPlay.action === currentCard.action) {
      // if the card is valid, return true
      return true;
    }
    // if the card is not valid, return false
    return false;
  }
  
  function playerTurn(player, playerHand) {
    // function for a player's turn
    let validPlay = false; // initialize valid play to false
    while (!validPlay) {
      // continue looping until a valid play is made
      let selectedCardIndex = prompt(`Player ${player}, select a card to play:`); // prompt the player to select a card
      let selectedCard = playerHand[selectedCardIndex]; // get the selected card
      if (isValidPlay(playerHand, selectedCard)) {
        // if the selected card is a valid play
        validPlay = true; // set valid play to true
        playerHand.splice(selectedCardIndex, 1); // remove the card from the player's hand
        discardPile.push(selectedCard); // add the card to the discard pile
        currentCard = selectedCard; // set the current card to the selected card
      } else {
        // if the selected card is not a valid play
        console.log("Invalid play, please select a different card."); // notify the player that their play is invalid
      }
    }
  }
  
  //define shuffle function pass deck as the argumen
  function shuffle(deck) {
  // Loop through the deck starting from the end
  for (let i = deck.length - 1; i > 0; i--) {
    // Generate a random index between 0 and i
    let j = Math.floor(Math.random() * (i + 1));
    // Swap the current element with the randomly selected element
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  // Return the shuffled array
  return deck;
}
  function play(player1Hand, player2Hand) {
    // function to play the game
    while (!winner) {
      // continue looping until a winner is found
      console.log(`Player ${currentPlayer}'s turn`); // notify the current player's turn
      console.log(`Current card on top of the draw pile: ${currentCard.color} ${currentCard.value}`); // show the current card on the draw pile
      console.log(`Player 1 hand: ${player1Hand}`); // show player 1's hand
      console.log(`Player 2 hand: ${player2Hand}`); // show player 2's hand
  
      if (currentPlayer === 1 && player1Hand.length === 0) {
        // if it is player 1's turn and they have no cards in their hand
        player1Hand.push(drawPile.shift()); // draw a card from the draw pile
        console.log(`Player 1 draws a card`); // notify player 1 that they have drawn a card
      } 
      // If the current player is player 2 and their hand is empty, draw a card for player 2
      else if (currentPlayer === 2 && player2Hand.length === 0) {
        player2Hand.push(drawPile.shift());
        console.log("Player 2 draws a card");// notify player 2 that they have drawn a card
      }
      // If the draw pile is empty, shuffle the discard pile to become the draw pile
      if (drawPile.length === 0) {
        console.log("Draw pile is empty, shuffling the discard pile");
        drawPile = shuffle(discardPile);
        discardPile = [];
      }
      // If the current player is player 1, call playerTurn function for player 1
      if (currentPlayer === 1) {
        playerTurn(currentPlayer, player1Hand);
      // If the current player is player 2, call playerTurn function for player 2
      } else {
        playerTurn(currentPlayer, player2Hand);
      }
      // Check if player 1 has an empty hand, if so, player 1 wins the game
      if (player1Hand.length === 0) {
        winner = 1;
        console.log(`Player ${winner} has won the game!`);
        return;
      // Check if player 2 has an empty hand, if so, player 2 wins the game
      } else if (player2Hand.length === 0) {
        winner = 2;
        console.log(`Player ${winner} has won the game!`);
        return;
      } 
      // If both player hands are not empty and the draw pile is empty, the game is a draw
      else if (drawPile.length === 0) {
        if (player1Hand.length < player2Hand.length) {
          winner = 1;
        } else if (player2Hand.length < player1Hand.length) {
          winner = 2;
        } else {
          console.log("The game is a draw!");
        }
      }}}