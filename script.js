"use strict";

const createGrid = function () {
  const container = document.querySelector(".container");
  for (let i = 0; i < 256; i++) {
    const div = document.createElement("div");
    container.appendChild(div);
    console.log("Work");
  }
};
createGrid();
