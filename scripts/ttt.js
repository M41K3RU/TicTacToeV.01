const btnReset = document.querySelector('.reset');
const ticTacToeGame = new TicTacToeGame();
ticTacToeGame.start();

function TicTacToeGame() {
    const board = new Board();
    const player1 = new Player1(board);
    const player2 = new Player2(board);
    let turn = 0;

    this.start = function () {
        const config = {
            childList: true
        };
        const observer = new MutationObserver(() => takeTurn());
        board.positions.forEach((element) => observer.observe(element, config));
        takeTurn();
    }

    function takeTurn() {
        if (board.checkForWinner()) {
            return;
        }

        if (turn % 2 === 0) {
            player1.takeTurn();
        } else {
            player2.takeTurn();
        }
        turn++;
    }
}

function Board() {

    this.positions = Array.from(document.querySelectorAll('.col'));
    this.checkForWinner = function () {
        let winner = false;
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        const positions = this.positions;
        winningCombinations.forEach((winningCombo) => {
            const pos0InnerText = positions[winningCombo[0]].innerText;
            const pos1InnerText = positions[winningCombo[1]].innerText;
            const pos2InnerText = positions[winningCombo[2]].innerText;
            const isWinningCombo = pos0InnerText !== '' &&
                pos0InnerText === pos1InnerText && pos1InnerText === pos2InnerText;
            if (isWinningCombo) {
                winner = true;
                winningCombo.forEach((index) => {
                    positions[index].className += ' winner';
                })
            }
        });
        return winner;
    }
}

function Player1(board) {
    let availablePositions = board.positions.filter((p) => p.innerText === '');
    this.takeTurn = function () {
        availablePositions.forEach(element => element.addEventListener('click', handleTurnTaken));
        console.log("Player1 turn");
    }

    function handleTurnTaken(availablePositions) {
        availablePositions.target.innerText = 'X';
        board.positions.forEach(element => element.removeEventListener('click', handleTurnTaken));
        // console.log("turn taken");
    }
}

function Player2(board) {
    this.takeTurn = function () {
        let availablePositions = board.positions.filter((p) => p.innerText === '');
        const move = Math.floor(Math.random() * (availablePositions.length - 0));
        availablePositions[move].innerText = 'O';
        console.log("Player2 turn");
    }
}

function reset() {
    location.reload();
}

btnReset.addEventListener('click', reset);