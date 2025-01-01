const board = function(){
    // generate 3x3 matrix filled with zeros
    let fields = [...Array(3).keys().map(() => [...Array(3).keys().map(() => 0)])]

    const setSymbol = function(x, y, symbol){
        fields[y][x] = symbol;
    };

    const getSymbol = function(x, y){
        return fields[y][x];
    };

    const logBoard = () => console.log(fields);
    return {setSymbol, getSymbol, logBoard};
}();

const createPlayer = function(name = "guest", symbol){
    const playerName = name;
    const playerSymbol = symbol;
    return {name, symbol};
};

// const game = function(){
//     const board = board();
//     let player1;
//     let player2;

// }();


// console.log();