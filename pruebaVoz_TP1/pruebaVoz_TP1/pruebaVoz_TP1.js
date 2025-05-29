let app;
let cargadas = false;

function preload() {
  // precargar solo imágenes si querés, aún sin voz
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  colorMode(HSB, 360, 100, 100, 100);
  imageMode(CENTER);
  textAlign(CENTER, CENTER);
  textSize(32);
  text("Hacé clic en Iniciar para activar el micrófono", width / 2, height / 2);
}

function draw() {
  if (cargadas) {
    app.draw();
  }
}

function keyPressed() {
  if (cargadas) {
    app.keyPressed();
  }
}

function iniciarMicrofono() {
  userStartAudio().then(() => {
    app = new App();  // ⬅️ Crear App recién ahora
    app.preload();
    app.setup();
    cargadas = true;
    document.getElementById('startBtn').style.display = 'none';
  }).catch((e) => {
    console.error("Error al iniciar el audio:", e);
  });
}

class App {
  constructor() {
    this.cantidad = 19;
    this.imagenes = [];
    this.controlVoz = new ControlVoz();
    this.sistema = null;
    this.FREQ_GRAVE = 85;
    this.FREQ_AGUDA = 250;
    this.AMP_MIN = 0.01;
  }

  preload() {
    for (let i = 0; i < this.cantidad; i++) {
      let nombre = "data/mancha" + nf(i, 2) + ".png";
      this.imagenes[i] = loadImage(nombre);
    }
  }

  setup() {
    this.sistema = new SistemaManchas(this.imagenes, 'calido');
  }

  draw() {
    background(255, 10);
    this.controlVoz.actualizar();
    this.sistema.mostrar();

    let amp = this.controlVoz.amp;
    let pitch = this.controlVoz.pitch;

    console.log('Amp:', amp.toFixed(4), 'Pitch:', pitch.toFixed(2));

    if (pitch > this.FREQ_AGUDA && amp > this.AMP_MIN) {
      this.sistema.setGama('frio');
      this.sistema.agregar(5);
    } else if (pitch < this.FREQ_GRAVE && amp > this.AMP_MIN) {
      this.sistema.setGama('frio');
      if (frameCount % 30 === 0) this.sistema.agregar(1);
    }

    if (this.controlVoz.detectarShhh()) {
      this.sistema.limpiar();
    }
  }

  keyPressed() {
    if (keyCode === DOWN_ARROW) {
      this.sistema.setGama('frio');
      this.sistema.agregar(1);
    } else if (keyCode === UP_ARROW) {
      this.sistema.setGama('frio');
      this.sistema.agregar(5);
    } else if (keyCode === 32) {
      this.sistema.limpiar();
    }
  }
}
  
