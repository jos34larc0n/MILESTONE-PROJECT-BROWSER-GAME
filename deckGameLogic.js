//assign global variables
const unoGame = document.querySelector('.uno-game');
const player1Hand = document.querySelector('.player-1');
const player2Hand = document.querySelector('.player-2');
const drawPile = document.querySelector('.draw-pile');
const discardPile = document.querySelector('.discard-pile');
const callUnoButton = document.createElement('button');
//Create uno Button
callUnoButton.textContent = "Call UNO";
unoGame.appendChild(callUnoButton);
// initiliaze changing variables
let currentPlayer = 1;
let clockwise = true;
let cardsLeftCounter = 0;
let timerId;

const updateCurrentPlayerDisplay = () => {
  // update the display of the current player
  const currentPlayerDisplay = document.querySelector(`.player-1`);
  currentPlayerDisplay.classList.add("active");
  const otherPlayerDisplay = document.querySelector(`.player-2`);
  otherPlayerDisplay.classList.remove("active");
};

const checkForWin = () => {
  // check if any of the players has won the game
  const player1Cards = Array.from(player1Hand.children);
  const player2Cards = Array.from(player2Hand.children);
  if (player1Cards.length === 0) {
    return 1;
  } else if (player2Cards.length === 0) {
    return 2;
  } else {
    return 0;
  }
};

const drawCard = (player, amount) => {
  let drawPileCards = Array.from(drawPile.children);
  const hand = player === 1 ? player1Hand : player2Hand;
  for (let i = 0; i < amount; i++) {
    if (drawPileCards.length === 0) {
      shuffleDiscardPile();
      drawPileCards = Array.from(drawPile.children);
    }
    const card = drawPileCards.pop();
    hand.appendChild(card);
  }
};

const updateDiscardPile = (color, number) => {
  // update the top card of the discard pile
  const topDiscard = discardPile.lastChild;
  topDiscard.classList.add(color);
  topDiscard.innerHTML = number;
};

const switchPlayer = () => {
  // switch the turn to the next player
  currentPlayer = currentPlayer === 1 ? 2 : 1;
};

const startTimer = () => {
  // start the turn timer
  timerId = setTimeout(endTurn, 5000);
};

const endTurn = () => {
  // end the turn
  clearTimeout(timerId);
  switchPlayer();
  startTimer();
};

// Select the UNO game container and hands of the two players and the draw and discard piles

const createCardElement = (color, number) => {
  const cardElements = document.createElement('div');
  cardElements.classList.add('card');

  // Create the card element and add class 'card' to it

  if (color) {
    cardElements.classList.add(color);
  }

  // Add class for color if there's a color passed as argument

  cardElements.innerHTML = number;

  // Set the card number as the content of the card element

  for (let i = 0; i < cardElements.length; i++) {
    cardElements[i].onclick = () => {
      let playerHand
      let otherPlayerHand;
      if (currentPlayer === 1) {
        playerHand = player1Hand;
        otherPlayerHand = player2Hand;
      } else {
        playerHand = player2Hand;
        otherPlayerHand = player1Hand;
      }
      if (playerHand.contains(cardElements[i])) {
        discardPile.appendChild(cardElements[i]);
        playerHand.remove(cardElements[i]);
        currentPlayer = (currentPlayer === 1) ? 2 : 1;
      }
    };
  }  
  
  // Add a click event listener that appends the card to the discard pile and removes it from player 1's hand

  return cardElements;
};
// Function to create and return a card element

const addCardsToHand = (hand, cards) => {
  cards.forEach(card => hand.appendChild(createCardElement(card.color, card.number)));
};

//Add Event Listener for Call Uno Button

