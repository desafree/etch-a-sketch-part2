const box = (function () {
  const sketchBox = document.querySelector(".sketch-box");

  let obj = {};

  obj.generateBox = function (size) {
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
      for (let l = 0; l < size; l++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cellRow.appendChild(cell);
      }
      boxContainer.appendChild(cellRow);
    }
    sketchBox.appendChild(boxContainer);
  };

  obj.removeBox = function () {
    document.querySelector(".box-container").remove();
  };

  obj.addListeners = function (callback) {
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
      cell.addEventListener("mouseenter", (e) => {
        e.target.style.backgroundColor = callback();
      });
    });
  };

  return obj;
})();

const pen = (function () {
  let obj = {};

  let GRADIENT = 0;
  let gradientCount = 0;
  let RAINBOW = 0;
  let ERASER = 0;
  let color = "#000000";

  function randomColor() {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  }

  obj.getColor = function () {
    if (RAINBOW == 1) {
      color = randomColor();
    }
    if (GRADIENT == 1) {
      gradientCount++;
      if (gradientCount > 100) {
        gradientCount = 0;
      }
      color = `hsl(100, 0%,${gradientCount}%`;
    }
    if (ERASER == 1) {
      color = "#ffffff";
    }
    return color;
  };

  obj.reset = function () {
    GRADIENT = 0;
    RAINBOW = 0;
    ERASER = 0;
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

  obj.setEraser = function () {
    obj.reset();
    ERASER = 1;
  };

  return obj;
})();

box.generateBox(16);
box.addListeners(pen.getColor);

const rangeInput = document.querySelector("input[type=range]");
rangeInput.addEventListener("change", (e) => {
  if (
    typeof Number(e.target.value) !== "number" ||
    Number(e.target.value) <= 0 ||
    Number(e.target.value) > 100
  )
    return;
  box.removeBox();
  box.generateBox(Number(e.target.value));
  box.addListeners(pen.getColor);
});

const blackOption = document.querySelector(".black");
blackOption.addEventListener("click", () => {
  pen.setBlack();
  removeActiveClassFromEveryone();
  blackOption.classList.add("active");
});

const gradientOption = document.querySelector(".gradient");
gradientOption.addEventListener("click", () => {
  pen.setGradient();
  removeActiveClassFromEveryone();
  gradientOption.classList.add("active");
});

const rainbowOption = document.querySelector(".rainbow");
rainbowOption.addEventListener("click", () => {
  pen.setRainbow();
  removeActiveClassFromEveryone();
  rainbowOption.classList.add("active");
});

const eraserOption = document.querySelector(".eraser");
eraserOption.addEventListener("click", () => {
  pen.setEraser();
  removeActiveClassFromEveryone();
  eraserOption.classList.add("active");
});

function removeActiveClassFromEveryone() {
  blackOption.classList.remove("active");
  gradientOption.classList.remove("active");
  rainbowOption.classList.remove("active");
  eraserOption.classList.remove("active");
}
