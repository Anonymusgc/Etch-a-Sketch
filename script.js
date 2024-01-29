"use strict";

const createGrid = function () {
  const container = document.querySelector(".container");
  for (let i = 0; i < 256; i++) {
    const div = document.createElement("div");
    div.classList.add("gridCell");
    container.appendChild(div);
    // console.log("Work");
  }
};

// function for changing background color by adding class
const draw = function (event) {
  event.target.classList.add("drawn");
};

// adding draw to each cell on hover
const addDraw = function () {
  const cells = document.querySelectorAll(".gridCell");
  cells.forEach((cell) => {
    cell.addEventListener("mouseover", draw);
  });
};

createGrid();
addDraw();
