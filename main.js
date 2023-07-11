const container = document.querySelector('#container');
const buttons = document.querySelectorAll('button');

let round = 1;
let scoreLimit = 5;
let scoreUser = 0;
let scoreComputer = 0;

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

function displayOutcome(string) {
    const content = document.createElement('div');
    content.classList.add('content');
    content.textContent = `Round ${round}: ${string}`;
    container.appendChild(content);

    let result = classifyResult(string);
    if (result === 'draw') {
        return;
    } else if (result === 'win') {
        scoreUser += 1
    } else if (result === 'lose') {
        scoreComputer += 1
    } else {
        console.log('Score error.')
    };

    const score_msg = document.createElement('div');
    score_msg.classList.add('score');
    score_msg.textContent = `Score: You ${scoreUser}, Computer ${scoreComputer}`;
    container.appendChild(score_msg);
}

function endGame() {
    const content = document.createElement('div');
    content.classList.add('content');
    (scoreUser > scoreComputer) ?
        content.textContent = `You Win the Game! ${scoreUser} games to ${scoreComputer}` :
        content.textContent = `You Lose the Game! ${scoreUser} games to ${scoreComputer}`;
    container.appendChild(content);

    buttons.forEach(div => div.removeEventListener('click', captureSelection));
}

function captureSelection(e) {
    let outcome = playRound(this.classList.value, getComputerChoice());
    displayOutcome(outcome);
    round++;

    if (scoreUser >= scoreLimit || scoreComputer >= scoreLimit) {
        endGame()
    };
}

buttons.forEach(div => div.addEventListener('click', captureSelection));
