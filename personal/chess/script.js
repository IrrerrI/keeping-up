// 🎯 CHESS GAME - Easy to understand version with clear variable names and comments

// 📊 GAME STATE - These variables track what's happening in our game
let currentlySelectedPiece = null;  // Which piece the player clicked on
let whoseTurnItIs = 'white';        // Whose turn it is to move
let chessBoard = [];                // 2D array representing the 8x8 board

// 🏁 STARTING POSITIONS - How pieces are arranged at game start
// This array represents the board from top-left to bottom-right
// 'r' = black rook, 'R' = white rook, etc.
const startingPieceLayout = ['r','n','b','q','k','b','n','r',
                             'p','p','p','p','p','p','p','p',
                             '','','','','','','','',
                             '','','','','','','','',
                             '','','','','','','','',
                             '','','','','','','','',
                             'P','P','P','P','P','P','P','P',
                             'R','N','B','Q','K','B','N','R'];

// 🎨 VISUAL PIECE SYMBOLS - What the pieces look like on screen
const pieceVisualSymbols = {
    'K': '♔', 'Q': '♕', 'R': '♖', 'B': '♗', 'N': '♘', 'P': '♙', // White pieces
    'k': '♚', 'q': '♛', 'r': '♜', 'b': '♝', 'n': '♞', 'p': '♟'  // Black pieces
};

// 🗂️ PIECE TYPE MAPPING - Converts letters to class names
const letterToPieceClass = {
    'R': 'Rook', 'r': 'Rook',
    'N': 'Knight', 'n': 'Knight', 
    'B': 'Bishop', 'b': 'Bishop',
    'Q': 'Queen', 'q': 'Queen',
    'K': 'King', 'k': 'King',
    'P': 'Pawn', 'p': 'Pawn'
};

// 🧭 MOVEMENT DIRECTIONS - Think of these as compass directions for pieces
// Each pair [rowChange, colChange] tells us how to move one step in a direction
// 
// For example: [-1, 0] means "go up 1 row, don't change column"
//              [0, 1] means "don't change row, go right 1 column"
//              [-1, -1] means "go up 1 row AND left 1 column" (diagonal)
//
// 🤔 Why negative numbers? Because row 0 is at the TOP of the board!
//    So going "up" means making the row number smaller (going from row 7 to row 6)
const movementDirections = {
    // Straight lines: up, down, left, right (like a plus sign +)
    straightLines: [[-1, 0], [1, 0], [0, -1], [0, 1]], 
    
    // Diagonal lines: northeast, northwest, southeast, southwest (like an X)
    diagonalLines: [[-1, -1], [-1, 1], [1, -1], [1, 1]], 
    
    // Knight moves: L-shapes in all directions (like the letter L)
    knightJumps: [[-2, -1], [-2, 1], [-1, -2], [-1, 2], [1, -2], [1, 2], [2, -1], [2, 1]], 
    
    // King moves: all squares touching the king (8 directions)
    kingSteps: [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]]
};

// Piece classes
class Piece {
    constructor(color, type, position) {
        this.color = color;
        this.type = type;
        this.position = position;
        this.hasMoved = false;
        this.validMoves = [];
    }
}

class Pawn extends Piece {
    constructor(color, position) {
        super(color, 'pawn', position);
    }
}

class Rook extends Piece {
    constructor(color, position) {
        super(color, 'rook', position);
    }
}

class Knight extends Piece {
    constructor(color, position) {
        super(color, 'knight', position);
    }
}

class Bishop extends Piece {
    constructor(color, position) {
        super(color, 'bishop', position);
    }
}

class Queen extends Piece {
    constructor(color, position) {
        super(color, 'queen', position);
    }
}

class King extends Piece {
    constructor(color, position) {
        super(color, 'king', position);
    }
}

// 🔧 COORDINATE CONVERSION FUNCTIONS
// Chess uses letters and numbers (like "e4"), but computers use row/col numbers

/**
 * 📍 Convert chess notation to array coordinates
 * Example: "e4" becomes [4, 4] (row 4, column 4)
 * 
 * @param {string} chessPosition - Like "e4", "a1", "h8"
 * @returns {Array} [row, col] - Array coordinates for our board
 */
