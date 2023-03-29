## Slime game

This is a simple game made with javascript and html5 canvas.
The game was made just to practice javascript with classes and objects.

### Classes

- Entity

  - Properties:
    - vector position
    - vector size
    - vector velocity
    - skin
    - mass
  - Methods:
    - collide
    - update

- Slime extends Entity

  - Properties:
    - hunger
    - hunger rate
    - hunger threshold
  - Methods:
    - draw
    - eat
    - reproduce
    - die
    - wander
    - find food
    - move

- Food extends Entity

  - Properties:
    - value
  - Methods:
    - update
    - draw

### Slime behavior

- Slime can wander around looking for food

  - Algorithm to wander:
    - Slime selects a random direction
    - Slime moves in that direction for a random up to 100px
    - Slime looks for food in a radius of 100px
    - If slime finds food, it moves towards it
    - If slime doesn't find food, it goes back to wandering
  - Algorithm to find food:
    - Slime detects food in a radius of 100px
    - Slime moves towards food
    - Slime arrives at where food was
    - If food is still there, slime eats it
    - If food is not there, slime goes back to wandering

- Slime can eat food
- Slime can reproduce
- Slime can die

### Player interaction

- Player can add food

### Game behavior

- Game can be paused
- Game can be reset
- Game can be saved
- Game can be loaded
