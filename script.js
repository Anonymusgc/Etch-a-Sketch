"use strict";

const createGrid = function (newSize = 16) {
  const container = document.querySelector(".container");
  const cellArray = [];

  const width = container.offsetWidth;
  const height = container.offsetHeight;
  let cellWidth = width / newSize;
  let cellHeight = height / newSize;
  // console.log(cellHeight);
  // console.log(cellWidth);
  // console.log(newSize * newSize);

  for (let i = 0; i < newSize * newSize; i++) {
    const div = document.createElement("div");
    div.classList.add("gridCell");

    div.style.width = cellWidth + "px";
    div.style.height = cellHeight + "px";
    // container.appendChild(div);
    cellArray.push(div);
    // console.log("Work");
  }
  // console.log(cellArray);
  container.replaceChildren(...cellArray);
};

// function for changing background color
const draw = function (event) {
  const colorRGBA = window.getComputedStyle(event.target).backgroundColor;
  // regex to match content inside brackets
  const color = colorRGBA
    .match(/\([^)]+\)/)
    .toString()
    .slice(1, -1);
  let colorArray = color.split(",");
  colorArray = colorArray.map((item) => {
    item = Number(item);
    return item;
  });
  console.log(colorArray);

  let alpha = Number(colorArray[3]) || 1;
  if (colorArray[0] == 255 && colorArray[1] == 255 && colorArray[2] == 255) {
    alpha = 0.1;
  } else if (alpha != 1) {
    alpha += 0.1;
  }

  console.log(alpha);

  event.target.style.backgroundColor = `rgba(0,0,0,${alpha})`;
  // event.target.classList.add("drawn");
};

// adding draw to each cell on hover
const addDraw = function () {
  const cells = document.querySelectorAll(".gridCell");
  cells.forEach((cell) => {
    cell.addEventListener("mouseover", draw);
  });
};

const changeGrid = function () {
  const newSize = Number(
    prompt("Input number of squares per side for new grid ( max 100 squares )")
  );
  if (newSize < 1 || newSize > 100) {
    alert("Input out of range, please select again");
    return changeGrid();
  }
  createGrid(newSize);
  addDraw();
};

const changeGridBtn = document.querySelector(".change-grid");
changeGridBtn.addEventListener("click", changeGrid);

createGrid();
addDraw();
