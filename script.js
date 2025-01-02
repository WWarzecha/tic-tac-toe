const board = function(){
    // generate 3x3 matrix filled with zeros
    let fields = [...Array(3).keys().map(() => [...Array(3).keys().map(() => null)])]

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
            let col1 = board[i][0];
            let col2 = board[i][1];
            let col3 = board[i][2];
            if(col1 === col2 && col1 === col3){
                return col1;
            };
        };
        // Check columns
        // col i
        for(let i = 0; i < 3; i++){
            let row1 = board[0][i];
            let row2 = board[1][i];
            let row3 = board[2][i];
            if(row1 === row2 && row1 === row3){
                return row1;
            };
        };
        let middleSymbol = board.getSymbol(1, 1);
        // Check right down diagonal
        if(middleSymbol === board[0][0] && middleSymbol === board.getSymbol[2][2]){
            return middleSymbol;
        };
        // Check right up diagonal
        if(middleSymbol === board.getSymbol[2][0] && middleSymbol === board.getSymbol[0][2]){
            return middleSymbol;
        };
        return false;
    };

    const logBoard = () => console.log(fields);

    return {setSymbol, getSymbol, logBoard, isFull, checkWin};
}();

const createPlayer = function(name = "guest", symbol){
    const playerName = name;
    const playerSymbol = symbol;
    return {name, symbol};
};

const game = function(){
    let player1 = createPlayer("player1", "o");
    let player2 = createPlayer("player2", "x");

}();


// console.log();