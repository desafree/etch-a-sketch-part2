const box = (function () {
  const sketchBox = document.querySelector(".sketch-box");

  let box = {};

  box.generateBox = function (size) {
    if (
      typeof Number(size) != "number" ||
      Number(size) > 100 ||
      Number(size) <= 0
    )
      return;
    const boxContainer = document.createElement("div");
    boxContainer.classList.add("box-container");
    for (let i = 0; i < size; i++) {
      const cellRow = document.createElement("div");
      cellRow.classList.add("cell-row");
      for (let i = 0; i < size; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cellRow.appendChild(cell);
      }
      boxContainer.appendChild(cellRow);
    }
    sketchBox.appendChild(boxContainer);
  };

  box.removeBox = function () {
    const boxContainer = document.querySelector(".box-container");
    boxContainer.remove();
  };

  box.addListeners = function (color = "#000000") {
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
      cell.addEventListener("mouseenter", (e) => {
        e.target.style.backgroundColor = color;
      });
    });
  };

  return box;
})();

box.generateBox(16);
box.addListeners();

const range = document.querySelector("input[type=range]");
range.addEventListener("change", (e) => {
  box.removeBox();
  box.generateBox(Number(e.target.value));
  box.addListeners();
});

const pen = (function () {
  let BLACK = 1;
  let GRADIENT = 0;
  let RAINBOW = 0;
  let color = "#ffffff";

  let obj = {};
  obj.getColor = function () {
    return color;
  };

  return obj;
})();
