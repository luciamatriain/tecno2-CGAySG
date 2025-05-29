class ControlVoz {
  constructor() {
    this.mic = new p5.AudioIn();
    this.fft = new p5.FFT(0.8, 1024);
    this.fft.setInput(this.mic);
    this.amp = 0;
    this.pitch = 0;

    this.mic.start(); // Esto está bien si ya fue activado por userStartAudio
  }

  actualizar() {
    this.amp = this.mic.getLevel();
    this.pitch = this.fft.getCentroid();
  }

  detectarShhh() {
    let spectrum = this.fft.analyze();
    let highEnergy = 0;
    for (let i = spectrum.length * 0.7; i < spectrum.length; i++) {
      highEnergy += spectrum[i];
    }
    return highEnergy > 3000;
  }
}