function chessPositionToArrayCoords(chessPosition) {
    const columnNumber = chessPosition.charCodeAt(0) - 97; // 'a'=0, 'b'=1, 'c'=2, etc.
    const rowNumber = 8 - parseInt(chessPosition[1]);      // '8'=0, '7'=1, '6'=2, etc.
    return [rowNumber, columnNumber];
}

/**
 * 📍 Convert array coordinates back to chess notation
 * Example: [4, 4] becomes "e4"
 * 
 * @param {number} rowNumber - Row in our array (0-7)
 * @param {number} colNumber - Column in our array (0-7)
 * @returns {string|null} Chess position like "e4", or null if invalid
 */
function arrayCoordinatesToChessPosition(rowNumber, colNumber) {
    // Check if coordinates are valid (on the 8x8 board)
    if (rowNumber < 0 || rowNumber > 7 || colNumber < 0 || colNumber > 7) {
        return null; // Invalid position!
    }
    return String.fromCharCode(97 + colNumber) + (8 - rowNumber);
}

/**
 * 🔤 Convert column number to letter (helper function)
 * Example: 1 becomes "a", 2 becomes "b"
 */
function columnNumberToLetter(columnNumber) {
    return String.fromCharCode(96 + columnNumber);
}

/**
 * 🎨 Determine piece color from its character
 * Uppercase = White, Lowercase = Black
 * 
 * @param {string} pieceCharacter - Like 'K' or 'k'
 * @returns {string} 'white' or 'black'
 */
function getPieceColorFromCharacter(pieceCharacter) {
    return pieceCharacter === pieceCharacter.toUpperCase() ? 'white' : 'black';
}

/**
 * ✅ Check if row and column numbers are valid (on the board)
 * 
 * @param {number} rowNumber - Row to check
 * @param {number} colNumber - Column to check
 * @returns {boolean} True if valid, false if off the board
 */
function isSquareOnBoard(rowNumber, colNumber) {
    return rowNumber >= 0 && rowNumber <= 7 && colNumber >= 0 && colNumber <= 7;
}

/**
 * 🔍 Get the piece sitting on a specific square
 * 
 * @param {string} chessPosition - Like "e4"
 * @returns {Object|null} The piece object, or null if square is empty
 */
function getPieceAtPosition(chessPosition) {
    const [rowNumber, colNumber] = chessPositionToArrayCoords(chessPosition);
    return chessBoard[rowNumber][colNumber];
}

/**
 * 📍 Place a piece on the board (or remove it by passing null)
 * 
 * @param {string} chessPosition - Where to place the piece
 * @param {Object|null} pieceObject - The piece to place, or null to remove
 */
function placePieceAtPosition(chessPosition, pieceObject) {
    const [rowNumber, colNumber] = chessPositionToArrayCoords(chessPosition);
    chessBoard[rowNumber][colNumber] = pieceObject;
    
    // Update the piece's position if we're placing a piece
    if (pieceObject) {
        pieceObject.position = chessPosition;
    }
}

// 🚀 MOVE CALCULATION - The smart part that figures out where pieces can go!

/**
 * 🎯 MAIN FUNCTION: Calculate all legal moves for a piece
 * This is like asking "Where can this piece go?"
 * 
 * @param {Object} chessPiece - The piece we want to move
 */
function findAllValidMovesForPiece(chessPiece) {
    // Clear old moves and start fresh
    chessPiece.validMoves = [];
    
    // Convert the piece's current position to row/col numbers
    const [currentRow, currentCol] = chessPositionToArrayCoords(chessPiece.position);
    
    // Different pieces move in different ways
    switch (chessPiece.type) {
        case 'pawn':
            // Pawns are special - they move forward but capture diagonally
            calculatePawnMoves(chessPiece, currentRow, currentCol);
            break;
        case 'rook':
            // Rooks move in straight lines (horizontal and vertical)
            calculateSlidingPieceMoves(chessPiece, currentRow, currentCol, movementDirections.straightLines);
            break;
        case 'bishop':
            // Bishops move diagonally
            calculateSlidingPieceMoves(chessPiece, currentRow, currentCol, movementDirections.diagonalLines);
            break;
        case 'queen':
            // Queens can move like both rooks and bishops
            const queenDirections = [...movementDirections.straightLines, ...movementDirections.diagonalLines];
            calculateSlidingPieceMoves(chessPiece, currentRow, currentCol, queenDirections);
            break;
        case 'king':
            // Kings move one square in any direction
            calculateSingleStepMoves(chessPiece, currentRow, currentCol, movementDirections.kingSteps);
            break;
        case 'knight':
            // Knights jump in L-shapes
            calculateSingleStepMoves(chessPiece, currentRow, currentCol, movementDirections.knightJumps);
            break;
    }
}

