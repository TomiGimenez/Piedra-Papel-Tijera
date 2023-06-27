const options = ["rock","paper","scissors"];

// Computer random choice
function getComputerChoice(){
    const choice = options[Math.floor(Math.random()*options.length)]
    return choice;
}

// Tie output
function tie(){
    return "It's a Tie!"
}

// Win output
function win(playerSelection, computerSelection){
    return `You Win! ${playerSelection} beats ${computerSelection}`
}

// Loss output
function loss(playerSelection, computerSelection){
    return `You Loss! ${computerSelection} beats ${playerSelection}`
}

// Play a Round
function playRound(playerSelection, computerSelection, scoreComputer, scorePlayer){
    // Tie
    if (playerSelection == computerSelection){
        return tie();
    }
    // Player Loss
    else if (
    (playerSelection == "rock" && computerSelection == "paper") ||
    (playerSelection == "paper" && computerSelection == "scissors") ||
    (playerSelection == "scissors" && computerSelection == "rock")
    ) {
        scoreComputer++;
        return loss(playerSelection, computerSelection)
    }
    // Player Win
    else {
        scorePlayer++;
        return win(playerSelection, computerSelection)
    }
}

// Player Choice
function getPlayerChoice(){
    // Validate that the entered is a correct word
    let validatedInput = false;
    while(validatedInput == false){
        const choice = prompt("Rock Paper Scissors:");
        if (choice == null){
            continue;
        }
        const choiceInLower = choice.toLowerCase();
        if(options.includes(choiceInLower)){
            validatedInput = true;
            return choiceInLower;
        }
    }
}

// Game
function game(){
    let scorePlayer = 0;
    let scoreComputer = 0;
    for (let i = 0; i < 5; i++) {
        const playerSelection = getPlayerChoice();
        const computerSelection = getComputerChoice();
        console.log(playRound(playerSelection, computerSelection));
        if (playRound(playerSelection, computerSelection)==win(playerSelection, computerSelection)){
            scorePlayer++;
        } else if (playRound(playerSelection, computerSelection)==loss(playerSelection, computerSelection)){
            scoreComputer++;
        }
    }
    console.log("--------------");
    console.log("Game Over");
    if (scorePlayer > scoreComputer) {
        console.log("Player was the winner");
    } else if (scorePlayer < scoreComputer) {
        console.log("Computer was the winner");
    } else {
        console.log("We have a tie!");
    }
    console.log(`Score:
    Player: ${scorePlayer}
    Computer: ${scoreComputer}`); 
}

game()