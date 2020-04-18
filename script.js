const ticTacToeGame = new TicTacToeGame();
ticTacToeGame.start();

function TicTacToeGame() {
    const board = new Board();
    const player1 = new Player1();
    const player2 = new Player2();
    let turn = 0;

    this.start = function () {
        const config = {
            childList: true
        };
        const observer = new MutationObserver(() => takeTurn());
        board.positions.forEach((element) => observer.observe(element, config));
    }

    function takeTurn() {
        console.log("It works");
    }
}

function Board() {
    this.positions = Array.from(document.querySelectorAll('.col'));
    console.log(this.positions);
}