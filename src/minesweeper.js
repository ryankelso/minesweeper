// function to dynamically generate the player board
const generatePlayerBoard = (numberOfRows,numberOfColumns) => {
  const board = [];
  for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++){

    const row = [];
    for (columnIndex = 0; columnIndex < numberOfColumns; columnIndex++){
      row.push(' ');
    };
    board.push(row);
  };
  return board;
};

// function to dynamically generate the bomb board
const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
  const board = [];
  for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++){
    const row = [];
    for (columnIndex = 0; columnIndex < numberOfColumns; columnIndex++){
      row.push(null);
    };
    board.push(row);
  };

  numberOfBombsPlaced = 0;
  while (numberOfBombsPlaced < numberOfBombs) {
    // create a random integer between 0 and the number of rows or columns
    const randomRowIndex = Math.floor(Math.random() * numberOfRows);
    const randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
    // check if the selected cell is not already a bomb,
    // assign the cell to a bomb if true
    if (board[randomRowIndex][randomColumnIndex] !== 'B') {
      board[randomRowIndex][randomColumnIndex] = 'B';
      numberOfBombsPlaced++;
    }

  };
  return board;
};

// add comment
const getNumberOfNeighborBombs = (bombBoard, rowIndex, columnIndex) => {
  const neighborOffsets = [
    [-1,-1],
    [-1,0],
    [-1,1],
    [0,-1],
    [0,1],
    [1,-1],
    [1,0],
    [1,1]
  ];
  const numberOfRows = bombBoard.length;
  const numberOfColumns = bombBoard[0].length;
  let numberOfBombs = 0;
  neighborOffsets.forEach(offset => {
    const neighborRowIndex = rowIndex + offset[0];
    const neighborColumnIndex = columnIndex + offset[1];
    if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
      if (bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
        numberOfBombs++;
      };
    };
  });
  return numberOfBombs;
};

const flipTile = (playerBoard, bombBoard, rowIndex, columnIndex) => {
  if (playerBoard[rowIndex][columnIndex] !== ' ') {
    console.log('This tile has already been flipped!');
    return;
  }
  else if (bombBoard[rowIndex][columnIndex] === 'B') {
    playerBoard[rowIndex][columnIndex] = 'B';
  }
  else {
    playerBoard[rowIndex][columnIndex] = getNumberOfNeighborBombs(bombBoard,rowIndex,columnIndex);
  }
};

// prints the board, formatted to be more visually pleasing
const printBoard = board => console.log(board.map(row => row.join(' | ')).join('\n'));

const playerBoard = generatePlayerBoard(6,6);
const bombBoard = generateBombBoard(6,6,5);

console.log('Player Board: ');
printBoard(playerBoard);
console.log('Bomb Board: ');
printBoard(bombBoard);
flipTile(playerBoard,bombBoard,4,4);
console.log('Updated Player Board:');
printBoard(playerBoard);
