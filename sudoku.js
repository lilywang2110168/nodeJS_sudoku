//the node.js module used to read files
fs = require('fs');

//this is a global variable
//initilaize the sudokuBoard, grid size and board size.
let sudokuBoard = [];
let GRID_NUMBER = 3;
let BOARD_SIZE = 9;

//this is the recursive solution that fills the sudokuboard or return false.
function solve(row, col) {
    if (row == BOARD_SIZE) {
        return true;
    } else if (col == BOARD_SIZE) {
        return solve(row + 1, 0);
    } else if (sudokuBoard[row][col] != 0) {
        return solve(row, col + 1);
    }
    var i;
    for (i = 1; i <= BOARD_SIZE; i++) {
        var a = check(row, col, i);
        if (check(row, col, i)) {
            sudokuBoard[row][col] = i;
            if (solve(row, col + 1)) {
                return true;
            }
        }
    }
    sudokuBoard[row][col] = 0;
    return false;
}

//check whether we can place num by checking numbers in the row.
function checkRow(row, num) {
    var col;
    for (col = 0; col < BOARD_SIZE; col++) {
        if (num == sudokuBoard[row][col]) {
            return false;
        }
    }
    return true;
}

//check whether we can place num by checking numbers in the column.
function checkCol(col, num) {
    var row;
    for (row = 0; row < BOARD_SIZE; row++) {
        if (num == sudokuBoard[row][col]) {
            return false;
        }
    }
    return true;
}

//check whether we can place num by checking numbers in the subgrid.
function checkSubgrid(row, col, num) {
    let row1 = Math.floor(row / GRID_NUMBER) * GRID_NUMBER;
    let col1 = Math.floor(col / GRID_NUMBER) * GRID_NUMBER;
    var i;
    var j;
    for (i = 0; i < GRID_NUMBER; i++) {
        for (j = 0; j < GRID_NUMBER; j++) {
            if (sudokuBoard[row1 + i][col1 + i] == num) {
                return false;
            }
        }
    }
    return true;
}

//we check all the surrounding row, column and the subgrid to see whether
//we can place a number at a certain position.
function check(row, col, num) {
    return checkCol(col, num) && checkRow(row, num) && checkSubgrid(row, col, num);
}

//print the sudoku board onto console.
function printBoard() {
    var row;
    var col;
    let line = "";
    for (row = 0; row < BOARD_SIZE; row++) {
        for (col = 0; col < BOARD_SIZE; col++) {
            line = line + sudokuBoard[row][col] + " ";
            if (col == 2 || col == 5) {
                line = line + "| ";
            }
        }
        console.log(line);
        line = "";
        if (row == 2 || row == 5) {
            console.log("------+-------+------");
        }
    }
}


function readFile(fileName) {
    //opening the file
    let contents = fs.readFileSync("./" + fileName).toString('utf-8');
    let index = contents.indexOf('\n');
    let rowNum = 0;

    //reading the input file line by line
    while (index > -1) {
        let line = contents.substring(0, index);
        contents = contents.substring(index + 1);
        let arr = line.trim().split(/\s+/);
        if (arr.length != 9) {
            console.log("Each line of the input file must have 9 numbers");
            process.exit(1);
        }
        sudokuBoard[rowNum] = arr;
        index = contents.indexOf('\n');
        rowNum++;
    }
    if (rowNum != 9) {
        console.log("The input file must contain 9 lines");
        process.exit(1);
    }
}

function main() {
    readFile("sudoku.txt");
    console.log("Here is the initial board");
    printBoard();
    let start = new Date();
    if (solve(0, 0)) {
        console.log();
        console.log("Here is the solution");
        printBoard();
    } else {
        console.log("No solution");
    }

    //timing the solution
    let end = new Date() - start;
    console.log();
    console.info("Execution time: %dms", end);

}


main();









