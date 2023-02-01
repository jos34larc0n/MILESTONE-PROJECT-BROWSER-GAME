const unoGame = document.querySelector('.uno-game');
const player1Hand = document.querySelector('.player-1-hand');
const player2Hand = document.querySelector('.player-2-hand');
const drawPile = document.querySelector('.draw-pile');
const discardPile = document.querySelector('.discard-pile');

// Select the UNO game container and hands of the two players and the draw and discard piles

const createCardElement = (color, number) => {
  const cardElement = document.createElement('div');
  cardElement.classList.add('card');
  // Create the card element and add class 'card' to it
  
  if (color) {
    cardElement.classList.add(color);
  }
  // Add class for color if there's a color passed as argument
  
  cardElement.innerHTML = number;
  // Set the card number as the content of the card element
  
  cardElement.addEventListener('click', () => {
    discardPile.appendChild(cardElement);
    player1Hand.removeChild(cardElement);
  });
  // Add a click event listener that appends the card to the discard pile and removes it from player 1's hand
  
  return cardElement;
};

// Function to create and return a card element

const addCardsToHand = (hand, cards) => {
  cards.forEach(card => hand.appendChild(createCardElement(card.color, card.number)));
};

// Function to add cards to a player's hand

const initializeCards = () => {
  const cards = [];
  const colors = ['red', 'yellow', 'green', 'blue'];
  // Array of card colors
  
  colors.forEach(color => {
    for (let i = 0; i <= 9; i++) {
      cards.push({ color, number: i });
    }
    // Push all the numbered cards of each color
    
    cards.push({ color, number: 'Reverse' });
    cards.push({ color, number: 'Skip' });
    cards.push({ color, number: 'Draw Two' });
    // Push the action cards for each color
  });
  
  for (let i = 0; i < 4; i++) {
    cards.push({ color: 'black', number: 'Wild' });
    cards.push({ color: 'black', number: 'Wild Draw' });
  }
  // Push the wild and wild draw cards
  
  return cards;
};

// Function to initialize the cards and return them as an array

const shuffleCards = (cards) => {
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  return cards;
};

// Function to distribute the shuffled cards among the specified number of players
const dealCards = (cards, numPlayers, numCardsPerPlayer) => {
  const hands = [];
  // Loop through the number of players to create an array of hands
  // Each hand contains an array of cards, spliced from the original cards array
  for (let i = 0; i < numPlayers; i++) {
      hands.push(cards.splice(0, numCardsPerPlayer));
    }
    return hands;
  };
  
  // Call the dealCards function to distribute the shuffled cards among 2 players, 7 cards per player
  const hands = dealCards(cards, 2, 7);
  
  // Add the cards in hand to each player's hand in the DOM
  addCardsToHand(player1Hand, hands[0]);
  addCardsToHand(player2Hand, hands[1]);
  
  // Add the remaining cards to the draw pile in the DOM
  drawPile.appendChild(createCardElement(null, cards.length));
  
  // Add the first card in player 1's hand to the discard pile in the DOM
  discardPile.appendChild(createCardElement(hands[0][0].color, hands[0][0].number));