/**
 * 🛤️ SLIDING PIECES: Calculate moves for pieces that slide (rook, bishop, queen)
 * These pieces keep moving in a direction until they hit something or the edge
 * 
 * Think of it like rolling a ball - it keeps going until it hits a wall or another ball
 * 
 * @param {Object} chessPiece - The piece that's moving
 * @param {number} startingRow - Where the piece is now (row)
 * @param {number} startingCol - Where the piece is now (column)
 * @param {Array} possibleDirections - Which directions this piece can move
 */
function calculateSlidingPieceMoves(chessPiece, startingRow, startingCol, possibleDirections) {
    // Try each direction the piece can move
    for (const [rowChange, colChange] of possibleDirections) {
        // Start from the piece's current position
        let currentRow = startingRow;
        let currentCol = startingCol;
        
        // Keep moving in this direction until we hit something
        while (true) {
            // Take one step in this direction
            currentRow += rowChange;   // Move up/down (rowChange is how much to change row)
            currentCol += colChange;   // Move left/right (colChange is how much to change column)
            
            // Check if we've gone off the edge of the board
            if (!isSquareOnBoard(currentRow, currentCol)) {
                break; // Stop! We've hit the edge
            }
            
            // Convert our row/col back to chess notation (like "e4")
            const targetSquare = arrayCoordinatesToChessPosition(currentRow, currentCol);
            const pieceAtTarget = getPieceAtPosition(targetSquare);
            
            if (pieceAtTarget === null) {
                // Empty square - we can move here!
                if (wouldMoveBeIllegal(chessPiece, targetSquare)) {
                    chessPiece.validMoves.push(targetSquare);
                }
            } else {
                // There's a piece here - we're blocked!
                if (pieceAtTarget.color !== chessPiece.color) {
                    // It's an enemy piece - we can capture it!
                    if (wouldMoveBeIllegal(chessPiece, targetSquare)) {
                        chessPiece.validMoves.push(targetSquare);
                    }
                }
                // Either way, we can't go any further in this direction
                break;
            }
        }
    }
}

/**
 * 👑 SINGLE-STEP PIECES: Calculate moves for pieces that move one step at a time
 * These pieces (king, knight) don't slide - they just jump to specific squares
 * 
 * @param {Object} chessPiece - The piece that's moving
 * @param {number} startingRow - Where the piece is now (row)
 * @param {number} startingCol - Where the piece is now (column) 
 * @param {Array} possibleDirections - All the single steps this piece can take
 */
function calculateSingleStepMoves(chessPiece, startingRow, startingCol, possibleDirections) {
    // Try each possible step
    for (const [rowChange, colChange] of possibleDirections) {
        // Calculate where we'd end up after this step
        const targetRow = startingRow + rowChange;
        const targetCol = startingCol + colChange;
        
        // Make sure we don't go off the board
        if (!isSquareOnBoard(targetRow, targetCol)) {
            continue; // Skip this move - it's off the board
        }
        
        // Convert to chess notation and check what's there
        const targetSquare = arrayCoordinatesToChessPosition(targetRow, targetCol);
        const pieceAtTarget = getPieceAtPosition(targetSquare);
        
        // Can we move there?
        if (pieceAtTarget === null || pieceAtTarget.color !== chessPiece.color) {
            // Either empty square OR enemy piece (we can capture enemies)
            if (wouldMoveBeIllegal(chessPiece, targetSquare)) {
                chessPiece.validMoves.push(targetSquare);
            }
        }
        // If it's our own piece, we can't move there (can't capture our own pieces)
    }
}

/**
 * ♟️ PAWN MOVES: Special logic for pawns (they're weird!)
 * Pawns are the only pieces that move differently than they capture
 * 
 * @param {Object} pawnPiece - The pawn we're calculating moves for
 * @param {number} pawnRow - Current row of the pawn
 * @param {number} pawnCol - Current column of the pawn
 */
