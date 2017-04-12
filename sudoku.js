//the node.js module used to read files
fs = require('fs');

//this is a global variable
let sudokuBoard=[9];


function solve(row, col) {

}

function checkRow(row, col, num) {

}

function checkCol(row, col, num) {

}

function checkSubgrid(row, col, num) {

}

function check(row, col, num) {

}

function printBoard() {

}


function readFile(fileName){
   //opening the file
    let contents = fs.readFileSync("./"+fileName).toString('utf-8');
    let index = contents.indexOf('\n');
    let rowNum=0;

    //reading the input file line by line
    while (index > -1) {
        let line = contents.substring(0, index);
        contents = contents.substring(index + 1);
        let arr = line.trim().split(/\s+/);
        if(arr.length!=9){
            console.log("Each line of the input file must have 9 numbers");
            process.exit(1);
        }
        sudokuBoard[rowNum]=arr;
        index = contents.indexOf('\n');
        rowNum++;
    }
    if(rowNum!=9){
        console.log("The input file must contain 9 lines");
        process.exit(1);
    }
}


//here is main
readFile("sudoku.txt");
console.log("Here is the initial board");
printBoard();
let start = new Date();
if(solve(0,0)){
  console.log("Here is the solution");
  printBoard();
}else{
    console.log("No solution");
}

//timing the solution
var end = new Date() - start;
console.info("Execution time: %dms", end);






