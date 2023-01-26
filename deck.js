class Card {
    constructor(color, value, action) {
      this.color = color;
      this.value = value;
      this.action = action;
    }
  }
  
  // Create a deck of cards using the Card class
  const deck = [];
  const colors = ['red', 'yellow', 'blue', 'green'];
  const values = ['0','1','2','3','4','5','6','7','8','9'];
  const actions = ['','','','','','','Draw 2','Reverse','Skip','Wild','Wild Draw 4']
  
  // create the number cards
  for (let color of colors) {
    for (let value of values) {
      for (let i = 0; i < 2; i++) {
          deck.push(new Card(color, value, ''));
      }
    }
  }
  
  // create the action cards
  for (let color of colors) {
      for (let act of actions) {
          if (act === "Draw 2" || act === "Reverse" || act === "Skip") {
              deck.push(new Card(color, '', act));
          }
          else if (act === "Wild" || act === "Wild Draw 4") {
              for (let i = 0; i < 4; i++) {
                  deck.push(new Card(color, '', act));
              }
          }
      }
  }
  
  console.log(`Deck size before shuffle: ${deck.length}`);
  
  // Shuffle the deck
  function shuffle(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
  }
  
  shuffle(deck);
  
  console.log(`Deck size after shuffle: ${deck.length}`);
  
  // Create two players
  const player1 = [];
  const player2 = [];
  
  // Deal 7 cards to each player
  for (let i = 0; i < 7; i++) {
      player1.push(deck.pop());
      player2.push(deck.pop());
  }
  
  console.log(`Player 1 hand: ${player1}`);
  console.log(`Player 2 hand: ${player2}`);
  console.log(`Deck size after dealing: ${deck.length}`);
  