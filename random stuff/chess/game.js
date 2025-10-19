const board = document.querySelector('.board');
const getColLetter = (col) => String.fromCharCode(96 + col);



for (let i = 0; i < 64; i++) {
    const square = document.createElement('div');
    const col = 1 + (i % 8);
    const row = 8 - Math.floor(i / 8);
    
    // Add data attributes for col and row
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
        console.log('Square clicked:', square.id);
        // Log the coordinates for testing
        console.log('Position:', {
            col: parseInt(square.dataset.col),
            row: parseInt(square.dataset.row),
            id: square.id
        });
    });
    board.appendChild(square);
}



