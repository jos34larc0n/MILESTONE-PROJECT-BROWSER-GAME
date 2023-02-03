const unoGame = document.querySelector('.uno-game');
let player1Hand = document.querySelector('.player-1');
let player2Hand = document.querySelector('.player-2');
const drawPile = document.querySelector('.draw-pile');
const discardPile = document.querySelector('.discard-pile');
const callUnoButton = document.createElement('button');
const hand = [player1Hand, player2Hand];

// Create uno button
callUnoButton.textContent = "Call UNO";
unoGame.appendChild(callUnoButton);

// Initialize changing variables
let currentPlayer = 1;
let clockwise = true;
let cardsLeftCounter = 0;
let timerId;

const updateCurrentPlayerDisplay = () => {
  // Update the display of the current player
  const currentPlayerDisplay = document.querySelector(`.player-${currentPlayer}`);
  currentPlayerDisplay.classList.add("active");
  const otherPlayerDisplay = document.querySelector(`.player-${currentPlayer === 1 ? 2 : 1}`);
  otherPlayerDisplay.classList.remove("active");
};

const checkForWin = () => {
  // Check if any of the players has won the game
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

const switchPlayer = () => {
  // Switch the turn to the next player
  currentPlayer = currentPlayer === 1 ? 2 : 1;
};

const startTimer = () => {
  // Start the turn timer
  timerId = setTimeout(endTurn, 5000);
};

const endTurn = () => {
  // End the turn
  clearTimeout(timerId);
  switchPlayer();
  startTimer();
};

const createCardElement = (color, number) => {
  const cardElement = document.createElement('div');
  cardElement.textContent = number;
  
  // Create a class for each color
  if (color === 'yellow') {
    cardElement.classList.add('yellow');
  } 
  if (color === 'red') {
    cardElement.classList.add('red');
  } 
  if (color === 'blue') {
    cardElement.classList.add('blue');
  } 
  if (color === 'green') {
    cardElement.classList.add('green');
  } 
  if (color === 'black') {
    cardElement.classList.add('black');
  } 
      
  // Set the card number as the content of the card element
  cardElement.onclick = () => {
    let playerHand
    let otherPlayerHand;
    if (currentPlayer === 1) {
      playerHand = player1Hand;
      otherPlayerHand = player2Hand;
    } else {
      playerHand = player2Hand;
      otherPlayerHand = player1Hand;
    }
    if (playerHand.contains(cardElement)) {
      discardPile.appendChild(cardElement);
      playerHand.remove(cardElement);
      currentPlayer = (currentPlayer === 1) ? 2 : 1;
    }
  };

  return cardElement;
};

const addCardsToHand = (hand, cards) => {
  if (hand === "player1Hand") {
  cards.forEach(card => player1Hand.appendChild(createCardElement(card.color, card.number)));
  } else if (hand === "player2Hand") {
  cards.forEach(card => player2Hand.appendChild(createCardElement(card.color, card.number)));
  }
  };


// Draw a card from the draw pile and add it to the player's hand
for (let i = 0; i < 7; i++) {
  if (drawPile.children.length > 0) {
  const card = drawPile.children[0];
  drawPile.removeChild(card);
  hand[i].appendChild(card);
  } else {
  break;
  }
  };
  
  drawPile.addEventListener('click', () => {
  if (currentPlayer === 1) {
  drawCard(player1Hand, 1);
  } else if (currentPlayer === 2) {
  drawCard(player2Hand, 1);
  }
  });

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
  const addRemainingCardsToDrawPile = (drawPile, remainPile) => {
    for (let i = 0; i < drawPile.length; i++) {
      let remainPile = hands.slice;
      drawPile.appendChild(remainPile[i]);
    }
    };
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

  for (let i = 0; i < drawPile.length; i++) {
  let drawPileCards = drawPile[i].children;
  if (drawPileCards.length === 0) {
    shuffleDiscardPile();
  }
  const cardObject = drawPileCards[drawPileCards.length - 1];
  drawPileCards.removeChild(cardObject);
  const cardNode = document.createElement("div");
  cardNode.innerHTML = cardObject.innerHTML;
  hand.appendChild(cardNode);
}
const updateDiscardPile = (color, number) => {
  // update the top card of the discard pile
  let topDiscard = discardPile.lastChild;
  if (!topDiscard) {
    topDiscard = document.createElement("div");
    discardPile.appendChild(topDiscard);
  }
  topDiscard.classList.add(color);
  topDiscard.innerHTML = number;
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
  const drawCard = (player, amount) => {
    const hand = player === 1 ? player1Hand : player2Hand;
    for (let i = 0; amount < 1; i++) {
      let drawPileCards = [drawPile[i].children]
      if (drawPileCards.length === 0) {
        shuffleDiscardPile();
        drawPileCards = Array.from(drawPile.children);
      }
      const card = drawPileCards.pop();
      hand.appendChild(card);
    }
  };
  
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
    } else {
    drawCard(player2Hand, 2);
    }
    }
    });


  
  // start the game
  updateCurrentPlayerDisplay();
  drawCard(1, 7);
  drawCard(2, 7);
  updateDiscardPile('red', '0');
  startTimer();

  
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