document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('game-board');
    const newGameButton = document.getElementById('new-game');
    const winPopup = document.getElementById('win-popup');
    const winnerAnnouncement = document.getElementById('winner-announcement');
    const closePopupButton = document.getElementById('close-popup');
    let currentPlayer = 'X';
    let gameActive = true;
    let gameState = ['', '', '', '', '', '', '', '', ''];
    const statusDisplay = document.getElementById('status-action');

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

    function handleCellPlayed(clickedCell, clickedCellIndex) {
      gameState[clickedCellIndex] = currentPlayer;
      clickedCell.innerHTML = currentPlayer;
    }

    function handlePlayerChange() {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      statusDisplay.innerHTML = `${currentPlayer}'s turn`; // Update the status display
    }

    function handleResultValidation() {
      let roundWon = false;
      for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
          continue;
        }
        if (a === b && b === c) {
          roundWon = true;
          break;
        }
      }

      if (roundWon) {
        announceWinner(currentPlayer);
        gameActive = false;
        return;
      }

      let roundDraw = !gameState.includes('');
      if (roundDraw) {
        announceWinner(null);
        gameActive = false;
        return;
      }

      handlePlayerChange();
    }

    function announceWinner(winner) {
      if (winner) {
        winnerAnnouncement.innerHTML = `Player ${winner} Wins!`;
      } else {
        winnerAnnouncement.innerHTML = `Game is a Draw!`;
      }
      winPopup.classList.remove('hidden');
    }

    function handleCellClick(event) {
      const clickedCell = event.target;
      const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

      if (gameState[clickedCellIndex] !== '' || !gameActive) {
        return;
      }

      handleCellPlayed(clickedCell, clickedCellIndex);
      handleResultValidation();
    }

    function handleNewGame() {
      gameActive = true;
      currentPlayer = 'X';
      gameState = ['', '', '', '', '', '', '', '', ''];
      document.querySelectorAll('.board div').forEach(cell => cell.innerHTML = '');
      winPopup.classList.add('hidden');
      statusDisplay.innerHTML = `${currentPlayer}'s turn`; // Set the initial status display
    }

    handleNewGame();

    board.innerHTML = '';
    for (let i = 0; i < 9; i++) {
      const cell = document.createElement('div');
      cell.setAttribute('data-cell-index', i);
      cell.addEventListener('click', handleCellClick);
      board.appendChild(cell);
    }

    newGameButton.addEventListener('click', handleNewGame);
    closePopupButton.addEventListener('click', handleNewGame); // Change to handleNewGame() instead of hiding popup
  });
