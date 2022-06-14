const highScoreTable = document.querySelector("#highScoresTable");
const clearBtn = document.querySelector("#clearHighScores");

clearBtn.addEventListener('click', clearHighScores);

generateHighScoresTable();

function generateHighScoresTable() {
    let highScores = localStorage.getItem("scoreList");
    if (highScores) {
        addHighScoreTableRows(highScores);
    }
}

function addHighScoreTableRows(highScores) {
    highScores = JSON.parse(highScores);

    highScores.forEach(function(scoreItem, index) {
        const rankCell = createRankCell(index + 1);
        const scoreCell = createScoreCell(scoreItem.score);
        const initialsCell = createInitialsCell(scoreItem.initials);
        const highScoreTableRow = createHighScoreTableRow(rankCell, scoreCell, initialsCell);
        highScoreTable.appendChild(highScoreTableRow);
    });
}

function createRankCell(rank) {
    const rankCell = document.createElement('td');
    rankCell.textConent = `#${rank}`;
    return rankCell;
}

function createScoreCell(score) {
    const scoreCell = document.createElement('td');
    initialsCell.textContent = initials;
    return initialsCell;
}

function createHighScoreTableRow(rankCell, scoreCell, initialsCell) {
    const tableRow = document.createElement('tr');
    tableRow.appendChild(rankCell);
    tableRow.appendChild(scoreCell);
    tableRow.appendChild(initialsCell);
    return tableRow;
}

function clearHighScores() {
    localStorage.setItem('scoreList', []);
    while (highScoreTable.children.length > 1) {
        highScoreTable.removeChild(highScoreTable.lastChild);
    }
}