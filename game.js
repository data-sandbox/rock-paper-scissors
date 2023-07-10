/*
Rock Paper Scissors game against the computer within the browser console.
*/

function getComputerChoice() {
    let computerChoice = Math.floor(Math.random() * 3);
    switch (computerChoice) {
        case 0:
            return "rock";
            break;
        case 1:
            return "paper";
            break;
        case 2:
            return "scissors";
            break;
        default:
            return "case error";
    }
}

function getPlayerChoice() {
    let playerChoice = prompt("Enter your choice: rock, paper, or scissors").toLowerCase();
    while (playerChoice !== 'rock' && playerChoice !== 'paper' && playerChoice !== 'scissors') {
        playerChoice = prompt("Choice not understood, try again: rock, paper, or scissors").toLowerCase();
    }
    return playerChoice;
}

function playRound(playerSelection, computerSelection) {
    switch (playerSelection) {
        case "rock":
            if (computerSelection === "paper") {
                return `You Lose! Paper beats ${playerSelection}`;
            } else if (computerSelection === "scissors") {
                return `You Win! Rock beats ${computerSelection}`;
            } else {
                return "Draw! Play again!";
            }
            break;
        case "paper":
            if (computerSelection === "scissors") {
                return `You Lose! Scissors beats ${playerSelection}`;
            } else if (computerSelection === "rock") {
                return `You Win! Paper beats ${computerSelection}`;
            } else {
                return "Draw! Play again!";
            }
            break;
        case "scissors":
            if (computerSelection === "rock") {
                return `You Lose! Rock beats ${playerSelection}`;
            } else if (computerSelection === "paper") {
                return `You Win! Scissors beats ${computerSelection}`;
            } else {
                return "Draw! Play again!";
            }
            break;
        default:
            return "Error in player and computer selections."
    }
}

function classifyResult(string) {
    const regexWin = /win/;
    const regexLose = /lose/;
    const regexDraw = /draw/;
    if (regexWin.test(string.toLowerCase())) {
        return 'win';
    } else if (regexLose.test(string.toLowerCase())) {
        return 'lose';
    } else if (regexDraw.test(string.toLowerCase())) {
        return 'draw';
    } else {
        return 'Result classification error';
    }
}

function getOutcome(gameNum, rounds) {
    let round = playRound(getPlayerChoice(), getComputerChoice());
    console.log(`Round ${gameNum}: ${round}`);
    let outcome = classifyResult(round);
    return outcome;
}

function displayWinner(score, rounds) {
    (score / rounds > 0.5) ?
        console.log(`You Win the Game! ${score} games to ${rounds - score}`) :
        console.log(`You Lose the Game! ${score} games to ${rounds - score}`);
}

function game() {
    const rounds = 5;
    alert(`Welcome to Rock Paper Scissors! Open the browser console to see the game progress. Best of ${rounds} rounds wins!`)
    let score = 0;
    for (let i = 1; i <= rounds; i++) {
        let outcome = getOutcome(i, rounds);
        while (outcome === 'draw') {
            outcome = getOutcome(i, rounds);
        }
        if (outcome === 'win') {
            score += 1;
        }
    }
    displayWinner(score, rounds)
}

game();