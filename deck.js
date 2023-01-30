// Define the Card class to represent each card in the deck
class Card {
    constructor(color, value, action) {
        this.color = color; // The color of the card
        this.value = value; // The value of the card
        this.action = action; // The action of the card (if any)
    }
}

// Create a deck of cards using the Card class
let deck = [];
const colors = ['red', 'yellow', 'blue', 'green']; // The colors of the cards
const values = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']; // The values of the cards
const actions = ['', '', '', '', '', '', 'Draw 2', 'Reverse', 'Skip', 'Wild', 'Wild Draw 4'] // The actions of the cards

// Create the number cards
function createNumberCards() {
    for (let color of colors) { // Iterate through the colors
        for (let value of values) { // Iterate through the values
            for (let i = 0; i < 2; i++) { // Create two copies of each number card
                deck.push(new Card(color, value, '')); // Add the card to the deck
            }
        }
    }
}
createNumberCards();

// Create the action cards
function createActionCards() {
    for (let color of colors) { // Iterate through the colors
        for (let act of actions) {
            if (act === "Draw 2" || act === "Reverse" || act === "Skip") { // These actions have only one card per color
                deck.push(new Card(color, '', act)); // Add the card to the deck
            }
            else if (act === "Wild" || act === "Wild Draw 4") { // These actions have four cards per color
                for (let i = 0; i < 4; i++) {
                    deck.push(new Card(color, '', act)); // Add the card to the deck
                }
            }
        }
    }
}
createActionCards();

console.log(`Deck size before shuffle: ${deck.length}`);

// Shuffle the deck
function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); // Pick a random card
        [deck[i], deck[j]] = [deck[j], deck[i]]; // Swap the current card with the random card
    }
    return deck;
}

shuffleDeck(deck);

console.log(`Deck size after shuffle: ${deck.length}`);

// Create two players
const player1 = [];
const player2 = [];

// Deal 7 cards to each player
for (let i = 0; i < 7; i++) {
    player1.push(deck.pop()); // Add 7 cards to player 1
    player2.push(deck.pop()); // Add 7 cards to player 2
}
//this console that log is just for viewing porpuses 
console.log(`Player 1 hand: ${player1}`);
console.log(`Player 2 hand: ${player2}`);
console.log(`Deck size after dealing: ${deck.length}`);