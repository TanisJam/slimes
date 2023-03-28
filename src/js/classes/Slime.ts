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

  collide(other: Entity) {
    const dx = this.position.x - other.position.x;
    const dy = this.position.y - other.position.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const sumRadius = this.size.x / 2 + other.size.x / 2;
    const collide = distance < sumRadius;
    const vector = {
      x: this.position.x - other.position.x,
      y: this.position.y - other.position.y,
    };
    return { collide, vector };
  }

  update() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    // if position is outside of the canvas make it bounce
    if (
      this.position.x - this.size.x / 2 <= 0 ||
      this.position.x + this.size.x / 2 >= dimensions.width
    ) {
      this.velocity.x = -this.velocity.x;
    }
    if (
      this.position.y - this.size.y / 2 <= 0 ||
      this.position.y + this.size.y / 2 >= dimensions.height
    ) {
      this.velocity.y = -this.velocity.y;
    }
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
