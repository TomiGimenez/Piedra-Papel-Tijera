let scorePlayer = 0;
let scoreComputer = 0;
let roundWinner = '';

// Play a Round
function playRound(playerSelection, computerSelection){
    // Tie
    if (playerSelection == computerSelection){
        roundWinner = 'tie';
    }
    // Player Loss
    else if (
    (playerSelection == 'Rock' && computerSelection == 'Paper') ||
    (playerSelection == 'Paper' && computerSelection == 'Scissors') ||
    (playerSelection == 'Scissors' && computerSelection == 'Rock')
    ) {
        scoreComputer++;
        roundWinner = 'computer'
    }
    // Player Win
    else {
        scorePlayer++;
        roundWinner = 'player'
    }
    updateScoreMessage(roundWinner, playerSelection, computerSelection);
}

// Computer random choice
const options = ['Rock','Paper','Scissors'];
function getComputerChoice(){
    const choice = options[Math.floor(Math.random()*options.length)]
    return choice;
}

// Detectar final juego
function isGameOver() {
    return scorePlayer === 5 || scoreComputer === 5;
}


// Game
// function game(){
//     for (let i = 0; i < 5; i++) {
//         const playerSelection = getPlayerChoice();
//         const computerSelection = getComputerChoice();
//         console.log(playRound(playerSelection, computerSelection));
//         if (playRound(playerSelection, computerSelection)==win(playerSelection, computerSelection)){
//             scorePlayer++;
//         } else if (playRound(playerSelection, computerSelection)==loss(playerSelection, computerSelection)){
//             scoreComputer++;
//         }
//     }
//     console.log("--------------");
//     console.log("Game Over");
//     if (scorePlayer > scoreComputer) {
//         console.log("Player was the winner");
//     } else if (scorePlayer < scoreComputer) {
//         console.log("Computer was the winner");
//     } else {
//         console.log("We have a tie!");
//     }
//     console.log(`Score:
//     Player: ${scorePlayer}
//     Computer: ${scoreComputer}`); 
// }


// Interfaz Grafica

const scoreInfo = document.querySelector('#scoreInfo');
const scoreMessage = document.querySelector('#scoreMessage');
const playerSign = document.querySelector('#playerSign');
const playerScoreIndex = document.querySelector('#playerScore');
const computerSign = document.querySelector('#computerSign');
const computerScoreIndex = document.querySelector('#computerScore');
const rockBtn = document.querySelector('#rockBtn');
const paperBtn = document.querySelector('#paperBtn');
const scissorsBtn = document.querySelector('#scissorsBtn');
const endGameModal = document.querySelector('#endGameModal');
const endGameMsg = document.querySelector('#endGameMsg');
const overlay = document.querySelector('#overlay');
const restartBtn = document.querySelector('#restartBtn');

// Player selection
rockBtn.addEventListener('click', () => detectarClick('Rock'));
paperBtn.addEventListener('click', () => detectarClick('Paper'));
scissorsBtn.addEventListener('click', () => detectarClick('Scissors'));

restartBtn.addEventListener('click', restartGame);
overlay.addEventListener('click', closeEndgameModal);

function detectarClick(playerSelection) {
    // Se evalua si es final de juego antes de jugar
    if (isGameOver()) {
        openEndgameModal();
        return
    }
    
    const computerSelection = getComputerChoice();
    playRound(playerSelection, computerSelection);
    updateChoices(playerSelection, computerSelection);
    updateScore();

    // Se vuelve a evaluar si es final de juego con esta jugada
    if (isGameOver()) {
        openEndgameModal();
        setFinalMessage();
    }
}

// Actualizar icono de eleccion de player y computer
function updateChoices(playerSelection, computerSelection) {
    switch(playerSelection) {
        case 'Rock':
            playerSign.textContent = '✊';
            break
        case 'Paper':
            playerSign.textContent = '🫱';
            break
        case 'Scissors':
            playerSign.textContent = '✌️';
            break
    }
    switch(computerSelection) {
        case 'Rock':
            computerSign.textContent = '✊';
            break
        case 'Paper':
            computerSign.textContent = '🫱';
            break
        case 'Scissors':
            computerSign.textContent = '✌️';
            break
    }
}

// Actualizar scoreInfo
function updateScore() {
    if (roundWinner === 'tie') {
        scoreInfo.textContent = "It's a tie!";
    } else if (roundWinner === 'player') {
        scoreInfo.textContent = 'You won!';
    } else if (roundWinner === 'computer') {
        scoreInfo.textContent = 'You lost!';
    }

    playerScoreIndex.textContent = `Player: ${scorePlayer}`;
    computerScoreIndex.textContent = `Player: ${scoreComputer}`;
}

//Actualizar scoreMessage
function updateScoreMessage(roundWinner, playerSelection, computerSelection) {
    if (roundWinner === 'player') {
        scoreMessage.textContent = `${playerSelection} beats ${computerSelection}.`
        return
    } else if (roundWinner === 'computer') {
        scoreMessage.textContent = `${playerSelection} is beaten by ${computerSelection}.`
        return
    } else {
        scoreMessage.textContent = `${playerSelection} ties with ${computerSelection}.`
    }

}

// Abrir ventana final juego
function openEndgameModal() {
    endGameModal.classList.add('active');
    overlay.classList.add('active');
}

function closeEndgameModal() {
    endGameModal.classList.remove('active');
    overlay.classList.remove('active');
}

function setFinalMessage() {
    return scorePlayer > scoreComputer
    ? (endGameMsg.textContent = 'You Win!')
    : (endGameMsg.textContent = 'You Lost...')
}


function restartGame() {
    scorePlayer = 0;
    scoreComputer = 0;
    scoreInfo.textContent = 'Choose your weapon';
    scoreMessage.textContent = 'First yo score 5 points win the game';
    playerScoreIndex.textContent = 'Player: 0';
    computerScoreIndex.textContent = 'Computer: 0';
    playerSign.textContent = '❔';
    computerSign.textContent = '❔';
    endGameModal.classList.remove('active');
    overlay.classList.remove('active');
}