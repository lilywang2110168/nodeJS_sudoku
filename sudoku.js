//the node.js module used to read files
fs = require('fs');

//this is a global variable
let sudokuBoard = [];


function solve(row, col) {

}

function checkRow(row, num) {
    var col;
    for (col = 0; col < 9; col++) {
        if (num == sudokuBoard[row][col]) {
            return false;
        }
    }
    return true;
}

function checkCol(col, num) {
    var row;
    for (row = 0; row < 9; row++) {
        if (num == sudokuBoard[row][col]) {
            return false;
        }
    }
    return true;
}

function checkSubgrid(row, col, num) {

}

function check(row, col, num) {

}

function printBoard() {
    var row;
    var col;
    let line = "";
    for (row = 0; row < 9; row++) {
        for (col = 0; col < 9; col++) {
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
        console.log("Here is the solution");
        printBoard();
    } else {
        console.log("No solution");
    }

    //timing the solution
    let end = new Date() - start;
    console.info("Execution time: %dms", end);

}


main();









