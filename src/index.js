import "./styles.css";

const p1 = "X";
const p2 = "O";
let player = 1;
let stop = 0;
let progress;

let board = document.getElementById("board");

function newBoard(board) {
  let x = 5;
  for (let y = 0; y < x; y++) {
    let row = document.createElement("div");
    board.appendChild(row);
    row.className = "row board-row";
    for (let z = 0; z < x; z++) {
      let col = document.createElement("div");
      col.className = "col board-col hoverable";
      row.appendChild(col);
      newCol(col);
    }
  }
}
newBoard(board);

function newCol(col) {
  col.onclick = function () {
    move(this);
  };
}

function move(square) {
  if (stop === 1) return;
  if (square.innerHTML !== "") return;
  if (player === 1) {
    square.innerHTML = p1;
    square.style.backgroundColor = "#1de9b6";
  } else {
    square.innerHTML = p2;
    square.style.backgroundColor = "#e57373";
  }
  determineWin(square);
  nextMove();
}

function determineWin(square) {
  let sqCol = getChildIndex(square);
  let sqRow = getChildIndex(square.parentNode);

  let cell = board.children[sqRow].children[sqCol];
  let mark = cell.innerHTML;

  for (let i = 0; i < 5; i++) {
    let horizontal = board.children[sqRow].children[i];
    if (horizontal.innerHTML !== mark) {
      break;
    } else {
      if (i === 4) {
        win();
      }
    }
  }
  for (let i = 0; i < 5; i++) {
    let vertical = board.children[i].children[sqCol];
    if (vertical.innerHTML !== mark) {
      break;
    } else {
      if (i === 4) {
        win();
      }
    }
  }
  for (let i = 0, j = 0; i < 5; i++, j++) {
    let diag1 = board.children[i].children[j];
    if (diag1.innerHTML !== mark) {
      break;
    } else {
      if (i === 4) {
        win();
      }
    }
  }
  for (let i = 0, j = 4; i < 5; i++, j--) {
    let diag2 = board.children[j].children[i];
    if (diag2.innerHTML !== mark) {
      break;
    } else {
      if (i === 4) {
        win();
      }
    }
  }
}

function getChildIndex(child) {
  let parent = child.parentNode;
  let children = parent.children;
  let i = children.length - 1;
  for (; i >= 0; i--) {
    if (child === children[i]) {
      break;
    }
  }
  return i;
}

function nextMove() {
  if (stop === 1) return;
  player = player === 1 ? 2 : 1;
  let text = "Player " + player + "'s move";
  document.getElementById("currentMove").innerHTML = text;
  reset_countdown();
}

function win() {
  stop = 1;
  setTimeout(function () {
    if (player === 1) {
      alert("Player " + player + " won!");
    } else {
      alert("Player " + player + " won!");
    }
  }, 20);
}

function start_countdown() {
  let counter = 100;
  progress = setInterval(function () {
    if (stop) return;
    let progressBar = document.getElementById("progressBar");
    progressBar.style.width = parseInt(100 - --counter, 10) + "%";

    if (counter <= 0) {
      counter = 100;
      clearInterval(progress);
      start_countdown();
      nextMove();
    }
  }, 100);
}

function reset_countdown() {
  clearInterval(progress);
  start_countdown();
}
