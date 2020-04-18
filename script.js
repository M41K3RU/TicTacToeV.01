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
        // console.log("It works");

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
    console.log(this.positions);

}

function Player1(board) {
    this.takeTurn = function () {
        board.positions.forEach(element => element.addEventListener('click', handleTurnTaken));
        console.log("Player1 turn");
    }

    function handleTurnTaken(event) {
        event.target.innerText = 'X';
        board.positions.forEach(element => element.removeEventListener('click', handleTurnTaken));
        // console.log("turn taken");
    }
}

function Player2(board) {
    this.takeTurn = function () {
        const availablePositions = board.positions.filter((p) => p.innerText === '');
        const move = Math.floor(Math.random() * availablePositions.length);
        availablePositions[move].innerText = 'O';
        console.log("Player2 turn");
    }
}