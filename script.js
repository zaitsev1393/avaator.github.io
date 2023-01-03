const avaator = () => {
  const createCanvas = (cellsize, width) => {
    let canvas = document.createElement('div');
    canvas.style.display = 'grid';
    canvas.classList.add('frame');
    canvas.style['grid-template-columns'] = (cellsize + 'px' + ' ').repeat(
      width
    );
    canvas.style['grid-template-rows'] = (cellsize + 'px' + ' ').repeat(width);
    for (let i = 0; i < width * width; i++) {
      let cell = document.createElement('div');
      cell.classList.add(`cell-${i + 1}`);
      canvas.appendChild(cell);
    }
    document.body.appendChild(canvas);
    return canvas;
  };

  const randomizeFrame = (frame, colorMode) => {
    const color = getRandomColor();
    for (let cell of frame.children) {
      if (colorMode) {
        cell.style.background = getRandomColor();
      } else {
        cell.style.background = Math.random() > 0.5 ? color : 'white';
      }
    }
  };

  const defaultOptions = {
    width: 10,
    cellSize: 5,
    density: 0.5,
  };

  const setBgColor = (el, color) => (el.style.background = color);

  const generate = (options = defaultOptions) => {
    const { width, cellSize, density } = { ...defaultOptions, ...options };
    const canvas = createCanvas(cellSize, width);
    const color = getRandomColor();
    const cells = [...canvas.children];
    for (let i = 0; i < cells.length / 2; i++) {
      const cellColor = Math.random() > density ? color : '#FFFFFF';
      setBgColor(cells[i], cellColor);
      setBgColor(cells[cells.length - i - 1], cellColor);
    }
  };

  const getRandomColor = () =>
    `rgba(
      ${Math.ceil(Math.random() * 255)},
      ${Math.ceil(Math.random() * 255)},
      ${Math.ceil(Math.random() * 255)}
    )`;

  return {
    generate,
  };
};

avaator().generate();
