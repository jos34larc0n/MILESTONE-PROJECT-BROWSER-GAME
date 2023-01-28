//import { deck, player1, player2 } from './deck.js';

// Import the deck and player hands from the deck.js file

let currentPlayer = 1; // Keep track of the current player
let currentCard = deck[0]; // Keep track of the current card on top of the draw pile
let drawPile = deck; // Create a draw pile using the imported deck
let discardPile = []; // Create an empty discard pile
let winner = null; // Keep track of the winner

// Function to check if the play is valid
function isValidPlay(playerHand, cardToPlay) {
    if (cardToPlay.color === currentCard.color || cardToPlay.value === currentCard.value || cardToPlay.action === currentCard.action) {
        return true;
    }
    return false;
}

// Function to handle a player's turn
function playerTurn(player) {
    let validPlay = false;
    while (!validPlay) {
        // Prompt the player to select a card to play
        let selectedCard = playerHand[prompt(`Player ${player}, select a card to play:`)];
        if (isValidPlay(playerHand, selectedCard)) {
            validPlay = true;
            // Remove the selected card from the player's hand
            playerHand.splice(playerHand.indexOf(selectedCard), 1);
            // Add the selected card to the discard pile
            discardPile.push(selectedCard);
            // Update the current card
            currentCard = selectedCard;
        } else {
            console.log("Invalid play, please select a different card.");
        }
    }
}
