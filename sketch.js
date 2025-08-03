
let shapes = [];

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('sketch-holder');
  noStroke();

  // Define 3 shapes in upper-left region
  for (let i = 0; i < 3; i++) {
    shapes.push({
      pos: createVector(80 + i * 40, 80),
      basePos: createVector(80 + i * 40, 80),
      size: 30,
      offset: createVector(0, 0)
    });
  }
}

function draw() {
  clear();
  let scrollY = window.scrollY;

  for (let shape of shapes) {
    const d = dist(mouseX, mouseY, shape.pos.x, shape.pos.y);
    if (d < 50) {
      let dir = p5.Vector.sub(shape.pos, createVector(mouseX, mouseY));
      dir.setMag(2);
      shape.offset = p5.Vector.lerp(shape.offset, dir, 0.1);
    } else {
      shape.offset = p5.Vector.lerp(shape.offset, createVector(0, 0), 0.1);
    }

    // Interpolate toward top corner on scroll
    let floatPos = p5.Vector.lerp(shape.basePos, createVector(30, 30), constrain(scrollY / 200, 0, 1));
    shape.pos = p5.Vector.add(floatPos, shape.offset);

    // Draw shape
    fill(20);
    ellipse(shape.pos.x, shape.pos.y, shape.size);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
