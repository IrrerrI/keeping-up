const squareTracker = document.getElementById('square-tracker');



const board = document.querySelector('.board');
const getColLetter = (col) => String.fromCharCode(96 + col);
const startState = ['r','n','b','q','k','b','n','r',
                    'p','p','p','p','p','p','p','p',
                    '','','','','','','','',
                    '','','','','','','','',
                    '','','','','','','','',
                    '','','','','','','','',
                    'P','P','P','P','P','P','P','P',
                    'R','N','B','Q','K','B','N','R'];



for (let i = 0; i < 64; i++) {
    const square = document.createElement('div');
    const col = 1 + (i % 8);
    const row = 8 - Math.floor(i / 8);
    square.dataset.col = col;
    square.dataset.row = row;
    
    square.classList.add('square');
    square.id = getColLetter(col) + row;
    
    if ((row + col) % 2 === 0) {
        square.classList.add('dark-square');
    } else {
        square.classList.add('light-square');
    }
    
    square.addEventListener('click', () => {
         // Log the coordinates for testing
        squareTracker.textContent = square.id + ` (col: ${col}, row: ${row})`;
    });
    if (startState[i] !== '') {
        const piece = document.createElement('div');
        piece.classList.add('piece');
        piece.textContent = startState[i];

        
        // Try to instantiate a matching piece class (Rook, Knight, etc.)
        // Expectation: piece classes are defined globally (e.g., in pieces.js)
        try {
            // Map letter indicators to class names (uppercase letters for white, lowercase for black)
            const letter = startState[i];
            const typeMap = {
                'R': 'Rook', 'r': 'Rook',
                'N': 'Knight', 'n': 'Knight',
                'B': 'Bishop', 'b': 'Bishop',
                'Q': 'Queen', 'q': 'Queen',
                'K': 'King', 'k': 'King',
                'P': 'Pawn', 'p': 'Pawn'
            };
            square.dataset.hasPiece = 'true';
            square.firstChild = piece;
            square.firstChild.classList.add(typeMap[letter]);
            const className = typeMap[letter];
            if (className && typeof window[className] === 'function') {
                // Create piece instance and attach to element and global list
                const pieceObj = new window[className](square);
                piece._pieceObj = pieceObj; // attach to DOM element
                window.allPieces = window.allPieces || [];
                window.allPieces.push(pieceObj);
            } else if (className) {
                console.warn(`Piece class ${className} not found on window; skipping object creation.`);
            }
        } catch (e) {
            console.warn('Failed to create piece object for', startState[i], e);
        }
        
        
        square.appendChild(piece);
    }

    board.appendChild(square);
}


const showValidMoves = (piece) => {
    // Clear previous highlights
    document.querySelectorAll('.square').forEach(sq => {
        sq.classList.remove('highlighted');
        if (sq.id ) {
            sq.classList.add('highlighted');
        }
    });
};

// Initial test: show valid moves for the piece at e2 (white pawn)
const initialSquare = document.getElementById('e2');
if (initialSquare && initialSquare.firstChild && initialSquare.firstChild._pieceObj) {
    showValidMoves(initialSquare.firstChild._pieceObj);
}

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



