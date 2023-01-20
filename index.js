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

const CARD_KEYS = Object.keys(CARDS);

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

function playGame() {
  const rounds = 5;
  const [playerScore, computerScore] = [0, 0];
  let playerChoice;

  for (let i = 0; i < rounds; i++) {
    do {
      playerChoice = window.prompt("Please enter a card", "");

      if (playerChoice === null) {
        return;
      }
    } while (!CARDS[playerChoice]);

    playerChoice = playerChoice.toLowerCase();
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
  }

  console.log(score);
  if (playerScore === computerScore) {
    console.log("DRAW");
  } else if (playerScore > computerScore) {
    console.log("WINNER");
  } else {
    console.log("GAME OVER");
  }
}

document.querySelector("#play").addEventListener("click", () => playGame());
