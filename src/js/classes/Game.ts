import { Slime, createSlimes } from "./Slime";

export class Game {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  slimes: Slime[];
  constructor() {
    this.canvas = document.getElementById("game") as HTMLCanvasElement;
    this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    this.slimes = createSlimes(13);
  }

  draw() {
    if (this.ctx) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.slimes.forEach((slime) => slime.draw(this.ctx));
    }
  }

  update() {
    this.slimes.forEach((slime) => slime.update());
    this.slimes.forEach((slime, index) => {
      for (let i = index + 1; i < this.slimes.length; i++) {
        slime.collide(this.slimes[i]);
      }
    });
  }

  loop() {
    this.update();
    this.draw();
    requestAnimationFrame(this.loop.bind(this));
  }
}
