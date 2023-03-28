// Entity class for the game

import { Vector } from "../../types";

export class Entity {
  mass: number;
  constructor(
    public position: Vector,
    public size: Vector,
    public velocity: Vector,
    public skin: string,
  ) {
    this.position = position;
    this.size = size;
    this.velocity = velocity;
    this.skin = skin;
    this.mass = size.x * size.y;
  }
}
