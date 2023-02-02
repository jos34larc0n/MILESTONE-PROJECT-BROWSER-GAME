// ./card.js
const createCardElement = (color, number) => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    if (color) {
    cardElement.classList.add(color);
    }
    cardElement.innerHTML = number;
    return cardElement;
    };