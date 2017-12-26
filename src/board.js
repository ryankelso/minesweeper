export class Board {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows * numberOfColumns;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }

  get playerBoard() {
    return this._playerBoard;
  }

  // if the tile hasn't yet been flipped, then determine if it's a bomb or the number of neighbor bombs
  flipTile(rowIndex, columnIndex) {
    if (this._playerBoard[rowIndex][columnIndex] !== ' ') {
      console.log('This tile has already been flipped!');
      return;
    }
    else if (this._bombBoard[rowIndex][columnIndex] === 'B') {
      this._playerBoard[rowIndex][columnIndex] = 'B';
    }
    else {
      this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex,columnIndex);
    }
    this._numberOfTiles--;
  }

  // determines how many neighbor tiles of the input tile contain bombs
  getNumberOfNeighborBombs(rowIndex, columnIndex) {
    // the offsets are applied to the input tile to determine the coordinates of each neighbor tile
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
    const numberOfRows = this._bombBoard.length;
    const numberOfColumns = this._bombBoard[0].length;
    let numberOfBombs = 0;
    neighborOffsets.forEach(offset => {
      const neighborRowIndex = rowIndex + offset[0];
      const neighborColumnIndex = columnIndex + offset[1];
      // checks each neighbor tile for a bomb, increment the number of bombs if true
      if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
        if (this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
          numberOfBombs++;
        };
      };
    });
    return numberOfBombs;
  }

  // checks to see if there are any safe tiles remaining
  // if false, the player has won
  hasSafeTiles() {
    return this._numberOfTiles !== this._numberOfBombs;
  }

  // prints the player's board, in a more legible format
  print() {
    console.log(this._playerBoard.map(row => row.join(' | ')).join('\n'));
  }

  // dynamically creates the player board based on number of rows and columns input
  static generatePlayerBoard(numberOfRows,numberOfColumns) {
    const board = [];
    for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++){
      const row = [];
      for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++){
        row.push(' ');
      };
      board.push(row);
    };
    return board;
  }

  // dynamically creates the bomb board based on number of rows and columns input
  static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
    const board = [];
    for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++){
      const row = [];
      for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++){
        row.push(null);
      };
      board.push(row);
    };

    let numberOfBombsPlaced = 0;
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
  }
}