function calculatePawnMoves(pawnPiece, pawnRow, pawnCol) {
    // Which direction does this pawn move?
    // White pawns move "up" (row numbers get smaller: 7→6→5...)
    // Black pawns move "down" (row numbers get bigger: 2→3→4...)
    const forwardDirection = pawnPiece.color === 'white' ? -1 : 1;
    
    // Where do pawns start? (for the 2-square move rule)
    const pawnStartingRow = pawnPiece.color === 'white' ? 6 : 1;
    
    // 🚶 FORWARD MOVES (pawns move forward, but only to empty squares)
    const oneSquareForward = pawnRow + forwardDirection;
    if (isSquareOnBoard(oneSquareForward, pawnCol)) {
        const oneStepSquare = arrayCoordinatesToChessPosition(oneSquareForward, pawnCol);
        
        // Can only move forward if the square is empty
        if (getPieceAtPosition(oneStepSquare) === null) {
            if (wouldMoveBeIllegal(pawnPiece, oneStepSquare)) {
                pawnPiece.validMoves.push(oneStepSquare);
            }
            
            // 🏃 If we can move one square AND we're on our starting row, try two squares
            if (pawnRow === pawnStartingRow) {
                const twoSquaresForward = pawnRow + (2 * forwardDirection);
                if (isSquareOnBoard(twoSquaresForward, pawnCol)) {
                    const twoStepSquare = arrayCoordinatesToChessPosition(twoSquaresForward, pawnCol);
                    
                    // Can only move two squares if THAT square is also empty
                    if (getPieceAtPosition(twoStepSquare) === null) {
                        if (wouldMoveBeIllegal(pawnPiece, twoStepSquare)) {
                            pawnPiece.validMoves.push(twoStepSquare);
                        }
                    }
                }
            }
        }
    }
    
    // 🗡️ DIAGONAL CAPTURES (pawns capture diagonally, but only if there's an enemy there)
    for (const sideDirection of [-1, 1]) { // -1 = left diagonal, 1 = right diagonal
        const captureRow = pawnRow + forwardDirection;
        const captureCol = pawnCol + sideDirection;
        
        if (isSquareOnBoard(captureRow, captureCol)) {
            const captureSquare = arrayCoordinatesToChessPosition(captureRow, captureCol);
            const enemyPiece = getPieceAtPosition(captureSquare);
            
            // Can only capture if there's an ENEMY piece there (not our own, not empty)
            if (enemyPiece && enemyPiece.color !== pawnPiece.color) {
                if (wouldMoveBeIllegal(pawnPiece, captureSquare)) {
                    pawnPiece.validMoves.push(captureSquare);
                }
            }
        }
    }
}

// 🛡️ LEGAL MOVE CHECKING - Making sure moves don't break the rules

/**
 * 🚫 Check if a move would be illegal (puts own king in check)
 * We have to be careful not to move pieces in ways that expose our king to attack!
 * 
 * @param {Object} movingPiece - The piece we want to move
 * @param {string} destinationSquare - Where we want to move it
 * @returns {boolean} True if the move would be legal, false if illegal
 */
function wouldMoveBeIllegal(movingPiece, destinationSquare) {
    // 💾 Remember the current state so we can undo our test
    const originalPosition = movingPiece.position;
    const pieceAtDestination = getPieceAtPosition(destinationSquare);
    
    // 🎭 Make a pretend move to test it
    placePieceAtPosition(originalPosition, null);        // Remove piece from old spot
    placePieceAtPosition(destinationSquare, movingPiece); // Put piece in new spot
    
    // 👑 Check if this move puts our own king in danger
    const wouldKingBeInCheck = isKingCurrentlyInCheck(movingPiece.color);
    
    // 🔄 Undo the pretend move (put everything back)
    placePieceAtPosition(destinationSquare, pieceAtDestination); // Put back what was there
    placePieceAtPosition(originalPosition, movingPiece);         // Put our piece back
    
    // Return true if the move is LEGAL (doesn't put king in check)
    return !wouldKingBeInCheck;
}

/**
 * 👑 Check if a king is currently being attacked (in check)
 * 
 * @param {string} kingColor - 'white' or 'black'
 * @returns {boolean} True if the king is in check, false if safe
 */
