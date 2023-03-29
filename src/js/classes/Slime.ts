import { Entity } from "./Entity";
import { Vector } from "../../utils/Vector";
import { dimensions } from "../../utils/constants";

export class Slime extends Entity {
  constructor(position: Vector, size: Vector, velocity: Vector, color: string) {
    super(position, size, velocity, color);
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.skin;
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.size.x / 2, 0, 2 * Math.PI);
    ctx.fill();
  }
}

export const createSlimes = (num: number) => {
  const slimes: Slime[] = [];
  for (let i = 0; i < num; i++) {
    const color = `hsl(${Math.random() * 360}, 50%, 50%)`;
    const radius = Math.random() * 50 + 10;
    const size = new Vector(radius, radius);
    const pX = Math.random() * (dimensions.width - radius) + radius / 2;
    const pY = Math.random() * (dimensions.height - radius) + radius / 2;
    const vX = Math.random() * 2 - 1;
    const vY = Math.random() * 2 - 1;
    const position = new Vector(pX, pY);
    const velocity = new Vector(vX, vY);
    slimes.push(new Slime(position, size, velocity, color));
  }
  return slimes;
};
