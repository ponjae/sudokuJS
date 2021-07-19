function initializeBoard() {
    let playBoard = []
    for (let i = 0; i < 9; i++) {
        row = []
        for (let j = 0; j < 9; j++) {
            row.push(0)
        }
        playBoard.push(row)
    }
    return playBoard
}

function rowChecker(board, num, row) {
    return !board[row].includes(num)
}

function colChecker(board, num, col) {
    let cols = []
    for (i = 0; i < board.length; i++) {
        cols.push(board[i][col])
    }
    return !cols.includes(num)
}

function boxChecker(board, num, row, col) {
    coordList = findTopLeftCoord(row, col)
    top_row_cord = coordList[0]
    top_col_cord = coordList[1]
    boxList = []
    for (i = top_row_cord; i < top_row_cord + 3; i++) {
        for (j = top_col_cord; j < top_col_cord + 3; j++) {
            boxList.push(board[i][j])
        }
    }
    return !boxList.includes(num)
}

function findTopLeftCoord(row, col) {
    offRow = row % 3
    offCol = col % 3
    return [row - offRow, col - offCol]
}

function isValidBoard(board, num, row, col) {
    return rowChecker(board, num, row) && colChecker(board, num, col) && boxChecker(board, num, row, col)
}

function solveBoard(board) {
    size = board.length
    for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
            if (board[row][col] == 0) {
                for (let val = 1; val <= size; val++) {
                    if (isValidBoard(board, val, row, col)) {
                        board[row][col] = val
                        if (solveBoard(board)) {
                            return true
                        } else {
                            board[row][col] = 0
                        }
                    }
                }
                return false
            }
        }
    }
    return true
}

let playBoard = initializeBoard()
playBoard[0][0] = 9
playBoard[8][8] = 7
solveBoard(playBoard)
console.log(playBoard.map(e => "" + e));