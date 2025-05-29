class SistemaManchas {
  constructor(imgs, gamaColor = 'calido') {
    this.imgs = imgs;
    this.lista = [];
    this.gamaColor = gamaColor;
    this.margen = 130;
  }

  agregar(cantidad) {
    for (let i = 0; i < cantidad; i++) {
      let img = random(this.imgs);
      let x = random(this.margen, width - this.margen);
      let y = random(50, height - 50);
      let baseHue = this.gamaColor === 'calido' ? random(0, 60) : random(160, 240);
      this.lista.push(new Mancha(img, x, y, baseHue));
    }
  }

  mostrar() {
    for (let m of this.lista) {
      m.mostrar();
    }
  }

  limpiar() {
    this.lista = [];
    background(255);
  }

  setGama(gama) {
    this.gamaColor = gama;
  }
}
