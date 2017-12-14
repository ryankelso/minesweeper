// function to dynamically generate the player board
const generatePlayerBoard = (numberOfRows,numberOfColumns) => {
  const board = [];
  for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++){
    //console.log('row ' + (rowIndex + 1));
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
    board[randomRowIndex][randomColumnIndex] = 'B';
    numberOfBombsPlaced++;
    // bombs can be placed on top of existing bombs, fix later
  };



  return board;
};

const printBoard = board => {

};
