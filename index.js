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
  const pSelection = playerSelection.toLowerCase();
  const cSelection = computerSelection.toLowerCase();

  if (!CARD_KEYS.includes(pSelection)) {
    throw new Error(`You must enter a valid CARD!
    Entered CARD: ${pSelection}
    Valid CARDS: ${CARD_KEYS.join(" | ")}`);
  }
  if (pSelection === cSelection) {
    return `Draw!`;
  } else {
    const { beats: playerBeats } = CARDS[pSelection];
    if (playerBeats === cSelection) {
      return `You Win! ${capitalize(pSelection)} beats ${capitalize(
        cSelection
      )}`;
    } else {
      return `You Lose! ${capitalize(cSelection)} beats ${capitalize(
        pSelection
      )}`;
    }
  }
}

function playGame() {
  const rounds = 3;
  const score = [0, 0];
  let playerChoice;

  for (let i = 0; i < rounds; i++) {
    do {
      playerChoice = window.prompt("Please enter a card", "");

      if (playerChoice === null) {
        return;
      }
    } while (!CARD_KEYS.includes(playerChoice));

    playerChoice = playerChoice.toLowerCase();
    const computerChoice = getComputerChoice();

    const result = playRound(playerChoice, computerChoice);

    if (result === "Draw") {
      score[0]++;
      score[1]++;
    } else if (result.includes("Win")) {
      score[0]++;
    } else {
      score[1]++;
    }
  }
  const [playerScore, computerScore] = score;
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