function isKingCurrentlyInCheck(kingColor) {
    // 🔍 First, find where the king is
    let kingPosition = null;
    
    // Search the entire board for the king
    for (let rowNumber = 0; rowNumber < 8; rowNumber++) {
        for (let colNumber = 0; colNumber < 8; colNumber++) {
            const pieceOnThisSquare = chessBoard[rowNumber][colNumber];
            
            // Is this the king we're looking for?
            if (pieceOnThisSquare && 
                pieceOnThisSquare.type === 'king' && 
                pieceOnThisSquare.color === kingColor) {
                kingPosition = pieceOnThisSquare.position;
                break;
            }
        }
        if (kingPosition) break; // Found the king, stop searching
    }
    
    // If we can't find the king, something's wrong!
    if (!kingPosition) return false;
    
    // 🗡️ Now check if any enemy piece can attack the king
    for (let rowNumber = 0; rowNumber < 8; rowNumber++) {
        for (let colNumber = 0; colNumber < 8; colNumber++) {
            const pieceOnThisSquare = chessBoard[rowNumber][colNumber];
            
            // Is this an enemy piece?
            if (pieceOnThisSquare && pieceOnThisSquare.color !== kingColor) {
                // Can this enemy piece attack our king?
                if (canPieceAttackSpecificSquare(pieceOnThisSquare, kingPosition)) {
                    return true; // King is in check!
                }
            }
        }
    }
    
    return false; // King is safe
}

/**
 * ⚔️ Check if a specific piece can attack a specific square
 * This is like asking "Can this knight attack square e4?"
 * 
 * @param {Object} attackingPiece - The piece doing the attacking
 * @param {string} targetSquare - The square being attacked (like "e4")
 * @returns {boolean} True if the piece can attack that square
 */
function canPieceAttackSpecificSquare(attackingPiece, targetSquare) {
    const [pieceRow, pieceCol] = chessPositionToArrayCoords(attackingPiece.position);
    const [targetRow, targetCol] = chessPositionToArrayCoords(targetSquare);
    
    // Different pieces attack differently
    switch (attackingPiece.type) {
        case 'pawn':
            return canPawnAttackSquare(attackingPiece, pieceRow, pieceCol, targetRow, targetCol);
        case 'rook':
            return canSlidingPieceAttackSquare(pieceRow, pieceCol, targetRow, targetCol, movementDirections.straightLines);
        case 'bishop':
            return canSlidingPieceAttackSquare(pieceRow, pieceCol, targetRow, targetCol, movementDirections.diagonalLines);
        case 'queen':
            const queenDirections = [...movementDirections.straightLines, ...movementDirections.diagonalLines];
            return canSlidingPieceAttackSquare(pieceRow, pieceCol, targetRow, targetCol, queenDirections);
        case 'king':
            return canSingleStepPieceAttackSquare(pieceRow, pieceCol, targetRow, targetCol, movementDirections.kingSteps);
        case 'knight':
            return canSingleStepPieceAttackSquare(pieceRow, pieceCol, targetRow, targetCol, movementDirections.knightJumps);
        default:
            return false;
    }
}

/**
 * ♟️ Special pawn attack checking (pawns are weird!)
 * Pawns only attack diagonally, one square forward
 */
function canPawnAttackSquare(pawnPiece, pawnRow, pawnCol, targetRow, targetCol) {
    const forwardDirection = pawnPiece.color === 'white' ? -1 : 1;
    
    // Pawn can only attack one square diagonally forward
    return targetRow === pawnRow + forwardDirection && Math.abs(targetCol - pawnCol) === 1;
}

/**
 * 🔍 Check if sliding pieces (rook, bishop, queen) can attack a square
 * These pieces slide until they hit something, so we need to check the path
 * 
 * @param {number} fromRow - Where the attacking piece is (row)
 * @param {number} fromCol - Where the attacking piece is (column)
 * @param {number} toRow - Square being attacked (row)
 * @param {number} toCol - Square being attacked (column)
 * @param {Array} allowedDirections - Which directions this piece can move
 * @returns {boolean} True if piece can attack the square
 */
