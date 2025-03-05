let player1 = "Player 1";
let player2 = "Player 2";
let currentPlayer = "X";
let moveCount = 0;

function changeName() {
    player1 = prompt('Enter name for Player who chooses "X":') || "Player 1";
    player2 = prompt('Enter name for Player who chooses "O":') || "Player 2";
    updateResult(`${player1}: X <br> ${player2}: O`, "black");
}

function updateResult(text, color) {
    const resultElement = document.querySelector(".result");
    resultElement.innerHTML = text;
    resultElement.style.color = color;
}

function game(cell) {
    if (!cell.innerHTML) {
        cell.innerHTML = currentPlayer;
        cell.style.backgroundColor = currentPlayer === "X" ? "orange" : "cyan";
        moveCount++;

        if (checkWinner()) {
            updateResult(`${currentPlayer === "X" ? player1 : player2} WINS!`, "black");
            document.querySelector(".result").style.fontSize = "45px";
            document.querySelector(".result").style.paddingTop = "30px";
            disableBoard();
        } else if (moveCount === 9) {
            updateResult("MATCH DRAW!", "black");
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
        }
    }
}

function checkWinner() {
    const board = [];
    for (let i = 1; i <= 9; i++) {
        board[i] = document.getElementById("b" + i).innerHTML;
    }

    const winPatterns = [
        [1, 2, 3], [4, 5, 6], [7, 8, 9], // Rows
        [1, 4, 7], [2, 5, 8], [3, 6, 9], // Columns
        [1, 5, 9], [3, 5, 7] // Diagonals
    ];

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}

function disableBoard() {
    document.querySelectorAll(".tic-tac-toe").forEach(button => button.onclick = null);
}

// **FIX: Properly reset the game without reloading**
function replay() {
    document.querySelectorAll(".tic-tac-toe").forEach(button => {
        button.innerHTML = "";
        button.style.backgroundColor = "";
        button.onclick = function() { game(this); };
    });

    moveCount = 0;
    currentPlayer = "X";
    updateResult(`${player1}: X <br> ${player2}: O`, "black");
}
