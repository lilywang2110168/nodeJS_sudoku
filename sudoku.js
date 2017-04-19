/*
Name: Zhe Wang, Xueying Ding, Hanwen Ling
Email:zhe.wang@vanderbilt.edu
Date:April 14, 2017
Course: Programming languages
Honor statement:I did not receive nor give unahtorized help.
Description: Project 4
 */

//the node.js module used to read files
fs = require('fs');

//initilaize the sudokuBoard, grid size and board size.
let sudokuBoard = [];
const GRID_NUMBER = 3;
const BOARD_SIZE = 9;
const FILE_NAME="sudoku.txt";

//this is the recursive solution that fills the sudokuboard or return false.
function solve(row, col) {
    if (row == BOARD_SIZE) {
        return true;
    } else if (col == BOARD_SIZE) {
        return solve(row + 1, 0);
    } else if (sudokuBoard[row][col] != 0) {
        return solve(row, col + 1);
    }
    for (let i = 1; i <= BOARD_SIZE; i++) {
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
    for (let col = 0; col < BOARD_SIZE; col++) {
        if (num == sudokuBoard[row][col]) {
            return false;
        }
    }
    return true;
}

//check whether we can place num by checking numbers in the column.
function checkCol(col, num) {
    for (let row = 0; row < BOARD_SIZE; row++) {
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
    for (let i = 0; i < GRID_NUMBER; i++) {
        for (let j = 0; j < GRID_NUMBER; j++) {
            if (sudokuBoard[row1 + i][col1 + j] == num) {
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
    let line = "";
    for (let row = 0; row < BOARD_SIZE; row++) {
        for (let col = 0; col < BOARD_SIZE; col++) {
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

//reads the input file
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

//the driver method that solves the sudoku puzzle
function sudokuDriver() {
    readFile(FILE_NAME);
    console.log("Here is the initial board");
    printBoard();
    let start = new Date();
    let end;
    if (solve(0, 0)) {
        console.log();
        console.log("Here is the solution");

        printBoard();
    } else {
        console.log("No solution");
    }

    //timing the solution
    end = new Date() - start;
    console.log();
    console.info("Execution time: %dms", end);
}

sudokuDriver();









