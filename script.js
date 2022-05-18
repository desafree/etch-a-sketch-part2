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

  box.addListeners = function (callback) {
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
      cell.addEventListener("mouseenter", (e) => {
        e.target.style.backgroundColor = callback();
      });
    });
  };

  return box;
})();

const pen = (function () {
  let GRADIENT = 0;
  let RAINBOW = 0;
  let color = "#000000";
  let times = 0;

  function randomColor() {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  }

  let obj = {};
  obj.getColor = function () {
    if (RAINBOW == 1) {
      color = randomColor();
    }
    if (GRADIENT == 1) {
      times++;
      if (times > 100) {
        times = 0;
      }
      color = `hsl(100, 0%,${times}%`;
    }
    return color;
  };

  obj.reset = function () {
    GRADIENT = 0;
    RAINBOW = 0;
  };

  obj.setGradient = function () {
    obj.reset();
    GRADIENT = 1;
  };

  obj.setRainbow = function () {
    obj.reset();
    RAINBOW = 1;
  };

  obj.setBlack = function () {
    obj.reset();
    color = "#000000";
  };

  return obj;
})();

box.generateBox(16);
box.addListeners(pen.getColor);

const range = document.querySelector("input[type=range]");
range.addEventListener("change", (e) => {
  box.removeBox();
  box.generateBox(Number(e.target.value));
  box.addListeners(pen.getColor);
});

const blackOption = document.querySelector(".black");
blackOption.addEventListener("click", () => {
  pen.setBlack();
});

const gradientOption = document.querySelector(".gradient");
gradientOption.addEventListener("click", () => {
  pen.setGradient();
});

const rainbowOption = document.querySelector(".rainbow");
rainbowOption.addEventListener("click", () => {
  pen.setRainbow();
});