function canSlidingPieceAttackSquare(fromRow, fromCol, toRow, toCol, allowedDirections) {
    // Try each direction the piece can move
    for (const [rowChange, colChange] of allowedDirections) {
        // Skip the "no movement" direction
        if (rowChange === 0 && colChange === 0) continue;
        
        // Calculate how far we need to move to reach the target
        const rowDistance = toRow - fromRow;
        const colDistance = toCol - fromCol;
        
        // 🧭 Check if the target is actually in this direction
        if (rowChange !== 0 && colChange !== 0) {
            // 📐 DIAGONAL movement - must move equal amounts in row and column
            if (Math.abs(rowDistance) !== Math.abs(colDistance)) continue;
            if (Math.sign(rowDistance) !== Math.sign(rowChange) || 
                Math.sign(colDistance) !== Math.sign(colChange)) continue;
        } else if (rowChange !== 0) {
            // ↕️ VERTICAL movement - column shouldn't change
            if (colDistance !== 0) continue;
            if (Math.sign(rowDistance) !== Math.sign(rowChange)) continue;
        } else {
            // ↔️ HORIZONTAL movement - row shouldn't change
            if (rowDistance !== 0) continue;
            if (Math.sign(colDistance) !== Math.sign(colChange)) continue;
        }
        
        // 🚧 Check if the path is clear (no pieces blocking the way)
        const numberOfSteps = Math.max(Math.abs(rowDistance), Math.abs(colDistance));
        let pathIsBlocked = false;
        
        // Check each square along the path (but not the final square)
        for (let stepNumber = 1; stepNumber < numberOfSteps; stepNumber++) {
            const checkRow = fromRow + (rowChange * stepNumber);
            const checkCol = fromCol + (colChange * stepNumber);
            const squareToCheck = arrayCoordinatesToChessPosition(checkRow, checkCol);
            
            // Is there a piece blocking this square?
            if (getPieceAtPosition(squareToCheck) !== null) {
                pathIsBlocked = true;
                break; // Found a blocking piece, stop checking
            }
        }
        
        // If path is clear, the piece can attack!
        if (!pathIsBlocked) {
            return true;
        }
    }
    
    return false; // Can't attack in any direction
}

/**
 * 🐎 Check if single-step pieces (king, knight) can attack a square
 * These pieces don't slide, they just jump to specific squares
 * 
 * @param {number} fromRow - Where the attacking piece is (row)
 * @param {number} fromCol - Where the attacking piece is (column)
 * @param {number} toRow - Square being attacked (row)
 * @param {number} toCol - Square being attacked (column)
 * @param {Array} allowedMoves - All the single steps this piece can make
 * @returns {boolean} True if piece can attack the square
 */
function canSingleStepPieceAttackSquare(fromRow, fromCol, toRow, toCol, allowedMoves) {
    const rowDistance = toRow - fromRow;
    const colDistance = toCol - fromCol;
    
    // Check if the target square matches any of the allowed moves
    return allowedMoves.some(([rowChange, colChange]) => 
        rowChange === rowDistance && colChange === colDistance
    );
}

// 🎨 VISUAL HIGHLIGHTING - Show players where pieces can move

/**
 * 💡 Light up all the squares where a piece can legally move
 * This helps players see their options!
 * 
 * @param {Object} chessPiece - The piece whose moves we want to highlight
 */
function showAllValidMovesForPiece(chessPiece) {
    removeAllHighlights(); // Clear any old highlights first
    
    // Light up each square the piece can move to
    chessPiece.validMoves.forEach(chessPosition => {
        const squareElement = document.getElementById(chessPosition);
        if (squareElement) {
            squareElement.classList.add('valid-move');
        }
    });
}

/**
 * 🚫 Remove all highlighting from the board
 * This cleans up the visual display
 */
function removeAllHighlights() {
    document.querySelectorAll('.valid-move').forEach(squareElement => {
        squareElement.classList.remove('valid-move');
    });
}

// 🏗️ GAME SETUP - Creating the chess board and pieces

/**
 * 🎯 Main board creation function
 * This builds the entire visual chess board with all 64 squares and pieces
 */
