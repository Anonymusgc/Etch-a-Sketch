"use strict";

let penType = "";

const createGrid = function (newSize = 16) {
  const container = document.querySelector(".container");
  const cellArray = [];

  const width = container.offsetWidth;
  const height = container.offsetHeight;
  let cellWidth = Math.floor((width / newSize) * 10) / 10;
  let cellHeight = Math.round((height / newSize) * 10) / 10;
  console.log(cellHeight);
  console.log(cellWidth);
  console.log(newSize * newSize);

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

const getRandom = function (min, max) {
  const randNumber = Math.floor(Math.random() * (max - min + 1) + min);
  return randNumber;
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
  // console.log(colorArray);

  let alpha = Number(colorArray[3]) || 1;

  if (colorArray[0] == 255 && colorArray[1] == 255 && colorArray[2] == 255) {
    alpha = 0.1;
  } else if (alpha != 1) {
    alpha += 0.1;
  }
  colorArray[0] = penType == "black" ? 0 : getRandom(0, 255);
  colorArray[1] = penType == "black" ? 0 : getRandom(0, 255);
  colorArray[2] = penType == "black" ? 0 : getRandom(0, 255);

  // console.log(colorArray);
  // console.log(alpha);

  event.target.style.backgroundColor = `rgba(${colorArray[0]},${colorArray[1]},${colorArray[2]},${alpha})`;
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

  if (newSize < 1 || newSize > 100 || isNaN(newSize)) {
    alert("Input out of range, please select again");
    return changeGrid();
  }
  createGrid(newSize);
  addDraw();
};

const changeGridBtn = document.querySelector(".change-grid");
changeGridBtn.addEventListener("click", changeGrid);

const radioPen = document.querySelectorAll("input[type=radio]");
radioPen.forEach((item) => {
  item.addEventListener("change", () => {
    penType = radioPen[0].checked ? "black" : "color";
  });
});

penType = radioPen[0].checked ? "black" : "color";
createGrid();
addDraw();
