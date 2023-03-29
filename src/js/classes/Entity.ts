import { dimensions } from "../constants";
import { Vector } from "../../types";

export class Entity {
  mass: number;
  constructor(
    public position: Vector,
    public size: Vector,
    public velocity: Vector,
    public skin: string
  ) {
    this.position = position;
    this.size = size;
    this.velocity = velocity;
    this.skin = skin;
    this.mass = size.x * size.y;
  }
  collide(other: Entity) {
    const dx = this.position.x - other.position.x;
    const dy = this.position.y - other.position.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const sumRadius = this.size.x / 2 + other.size.x / 2 - 0.1;
    const collide = distance < sumRadius;

    if (collide) {
      const angle = Math.atan2(dy, dx);
      const sin = Math.sin(angle);
      const cos = Math.cos(angle);

      // rotate this.velocity
      let vx0 = this.velocity.x * cos + this.velocity.y * sin;
      const vy0 = this.velocity.y * cos - this.velocity.x * sin;

      // rotate other.velocity
      let vx1 = other.velocity.x * cos + other.velocity.y * sin;
      const vy1 = other.velocity.y * cos - other.velocity.x * sin;

      // collision reaction
      const vxTotal = vx0 - vx1;
      vx0 =
        ((this.mass - other.mass) * vx0 + 2 * other.mass * vx1) /
        (this.mass + other.mass);
      vx1 = vxTotal + vx0;

      // rotate velocities back
      const vx0Final = vx0 * cos - vy0 * sin;
      const vy0Final = vy0 * cos + vx0 * sin;
      const vx1Final = vx1 * cos - vy1 * sin;
      const vy1Final = vy1 * cos + vx1 * sin;

      // check if the balls are moving away from each other
      if (vx0Final * dx + vy0Final * dy >= 0) {
        // move the balls away from each other
        this.position.x += vx0Final;
        this.position.y += vy0Final;
        other.position.x += vx1Final;
        other.position.y += vy1Final;
      }

      // update this.velocity
      this.velocity.x = vx0Final;
      this.velocity.y = vy0Final;

      // update other.velocity
      other.velocity.x = vx1Final;
      other.velocity.y = vy1Final;
    }
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