function buildCompleteChessBoard() {
    const boardContainer = document.querySelector('.board');
    const coordinateDisplay = document.getElementById('square-tracker');
    
    // Start with a clean board
    boardContainer.innerHTML = '';
    
    // Create all 64 squares (8 rows × 8 columns)
    for (let squareIndex = 0; squareIndex < 64; squareIndex++) {
        // Calculate which row and column this square is in
        const columnNumber = 1 + (squareIndex % 8);  // 1-8 (left to right)
        const rowNumber = 8 - Math.floor(squareIndex / 8);  // 8-1 (top to bottom)
        
        // Create the square element
        const squareElement = document.createElement('div');
        squareElement.dataset.col = columnNumber;
        squareElement.dataset.row = rowNumber;
        squareElement.classList.add('square');
        squareElement.id = columnNumberToLetter(columnNumber) + rowNumber;
        
        // 🎨 Color the squares (checkerboard pattern)
        if ((rowNumber + columnNumber) % 2 === 0) {
            squareElement.classList.add('dark-square');
        } else {
            squareElement.classList.add('light-square');
        }
        
        // 🖱️ Add click handling
        squareElement.addEventListener('click', () => {
            // Update the coordinate display (for debugging)
            if (coordinateDisplay) {
                coordinateDisplay.textContent = squareElement.id + ` (col: ${columnNumber}, row: ${rowNumber})`;
            }
            // Handle the actual chess game logic
            handlePlayerClickOnSquare(squareElement.id);
        });
        
        // 🎭 Add a piece if one should be here
        const pieceCharacter = startingPieceLayout[squareIndex];
        if (pieceCharacter !== '') {
            createAndPlacePieceOnSquare(squareElement, pieceCharacter);
        }
        
        // Add the square to the board
        boardContainer.appendChild(squareElement);
    }
}

/**
 * 👑 Create a chess piece and put it on a square
 * This function creates both the visual piece and the game logic piece
 * 
 * @param {Element} squareElement - The HTML square to put the piece on
 * @param {string} pieceCharacter - The piece letter (like 'K' for white king)
 */
function createAndPlacePieceOnSquare(squareElement, pieceCharacter) {
    // 🎨 Create the visual part of the piece
    const visualPieceElement = document.createElement('div');
    visualPieceElement.classList.add('piece');
    visualPieceElement.textContent = pieceVisualSymbols[pieceCharacter];
    
    // 🧠 Create the game logic part of the piece
    const pieceType = letterToPieceClass[pieceCharacter];
    const pieceColor = getPieceColorFromCharacter(pieceCharacter);
    const piecePosition = squareElement.id;
    
    let gameLogicPiece;
    switch (pieceType) {
        case 'Pawn':
            gameLogicPiece = new Pawn(pieceColor, piecePosition);
            break;
        case 'Rook':
            gameLogicPiece = new Rook(pieceColor, piecePosition);
            break;
        case 'Knight':
            gameLogicPiece = new Knight(pieceColor, piecePosition);
            break;
        case 'Bishop':
            gameLogicPiece = new Bishop(pieceColor, piecePosition);
            break;
        case 'Queen':
            gameLogicPiece = new Queen(pieceColor, piecePosition);
            break;
        case 'King':
            gameLogicPiece = new King(pieceColor, piecePosition);
            break;
        default:
            console.warn('Unknown piece type:', pieceType);
            return;
    }
    
    // 🔗 Connect the visual piece to the game piece
    visualPieceElement._pieceObj = gameLogicPiece;
    squareElement.dataset.hasPiece = 'true';
    
    // 📋 Add the piece to our game board array
    const [rowNumber, colNumber] = chessPositionToArrayCoords(piecePosition);
    chessBoard[rowNumber][colNumber] = gameLogicPiece;
    
    // 🏠 Put the visual piece on the square
    squareElement.appendChild(visualPieceElement);
}

/**
 * 🏁 Initialize the entire game
 * This sets up the empty board and then creates all the pieces
 */
function initializeCompleteGame() {
    // Create empty 8x8 array for our game logic
    chessBoard = Array(8).fill(null).map(() => Array(8).fill(null));
    
    // Create the visual board with all pieces
    buildCompleteChessBoard();
}

// 🎮 GAME INTERACTION - What happens when players click

/**
 * 🖱️ Handle when a player clicks on any square
 * This is the main game interaction function!
 * 
 * @param {string} clickedSquareId - Which square was clicked (like "e4")
 */
