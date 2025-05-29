class Mancha {
  constructor(img, x, y, hue) {
    this.img = img;
    this.x = x;
    this.y = y;
    this.hue = hue;
    this.sat = random(40, 100);
    this.size = random(80, 200);
    this.alpha = 75;
  }

  mostrar() {
    push();
    tint(this.hue, this.sat, 100, this.alpha);
    image(this.img, this.x, this.y, this.size, this.size);
    pop();
  }
}
