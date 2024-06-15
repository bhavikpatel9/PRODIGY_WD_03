document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const restartButton = document.getElementById('restart');
    const modeSelect = document.getElementById('mode');
    let currentPlayer = 'X';
    let gameState = Array(9).fill(null);
    let gameActive = true;
    let isAiMode = false;

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const checkWinner = () => {
        for (let condition of winningConditions) {
            const [a, b, c] = condition;
            if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                highlightWinningCells(condition);
                return gameState[a];
            }
        }
        return null;
    };

    const highlightWinningCells = (winningCells) => {
        winningCells.forEach(index => {
            cells[index].classList.add('winning-cell');
        });
    };

    const handleCellClick = (e) => {
        const index = e.target.getAttribute('data-index');
        if (gameState[index] || !gameActive || (isAiMode && currentPlayer === 'O')) return;

        gameState[index] = currentPlayer;
        e.target.textContent = currentPlayer;

        const winner = checkWinner();
        if (winner) {
            setTimeout(() => {
                alert(`${winner} wins!`);
            }, 100);
            gameActive = false;
        } else if (gameState.every(cell => cell)) {
            setTimeout(() => {
                alert('It\'s a tie!');
            }, 100);
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            if (isAiMode && currentPlayer === 'O') {
                setTimeout(makeAiMove, 500);
            }
        }
    };

    const makeAiMove = () => {
        let availableCells = [];
        gameState.forEach((cell, index) => {
            if (!cell) availableCells.push(index);
        });

        if (availableCells.length > 0) {
            const aiMoveIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
            gameState[aiMoveIndex] = 'O';
            cells[aiMoveIndex].textContent = 'O';

            const winner = checkWinner();
            if (winner) {
                setTimeout(() => {
                    alert(`${winner} wins!`);
                }, 100);
                gameActive = false;
            } else if (gameState.every(cell => cell)) {
                setTimeout(() => {
                    alert('It\'s a tie!');
                }, 100);
                gameActive = false;
            } else {
                currentPlayer = 'X';
            }
        }
    };

    const handleRestart = () => {
        gameState.fill(null);
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('winning-cell');
        });
        currentPlayer = 'X';
        gameActive = true;
    };

    const handleModeChange = () => {
        isAiMode = modeSelect.value === 'ai';
        handleRestart();
    };

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    restartButton.addEventListener('click', handleRestart);
    modeSelect.addEventListener('change', handleModeChange);
});
