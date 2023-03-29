// bidimensional vector class
export class Vector {
  constructor(public x: number, public y: number) {
    this.x = x;
    this.y = y;
  }

  get length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  set length(value) {
    const factor = value / this.length;
    this.x *= factor;
    this.y *= factor;
  }

  add(v: Vector) {
    return new Vector(this.x + v.x, this.y + v.y);
  }

  subtract(v: Vector) {
    return new Vector(this.x - v.x, this.y - v.y);
  }

  multiply(factor: number) {
    return new Vector(this.x * factor, this.y * factor);
  }

  divide(factor: number) {
    return new Vector(this.x / factor, this.y / factor);
  }

  dot(v: Vector) {
    return this.x * v.x + this.y * v.y;
  }

  normalize() {
    const length = this.length;
    if (length === 0) {
      this.x /= length;
      this.y /= length;
    }
    return this;
  }

  limit(maxLength: number) {
    if (this.length > maxLength) {
      this.length = maxLength;
    }
    return this;
  }

  angle() {
    return Math.atan2(this.y, this.x);
  }

  static fromAngle(angle: number, length: number = 1) {
    return new Vector(Math.cos(angle) * length, Math.sin(angle) * length);
  }
}