function handlePlayerClickOnSquare(clickedSquareId) {
    const pieceOnClickedSquare = getPieceAtPosition(clickedSquareId);
    
    if (currentlySelectedPiece) {
        // 🎯 We already have a piece selected, so player is trying to move it
        
        if (currentlySelectedPiece.validMoves.includes(clickedSquareId)) {
            // ✅ Valid move! Make the move
            executeMove(currentlySelectedPiece, clickedSquareId);
            removeAllHighlights();
            currentlySelectedPiece = null;
            
        } else if (pieceOnClickedSquare && pieceOnClickedSquare.color === whoseTurnItIs) {
            // 🔄 Player clicked on a different piece of their own color
            findAllValidMovesForPiece(pieceOnClickedSquare);
            showAllValidMovesForPiece(pieceOnClickedSquare);
            currentlySelectedPiece = pieceOnClickedSquare;
            
        } else {
            // ❌ Invalid move or empty square - deselect everything
            removeAllHighlights();
            currentlySelectedPiece = null;
        }
        
    } else if (pieceOnClickedSquare && pieceOnClickedSquare.color === whoseTurnItIs) {
        // 🎯 No piece selected yet, and player clicked on their own piece
        findAllValidMovesForPiece(pieceOnClickedSquare);
        showAllValidMovesForPiece(pieceOnClickedSquare);
        currentlySelectedPiece = pieceOnClickedSquare;
    }
    // If clicked on empty square or enemy piece with nothing selected, do nothing
}

/**
 * 🏃 Execute a chess move (move a piece from one square to another)
 * This handles both the visual update and the game logic
 * 
 * @param {Object} movingPiece - The piece that's moving
 * @param {string} destinationSquare - Where it's going (like "e4")
 */
function executeMove(movingPiece, destinationSquare) {
    // 🧹 Remove the piece from its old square (visually)
    const oldSquareElement = document.getElementById(movingPiece.position);
    if (oldSquareElement) {
        const oldPieceElement = oldSquareElement.querySelector('.piece');
        if (oldPieceElement) {
            oldSquareElement.removeChild(oldPieceElement);
        }
        oldSquareElement.dataset.hasPiece = 'false';
    }
    
    // 🧹 Remove the piece from the game board array
    placePieceAtPosition(movingPiece.position, null);
    
    // 🏠 Place the piece in its new location (game logic)
    placePieceAtPosition(destinationSquare, movingPiece);
    movingPiece.hasMoved = true; // Mark that this piece has moved (important for castling/pawn rules)
    
    // 🎨 Update the visual board
    const newSquareElement = document.getElementById(destinationSquare);
    if (newSquareElement) {
        // Remove any piece that was already there (capturing)
        const existingPieceElement = newSquareElement.querySelector('.piece');
        if (existingPieceElement) {
            newSquareElement.removeChild(existingPieceElement);
        }
        
        // Create new visual piece element
        const newPieceElement = document.createElement('div');
        newPieceElement.classList.add('piece');
        
        // Get the right symbol for this piece
        const pieceCharacter = convertPieceToCharacter(movingPiece);
        newPieceElement.textContent = pieceVisualSymbols[pieceCharacter];
        newPieceElement._pieceObj = movingPiece;
        
        // Place the visual piece on the new square
        newSquareElement.appendChild(newPieceElement);
        newSquareElement.dataset.hasPiece = 'true';
    }
    
    // 🔄 Switch whose turn it is
    whoseTurnItIs = whoseTurnItIs === 'white' ? 'black' : 'white';
    
    // 📺 Update any displays
    updateGameDisplay();
}

/**
 * 🔄 Convert a piece object back to its character representation
 * Example: White King object becomes 'K', Black pawn becomes 'p'
 * 
 * @param {Object} pieceObject - The piece to convert
 * @returns {string} The character representation
 */
function convertPieceToCharacter(pieceObject) {
    const typeToCharacterMap = {
        'pawn': 'P',
        'rook': 'R', 
        'knight': 'N',
        'bishop': 'B',
        'queen': 'Q',
        'king': 'K'
    };
    
    let character = typeToCharacterMap[pieceObject.type];
    
    // Black pieces use lowercase
    if (pieceObject.color === 'black') {
        character = character.toLowerCase();
    }
    
    return character;
}

/**
 * 📺 Update the game display (like showing whose turn it is)
 */
function updateGameDisplay() {
    console.log('Board updated - Current player:', whoseTurnItIs);
    
    // Update any UI elements that show current player
    const playerDisplayElement = document.getElementById('current-player');
    if (playerDisplayElement) {
        playerDisplayElement.textContent = whoseTurnItIs;
    }
}

// 🚀 START THE GAME!
// This runs when the web page finishes loading
document.addEventListener('DOMContentLoaded', () => {
    initializeCompleteGame();
});