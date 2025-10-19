const squareTracker = document.getElementById('square-tracker');



const board = document.querySelector('.board');
const getColLetter = (col) => String.fromCharCode(96 + col);
const startState = ['r','n','b','q','k','b','n','r',
                    'p','p','p','p','p','p','p','p',
                    '','','','','','','','', '',
                    '','','','','','','','', '',
                    '','','','','','','','', '',
                    '','','','','','','','', '',
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
        
        square.appendChild(piece);
    }

    board.appendChild(square);
}



