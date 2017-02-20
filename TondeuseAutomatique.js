'use strict';

class TondeuseAutomatique {

  constructor(x, y, maxX, maxY, orientation) {
    this.possibleOriantation = ['N', 'E', 'S', 'W'];
    this.coordination = {
      x: ~~x,
      y: ~~y
    };
    this.maxCoordination = {
      maxX: ~~maxX,
      maxY: ~~maxY
    };
    this.orientation = this.possibleOriantation.indexOf(orientation);
  }

  getActualPosition() {
    return `<< ${this.coordination.x}, ${this.coordination.y}, ${this.possibleOriantation[this.orientation]} >>`;
  }

  turn(direction) {
    if (direction === 'D') {
      this.orientation++;
    }

    if (direction === 'G') {
      this.orientation--;
    }

    if (this.orientation >= this.possibleOriantation.length) {
      this.orientation = 0;
    }

    if (this.orientation < 0) {
      this.orientation = this.possibleOriantation.length - 1;
    }
  }

  advance() {
    if (this.orientation % 2 === 0) {
      this.coordination.y = ensureBetweenMinAndMax(
        this.coordination.y + 1 - this.orientation,
        0,
        this.maxCoordination.maxY);
    } else {
      this.coordination.x = ensureBetweenMinAndMax(
        this.coordination.x + 2 - this.orientation,
        0,
        this.maxCoordination.maxX);
    }
  }

  performAction(action) {
    const actionsMapping = {
      D: 'turn',
      G: 'turn',
      A: 'advance'
    };

    this[actionsMapping[action]](action);
  }
}

function ensureBetweenMinAndMax(value, minValue, maxValue) {
  if (value < minValue) {
    return minValue;
  } else if (value > maxValue) {
    return maxValue;
  }

  return value;
}

module.exports = TondeuseAutomatique;
