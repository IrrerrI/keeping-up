checkValid = (piece, from, to, board) => {
    if (((to.square.hasPiece === true && to.piece.color !== piece.color)) 
        || (to.square.hasPiece === false)) {
            switch (piece.type) {
                case 'pawn':
                    if (piece.color === 'white') {
                        // Capture logic
                        if (board[to.col][to.row]) {
                            if (Math.abs(to.col - from.col) === 1 && (to.row === from.row - 1)) {
                                return true;
                            }
                        // Double Move Logic
                        } else if (piece.from.col === 2) {
                            if (to.col === from.col - 1 && to.row === from.row || 
                               to.col === from.col - 2 && to.row === from.row) {
                                return true;
                            }
                        // Move Logic
                        } else if (to.col === from.col - 1 && to.row === from.row) {
                                return true;
                            } else {
                                return false;
                            }
                        }
                     else if (piece.color === 'black') {
                        // Capture logic
                        if (board[to.col][to.row]) {
                            if (to.col === from.col + 1 && 
                               (to.row === from.row - 1 || to.row === from.row + 1)) {
                                return true;
                            }
                        // Double Move Logic
                        } else if (piece.from.col === 7) {
                            if (to.col === from.col + 1 && to.row === from.row || 
                               to.col === from.col + 2 && to.row === from.row) {
                                return true;
                            }
                        // Move logic
                        } else {
                            if (to.col === from.col + 1 && to.row === from.row) {
                                return true;
                            }
                        }
                    }
                    break;

                case 'rook':
                    if ((Math.abs(from.col - to.col) === 0 || Math.abs(from.row - to.row) === 0) && 
                        checkPathClear(from, to, board)) {
                        return true;
                    }
                    break;

                case 'knight':
                    if ((Math.abs(to.col - from.col) === 2 && Math.abs(to.row - from.row) === 1) || 
                        (Math.abs(to.col - from.col) === 1 && Math.abs(to.row - from.row) === 2)) {
                        return true;
                    }
                    break;

                case 'bishop':
                    if (Math.abs(from.col - to.col) === Math.abs(from.row - to.row) && 
                        checkPathClear(from, to, board)) {
                        return true;
                    }
                    break;

                case 'queen':
                    if (((Math.abs(from.col - to.col) === 0 || Math.abs(from.row - to.row) === 0) || 
                        (Math.abs(from.col - to.col) === Math.abs(from.row - to.row))) && 
                        checkPathClear(from, to, board)) {
                        return true;
                    }
                    break;

                case 'king':
                    const isInCheck = checkForCheck(from, to, board);
                    if (!isInCheck && Math.abs(to.col - from.col) <= 1 && 
                        Math.abs(to.row - from.row) <= 1) {
                        return true;
                    }
                    break;

                default:
                    throw new Error('Unknown piece type');
            }
        } else {
    return false;
        }
}
    

hasPiece = (square) => {
    if (!square.innerHTML('')) {
        return true;
    }
    else {
        return false;
    }  
}


checkPathClear = (from, to, board) => {
    // Horizontal movement
    if (from.row === to.row) {
        const start = Math.min(from.col, to.col);
        const end = Math.max(from.col, to.col);
        for (let col = start + 1; col < end; col++) {
            if (board[col][from.row]) return false;
        }
        return true;
    } 
    // Vertical movement
    else if (from.col === to.col) {
        const start = Math.min(from.row, to.row);
        const end = Math.max(from.row, to.row);
        for (let row = start + 1; row < end; row++) {
            if (board[from.col][row]) return false;
        }
        return true;
    }
    // Diagonal movement
    else if (Math.abs(from.col - to.col) === Math.abs(from.row - to.row)) {
        const diagonalDiff = Math.abs(from.col - to.col);
        for (let i = 1; i < diagonalDiff; i++) {
            if (board[(from.col + i)][from.row + i] || board[(from.col - i)][from.row + i] || board[(from.col - i)][from.row - i] || board[(from.col + i)][from.row - i]) {
                return false;
            } else {
                return true;
            }
        }
    }
    return false;
};


checkForCheck = (from, to, board) => {
    let allValidMoves = []
    enemyPieces.forEach(enemyPiece => {
        let validMoves = getValidMoves(enemyPiece, board)
        allValidMoves.push(...validMoves)
    });
    return allValidMoves.includes(to.square.id);
}



// RANDOM TESTS AI

const calculateRookMoves = (rook, currentSquare, board) => {
    rook.validMoves = []; // Clear previous valid moves
    const directions = [
        { col: 0, row: 1 },  // up
        { col: 0, row: -1 }, // down
        { col: 1, row: 0 },  // right
        { col: -1, row: 0 }  // left
    ];

    directions.forEach(dir => {
        let newCol = currentSquare.col;
        let newRow = currentSquare.row;

        // Keep moving in the current direction until we hit a boundary or piece
        while (true) {
            newCol += dir.col;
            newRow += dir.row;

            // Check if we're still on the board (assuming 8x8 board)
            if (newCol < 0 || newCol > 7 || newRow < 0 || newRow > 7) {
                break;
            }

            const square = board[newCol][newRow];
            // If square is empty, it's a valid move
            if (!square.hasPiece) {
                rook.validMoves.push(square.id);
            }
            // If square has an enemy piece, it's a valid move but we can't move further
            else if (square.piece.color !== rook.color) {
                rook.validMoves.push(square.id);
                break;
            }
            // If square has a friendly piece, we can't move here or beyond
            else {
                break;
            }
        }
    });
};

// Example rook piece
const rook = {
    type: 'rook',
    color: 'white',
    validMoves: [],
    initialPosition: 'a1',
    positionHistory: [initialPosition]
}