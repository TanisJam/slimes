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
        if (slime.collide(this.slimes[i]).collide) {
          const v1i = slime.velocity;
          const v2i = this.slimes[i].velocity;
          const m1 = slime.mass;
          const m2 = this.slimes[i].mass;

          const v1f = {
            x: (v1i.x * (m1 - m2) + 2 * m2 * v2i.x) / (m1 + m2),
            y: (v1i.y * (m1 - m2) + 2 * m2 * v2i.y) / (m1 + m2),
          };
          const v2f = {
            x: (v2i.x * (m2 - m1) + 2 * m1 * v1i.x) / (m1 + m2),
            y: (v2i.y * (m2 - m1) + 2 * m1 * v1i.y) / (m1 + m2),
          };

          slime.velocity = v1f;
          this.slimes[i].velocity = v2f;
        }
      }
    });
  }

  loop() {
    this.update();
    this.draw();
    requestAnimationFrame(this.loop.bind(this));
  }
}
