import { Entity } from "./Entity";
import { Vector } from "../../types";
import { dimensions } from "../constants";

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
    const size = Math.random() * 50 + 10;
    const x = Math.random() * (dimensions.width - size) + size / 2;
    const y = Math.random() * (dimensions.height - size) + size / 2;
    const color = `hsl(${Math.random() * 360}, 50%, 50%)`;
    const velocity = {
      x: Math.random() * 2 - 1,
      y: Math.random() * 2 - 1,
    };
    slimes.push(new Slime({ x, y }, { x: size, y: size }, velocity, color));
  }
  return slimes;
};
