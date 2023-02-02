const unoGame = document.querySelector('.uno-game')
const player1Hand = document.querySelector('.player-1-hand');
const player2Hand = document.querySelector('.player-2-hand');
const updateCurrentPlayerDisplay = () => {
    // update the display of the current player
    const currentPlayerDisplay = document.querySelector(`.player-${currentPlayer}`);
    currentPlayerDisplay.classList.add("active");
    const otherPlayerDisplay = document.querySelector(`.player-${currentPlayer === 1 ? 2 : 1}`);
    otherPlayerDisplay.classList.remove("active");
    };
const drawPile = document.querySelector('.draw-pile');
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
    // Switch to the next player, clockwise or counter-clockwise depending on the direction of the game
    
    const drawCard = (player, amount) => {
        const drawPileCards = Array.from(drawPile.children);
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
const discardPile = document.querySelector('.discard-pile');
const updateDiscardPile = (color, number) => {
    // update the top card of the discard pile
       const topDiscard = discardPile.lastChild;
         topDiscard.classList.add(color);
         topDiscard.innerHTML = number;
    };
const callUnoButton = document.createElement('button');
callUnoButton.textContent = "Call UNO";
callUnoButton.style.display = "none";
unoGame.appendChild(callUnoButton);
const currentPlayer = 1;
let clockwise = true;
let cardsLeftCounter = 0;
let timerId;
const switchPlayer = () => {
    // switch the turn to the next player
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    };
    // function to start the turn timer
const startTimer = () => {
    // start the turn timer
    timerId = setTimeout(endTurn, 5000);
    };
// function to end the turn
const endTurn = () => {
    // end the turn
    clearTimeout(timerId);
    switchPlayer();
    startTimer();}
// Select the UNO game container and hands of the two players and the draw and discard pile

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

  cardElement.onclick = () => {
    if (!checkValidMove(color, number)) return;
    discardPile.appendChild(cardElement);
    updateDiscardPile(color, number);
    checkForUno();
    updateCurrentPlayerDisplay();
    if (checkForUno()) return;
    switchPlayer();
    drawCard(currentPlayer, 1);
  };

  // Add a click event listener that checks if move is valid, appends the card to the discard pile, check for Uno, update current player display, switch to next player and draw a card for the next player

  return cardElement;
};
// Function to create and return a card element

const addCardsToHand = (hand, cards) => {
  cards.forEach(card => hand.appendChild(createCardElement(card.color, card.number)));
};

// Add all cards to the hand of the specified player

const removeCardFromHand = (player, card) => {
  const hand = player === 1 ? player1Hand : player2Hand;
  hand.removeChild(card);
};

// Remove the specified card from the hand of the specified player

const checkValidMove = (color, number) => {
  const topDiscard = discardPile.lastChild;
  const topColor = topDiscard.classList[1];
  const topNumber = topDiscard.innerHTML;

  // Check if the card played is the same color or number as the top card of the discard pile
  if (color === topColor || number === topNumber || color === "wild" || number === "wild") {
    return true;
  }

  // If the card played is a Reverse, Skip or Draw Two, check if the top card of the discard pile is the same color
  if (["reverse", "skip", "draw-two"].includes(number) && color === topColor) {
    return true;
  }

// If the card played is a Wild Draw Four, check if the player has no cards of the same color as the top card of the discard pile
if (number === "wild-draw-four") {
    const playerHand = currentPlayer === 1 ? player1Hand : player2Hand;
    const playerCards = Array.from(playerHand.children);
    for (const card of playerCards) {
    if (card.classList[1] === topColor) {
    return false;
    }
    }
    return true;
    }
    
    return false;
    };
    
    const checkForUno = () => {
    const hand = currentPlayer === 1 ? player1Hand : player2Hand;
    if (hand.children.length === 1) {
    callUnoButton.style.display = "inline-block";
    }
    };
    

    
    // Draw a specified number of cards from the draw pile and add them to the hand of the specified player
    
    const shuffleDiscardPile = () => {
    const discardPileCards = Array.from(discardPile.children);
    while (discardPileCards.length) {
    const rIndex = Math.floor(Math.random() * discardPileCards.length);
        
        const checkForWin = () => {
        const player1Cards = player1Hand.children.length;
        const player2Cards = player2Hand.children.length;
        
        // Check if either player has no cards left
        if (player1Cards === 0) {
        alert(`Player 1 wins!`);
        return true;
        }
        if (player2Cards === 0) {
        alert(`Player 2 wins!`);
        return true;
        }
        
        return false;
        };
        

        // Update the background color of the top card on the discard pile
        
        const shuffleDeck = () => {
        const deck = [...Array(108).keys()].map(i => {
        if (i < 76) {
        const colorIndex = Math.floor(i / 19);
        const number = i % 19 < 9 ? i % 19 + 1 : (i % 19 < 18 ? "reverse" : "skip");
        return { color: COLORS[colorIndex], number };
        } else {
        return { color: "wild", number: i % 76 < 84 ? "wild" : "wild-draw-four" };
        }
        });
        
        // Create the deck of cards
        const shuffledDeck = shuffleArray(deck);
        addCardsToHand(player1Hand, shuffledDeck.slice(0, 7));
        addCardsToHand(player2Hand, shuffledDeck.slice(7, 14));
        drawPile.innerHTML = "";
        addCardsToHand(drawPile, shuffledDeck.slice(14));
        };
        
        // Shuffle the deck and add cards to the draw pile, player 1's hand and player 2's hand
        
        const startGame = () => {
        shuffleDeck();
        drawCard(1, 1);
        updateCurrentPlayerDisplay();
        timerId = setInterval(() => {
        if (cardsLeftCounter === 0) {
        alert("Game Over! No cards left in the draw pile.");
        clearInterval(timerId);
        }
        cardsLeftCounter = drawPile.children.length;
        }, 1000);
        };
        
        // Start the game and set a timer to check if the draw pile is empty
        
        startGame();
        
    }}
