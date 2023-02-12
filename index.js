const CARDS = {
  paper: {
    beats: "rock",
  },
  rock: {
    beats: "scissors",
  },
  scissors: {
    beats: "paper",
  },
};

const game = {
  status: 'idle'
}

const CARD_KEYS = Object.keys(CARDS);

const scoreElement = document.querySelector('#score');
const playElement = document.querySelector("#play");

/**
 * @param {string} str
 * @returns {string}
 */
function capitalize(str) {
  return str[0].toUpperCase() + str.substring(1).toLowerCase();
}

/**
 * @returns {string}
 */
function getComputerChoice() {
  return CARD_KEYS[Math.floor(Math.random() * CARD_KEYS.length)];
}

function createChoice(choice) {
  const choiceElement = document.createElement('button');

  choiceElement.classList.add('playerChoice');
  choiceElement.dataset.playerChoice = choice;
  choiceElement.textContent = capitalize(choice);

  return choiceElement;
}

function renderPlayerChoices() {
  const buttonListElement = document.querySelector('#button-list');

  CARD_KEYS.forEach(choice => buttonListElement.appendChild(createChoice(choice)));
}

function removePlayerChoices() {
  document.querySelectorAll('.playerChoice').forEach(element => element.remove());
}

/**
 * @param {string} playerSelection
 * @param {string} computerSelection
 * @returns {string}
 */
function playRound(playerSelection, computerSelection) {
  if (playerSelection === computerSelection) {
    return `Draw!`;
  } else {
    const { beats: playerBeats } = CARDS[playerSelection];
    if (playerBeats === computerSelection) {
      return `You Win! ${capitalize(playerSelection)} beats ${capitalize(
        computerSelection
      )}`;
    } else {
      return `You Lose! ${capitalize(computerSelection)} beats ${capitalize(
        playerSelection
      )}`;
    }
  }
}

function getPlayerChoice() {
  return new Promise(resolve => {
    document.querySelectorAll('.playerChoice').forEach(element => {
      element.addEventListener('click', event => resolve(event.currentTarget.dataset.playerChoice));
    });
  });
}

async function playGame() {
  game.status = 'started';
  playElement.textContent = 'Restart?';

  let [playerScore, computerScore] = [0, 0];
  let playerChoice;

  renderPlayerChoices();

  while (playerScore < 5 && computerScore < 5) {
    playerChoice = await getPlayerChoice();
    const computerChoice = getComputerChoice();

    const result = playRound(playerChoice, computerChoice);

    if (result === "Draw") {
      playerScore++;
      computerScore++;
    } else if (result.includes("Win")) {
      playerScore++;
    } else {
      computerScore++;
    }

    scoreElement.textContent = `Score: [ Player: ${playerScore} | Computer: ${computerScore} ]`;
    playerChoice = null;
  }

  if (playerScore === computerScore) {
    scoreElement.textContent += ' => DRAW';
  } else if (playerScore > computerScore) {
    scoreElement.textContent += ' => YOU WIN!';
  } else {
    scoreElement.textContent += ' => GAME OVER';
  }

  game.status = 'finished';
  removePlayerChoices();
}

playElement.addEventListener("click", () => playGame());


// Case retry/replay game