callUnoButton.addEventListener('click', () => {
  if (currentPlayer === 1 && player1Hand.children.length === 1) {
      currentPlayer = 2;
       updateCurrentPlayerDisplay();
       drawCard(player2Hand, 2);
  } else if (currentPlayer === 2 && player2Hand.children.length === 1) {
      currentPlayer = 1;
       updateCurrentPlayerDisplay();
       drawCard(player1Hand, 2);
  } else {
  if (currentPlayer === 1) {
       drawCard(player1Hand, 2);
  } else if (currentPlayer === 2) {
       drawCard(player2Hand, 2);
  }
  }
  });

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
  //Shuffle cards and deal

  const cards = shuffleCards(initializeCards());

  // Call the dealCards function to distribute the shuffled cards among 2 players, 7 cards per player

  const hands = dealCards(cards, 2, 7);
  
  // Add the cards in hand to each player's hand in the DOM

  addCardsToHand(player1Hand, hands[0]);
  addCardsToHand(player2Hand, hands[1]);
  
  // Add the remaining cards to the draw pile in the DOM

  drawPile.appendChild(createCardElement(null, cards.length));
  
  // Add the first card in player 1's hand to the discard pile in the DOM

  discardPile.appendChild(createCardElement(hands[0][0].color, hands[0][0].number));

  //Keep track of the current player and the top card on the discard pile
   let topCard = hands[0][0];

//Create a function to handle player turns

const playerTurn = (playerHand) => {
  let playableCards = playerHand.filter(card => {
    return (
      (card.color === topCard.color || card.number === topCard.number) ||
      (topCard.number === 'Wild' || topCard.number === 'Wild Draw')
    );
  });
  if (playableCards.length === 0) {

    // Player can draw a card from the main deck if they cannot play a card

    const drawnCard = cards.shift();
    playerHand.push(drawnCard);
    playerTurn(playerHand);
  } else {

    // Player can play a card if they have a matching card

    playableCards.forEach(card => {
      card.onclick = () => {
        topCard = card;
        discardPile.appendChild(createCardElement(card.color, card.number));
        playerHand.splice(playerHand.indexOf(card), 1);
        if (playerHand.length === 0) {

          // Game over logic

        } else {
          currentPlayer = currentPlayer === 1 ? 2 : 1;
          playerTurn(hands[currentPlayer - 1]);
        }
      };
    });
  }
};

//Create a skip button

const skipButton = document.createElement('button');
   skipButton.innerHTML = 'Skip Turn';
   skipButton.addEventListener('click', () => {
   currentPlayer = currentPlayer === 1 ? 2 : 1;
    playerTurn(hands[currentPlayer - 1]);
});
  
unoGame.appendChild(skipButton);

//Start the game
playerTurn(hands[0]);

const shuffleDiscardPile = () => {
  // shuffle the cards in the discard pile and place them in the draw pile
  const discardPileCards = Array.from(discardPile.children);
  while (discardPileCards.length > 0) {
  const randomIndex = Math.floor(Math.random() * discardPileCards.length);
  const card = discardPileCards[randomIndex];
  drawPile.appendChild(card);
  discardPileCards.splice(randomIndex, 1);
  }
  };
  
  const playCard = (player, cardElement) => {
  // play the card and update the discard pile
  const [color, number] = cardElement.classList;
  updateDiscardPile(color, number);
  cardElement.remove();
  };
  
  const unoCallHandler = () => {
  // handle the uno call
  alert("UNO!");
  };
  
  callUnoButton.addEventListener('click', unoCallHandler);
  
  player1Hand.addEventListener('click', (event) => {
  // handle the player 1 card play
  if (currentPlayer === 1) {
  const cardElement = event.target;
  playCard(1, cardElement);
  endTurn();
  }
  });
  
  player2Hand.addEventListener('click', (event) => {
  // handle the player 2 card play
  if (currentPlayer === 2) {
  const cardElement = event.target;
  playCard(2, cardElement);
  endTurn();
  }
  });
  
  // start the game
  updateCurrentPlayerDisplay();
  drawCard(1, 7);
  drawCard(2, 7);
  updateDiscardPile('red', '0');
  startTimer();