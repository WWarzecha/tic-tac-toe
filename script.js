const board = function(){
    // generate 3x3 matrix filled with zeros
    // let fields = [...Array(3).keys().map(() => [...Array(3).keys().map(() => null)])];
    let fields = [...Array(3).keys().map(() => [...Array(3).keys().map(() => null)])];

    const setSymbol = function(x, y, symbol){
        fields[y][x] = symbol;
    };

    const getSymbol = function(x, y){
        return fields[y][x];
    };

    const isFull = function(){
        return fields.flat().every((field) => field);
    };

    const checkWin = function(board){
        // Check rows
        // row i
        for(let i = 0; i < 3; i++){
            let col1 = fields[i][0];
            let col2 = fields[i][1];
            let col3 = fields[i][2];
            if(col1 && col1 === col2 && col1 === col3){
                return col1;
            };
        };
        // Check columns
        // col i
        for(let i = 0; i < 3; i++){
            let row1 = fields[0][i];
            let row2 = fields[1][i];
            let row3 = fields[2][i];
            if(row1 && row1 === row2 && row1 === row3){
                return row1;
            };
        };
        let middleSymbol = fields[1][1];
        if(!middleSymbol){
            return false;
        }
        // Check right down diagonal
        if(middleSymbol === fields[0][0] && middleSymbol === fields[2][2]){
            return middleSymbol;
        };
        // Check right up diagonal
        if(middleSymbol === fields[2][0] && middleSymbol === fields[0][2]){
            return middleSymbol;
        };
        return false;
    };

    const logBoard = () => console.log(fields);

    const reset = () => fields = [...Array(3).keys().map(() => [...Array(3).keys().map(() => null)])];

    return {setSymbol, getSymbol, logBoard, isFull, checkWin, reset};
}();

const player = function(name = "guest", symbol){
    let playerName = name;
    let playerSymbol = symbol;
    return {playerName, playerSymbol};
};

const game = function(){
    let player1 = player("player1", "O");
    let player2 = player("player2", "X");
    let player1Move = true;
    let gameFinished = false;
    let winner;
    const playRound = function(x, y){
        if(!gameFinished && !board.getSymbol(x, y)){
            if(player1Move){
                board.setSymbol(x, y, player1.playerSymbol);
            }
            else{
                board.setSymbol(x, y, player2.playerSymbol);
            }
            checkGameFinish();
            player1Move = !player1Move;
        };
        return board.getSymbol(x, y);
    };
    const checkGameFinish = function(){
        if(board.checkWin()){
            gameFinished = true;
            winner = (player1Move) ? player1.playerName : player2.playerName;
        }
        else if(board.isFull()){
            gameFinished = true;
        }
    }
    const resetGame = () => {
        player1Move = true;
        gameFinished = false;
        winner = null;
        board.reset();
    }

    const setPlayerName = (playerNumber, newPlayerName) => {
        if(playerNumber === 1){
            player1.playerName = newPlayerName;
        }
        else{
            player2.playerName = newPlayerName;
        };
    };

    const isFinished = () => gameFinished;
    const getWinner = () => winner;
    return {playRound, resetGame, isFinished, getWinner, setPlayerName};
}();

const createPlayerDOM = (text, playerNumber, game) => {
    const playerDOM = document.createElement("div");
    playerDOM.classList.add("player-div");
    playerDOM.classList.add("unselectable");
    playerDOM.textContent = text;

    const playerNameInput = document.createElement("input");
    playerNameInput.classList.add("name-input");
    playerNameInput.type = "text";
    playerNameInput.maxLength = 12;
    playerNameInput.onblur = function(){
        game.setPlayerName(playerNumber, playerNameInput.value.trim() || `Player${playerNumber}`);
    };
    playerDOM.appendChild(playerNameInput);

    return {playerDOM};
}


const DOMlogic = function(){
    let body = document.querySelector("body");
    // Players DOMS
    player1DOM = createPlayerDOM("Player 1 name: ", 1, game);
    player2DOM = createPlayerDOM("Player 2 name: ", 2, game);
    body.appendChild(player1DOM.playerDOM);
    body.appendChild(player2DOM.playerDOM);
    // Players DOMS end

    // Board
    let DOMboard = document.createElement("div");
    DOMboard.classList.add("board");

    for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
            let DOMfield = document.createElement("div");
            DOMfield.classList.add("field");
            DOMfield.classList.add("unselectable");
            DOMfield.onclick = () => {
                DOMfield.textContent = game.playRound(i, j);
                checkWinner();
            };
            DOMboard.appendChild(DOMfield);
        };
    };

    body.appendChild(DOMboard);
    // Board end

    // Winner modal
    DOMmodal = document.createElement("div");
    DOMmodal.classList.add("modal");
    DOMmodal.classList.add("unselectable");
    DOMmodal.onclick = () => {
        resetDOMFields();
        DOMmodal.style.display = "none";
    };

    body.appendChild(DOMmodal);

    const checkWinner = function(){
        if(game.isFinished()){
            let winner = game.getWinner();
            DOMmodal.textContent = (winner) ? `${winner} won the game!` : "It's a tie!";
            DOMmodal.style.display = "block";
        };
    };

    const resetDOMFields = function(){
        DOMboard.childNodes.forEach((DOMfield) => DOMfield.textContent = null);
        game.resetGame();
    };
    // Winner modal end
    // Restart button
    let restartButton = document.createElement("button");
    restartButton.classList.add("restart-button");
    restartButton.classList.add("unselectable");
    restartButton.textContent = "Restart";
    restartButton.onclick = () => resetDOMFields();

    body.appendChild(restartButton);
    // Restart button end
}();

