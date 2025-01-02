const board = function(){
    // generate 3x3 matrix filled with zeros
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

    const reset = () => fields.forEach((row) => row.map(() => null));

    return {setSymbol, getSymbol, logBoard, isFull, checkWin, reset};
}();

const createPlayer = function(name = "guest", symbol){
    const playerName = name;
    const playerSymbol = symbol;
    return {playerName, playerSymbol};
};

const game = function(){
    let player1 = createPlayer("player1", "o");
    let player2 = createPlayer("player2", "x");
    let player1Move = true;
    let gameFinished = false;
    const playRound = function(x, y){
        if(!gameFinished){
            if(player1Move){
                board.setSymbol(x, y, player1.playerSymbol);
                player1Move = false;
            }
            else{
                board.setSymbol(x, y, player2.playerSymbol);
                player1Move = true;
            }
            checkGameFinish();
        };
    };
    const checkGameFinish = function(){
        if(board.checkWin()){
            gameFinished = true;
            console.log("Player with symbol: ", board.checkWin(), " won");
        }
        else if(board.isFull()){
            console.log("It's a tie");
            gameFinished = true;
        }
    }
    return {playRound};
}();


// console.log();