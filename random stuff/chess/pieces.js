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

const getColor = (square) => {  
    if (square.row <= 2) {
        return 'black';
    } else if (square.row >= 7) {
        return 'white';
    }
};

// RANDOM TESTS

// Base piece class
class PieceGeneral {
    constructor(square) {
        this.color = getColor(square);
        this.validMoves = [];
        this.startPosition = square.parentNode.id;
        this.id = this.startPosition;
        this.positionHistory = [String(this.startPosition)];
    }
}

// Specific piece class extending the base
class Rook extends PieceGeneral {
    constructor(square) {
        super(square);
        this.type = 'rook';
        this.letterIndicator = 'R';
    }
}

class Knight extends PieceGeneral {
    constructor(square) {
        super(square);
        this.type = 'knight';
        this.letterIndicator = 'N';
    }
};
class Bishop extends PieceGeneral {
    constructor(square) {
        super(square);
        this.type = 'bishop';
        this.letterIndicator = 'B';
    }
};
class Queen extends PieceGeneral {
    constructor(square) {
        super(square);
        this.type = 'queen';
        this.letterIndicator = 'Q';
    }
};
class King extends PieceGeneral {
    constructor(square) {
        super(square);
        this.type = 'king';
        this.letterIndicator = 'K';
    }
};
class Pawn extends PieceGeneral {
    constructor(square) {
        super(square);
        this.type = 'pawn';
        this.letterIndicator = 'P';
    }
};

