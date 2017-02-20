'use strict';

const chai = require('chai');
const TondeuseAutomatique = require('./TondeuseAutomatique');

const expect = chai.expect;

describe('The TondeuseAutomatique class', function() {
  let coordination, maxCoordination, orientation;

  beforeEach(function() {
    coordination = {
      x: 0,
      y: 0
    };
    maxCoordination = {
      maxX: 5,
      maxY: 5
    };
    orientation = 'E';
  });


  describe('the contructor', function() {
    it('should expose possibleOriantation, coordination, maxCoordination and orientation', function() {
      const expectedObject = {
        possibleOriantation: ['N', 'E', 'S', 'W'],
        coordination,
        maxCoordination,
        orientation: 1
      };

      expect(new TondeuseAutomatique(
        coordination.x,
        coordination.y,
        maxCoordination.maxX,
        maxCoordination.maxY,
        orientation)
      ).to.deep.equal(expectedObject);
    });

    it('should cast attributes to Number', function() {
      const expectedObject = {
        possibleOriantation: ['N', 'E', 'S', 'W'],
        coordination,
        maxCoordination,
        orientation: 1
      };

      expect(new TondeuseAutomatique(
        '' + coordination.x,
        '' + coordination.y,
        '' + maxCoordination.maxX,
        '' + maxCoordination.maxY,
        orientation)
      ).to.deep.equal(expectedObject);
    });
  });


  describe('the getActualPosition', function() {
    it('should give a correct format', function() {
      const expectedOutput = '<< 0, 0, E >>';

      expect(new TondeuseAutomatique(
        coordination.x,
        coordination.y,
        maxCoordination.maxX,
        maxCoordination.maxY,
        orientation).getActualPosition()
      ).to.equal(expectedOutput);
    });
  });

  describe('the turn', function() {
    it('should turn +90', function() {
      const expectedOutput = '<< 0, 0, S >>';

      const tondeuseAutomatique = new TondeuseAutomatique(
        coordination.x,
        coordination.y,
        maxCoordination.maxX,
        maxCoordination.maxY,
        orientation);

      tondeuseAutomatique.turn('D');

      expect(tondeuseAutomatique.getActualPosition()).to.equal(expectedOutput);
    });

    it('should turn -90', function() {
      const expectedOutput = '<< 0, 0, N >>';

      const tondeuseAutomatique = new TondeuseAutomatique(
        coordination.x,
        coordination.y,
        maxCoordination.maxX,
        maxCoordination.maxY,
        orientation);

      tondeuseAutomatique.turn('G');

      expect(tondeuseAutomatique.getActualPosition()).to.equal(expectedOutput);
    });

    it('should turn +90 to North from West', function() {
      const expectedOutput = '<< 0, 0, N >>';

      const tondeuseAutomatique = new TondeuseAutomatique(
        coordination.x,
        coordination.y,
        maxCoordination.maxX,
        maxCoordination.maxY,
        'W');

      tondeuseAutomatique.turn('D');

      expect(tondeuseAutomatique.getActualPosition()).to.equal(expectedOutput);
    });

    it('should turn -90 to West from North', function() {
      const expectedOutput = '<< 0, 0, W >>';

      const tondeuseAutomatique = new TondeuseAutomatique(
        coordination.x,
        coordination.y,
        maxCoordination.maxX,
        maxCoordination.maxY,
        'N');

      tondeuseAutomatique.turn('G');

      expect(tondeuseAutomatique.getActualPosition()).to.equal(expectedOutput);
    });
  });

  describe('the advance', function() {
    it('should advance +1 on the x direction when directed to East', function() {
      const expectedOutput = '<< 1, 0, E >>';

      const tondeuseAutomatique = new TondeuseAutomatique(
        coordination.x,
        coordination.y,
        maxCoordination.maxX,
        maxCoordination.maxY,
        'E');

      tondeuseAutomatique.advance();

      expect(tondeuseAutomatique.getActualPosition()).to.equal(expectedOutput);
    });

    it('should advance -1 on the x direction when directed to West', function() {
      const expectedOutput = '<< 2, 0, W >>';

      const tondeuseAutomatique = new TondeuseAutomatique(
        3,
        coordination.y,
        maxCoordination.maxX,
        maxCoordination.maxY,
        'W');

      tondeuseAutomatique.advance();

      expect(tondeuseAutomatique.getActualPosition()).to.equal(expectedOutput);
    });

    it('should advance +1 on the y direction when directed to North', function() {
      const expectedOutput = '<< 0, 1, N >>';

      const tondeuseAutomatique = new TondeuseAutomatique(
        coordination.x,
        coordination.y,
        maxCoordination.maxX,
        maxCoordination.maxY,
        'N');

      tondeuseAutomatique.advance();

      expect(tondeuseAutomatique.getActualPosition()).to.equal(expectedOutput);
    });

    it('should advance -1 on the y direction when directed to South', function() {
      const expectedOutput = '<< 0, 2, S >>';

      const tondeuseAutomatique = new TondeuseAutomatique(
        coordination.x,
        3,
        maxCoordination.maxX,
        maxCoordination.maxY,
        'S');

      tondeuseAutomatique.advance();

      expect(tondeuseAutomatique.getActualPosition()).to.equal(expectedOutput);
    });

    it('should not advance -1 when it is on zero', function() {
      const expectedOutput = '<< 0, 0, S >>';

      const tondeuseAutomatique = new TondeuseAutomatique(
        coordination.x,
        coordination.y,
        maxCoordination.maxX,
        maxCoordination.maxY,
        'S');

      tondeuseAutomatique.advance();

      expect(tondeuseAutomatique.getActualPosition()).to.equal(expectedOutput);
    });

    it('should not advance +1 when it is on maxCoordination', function() {
      const expectedOutput = '<< 0, 5, N >>';

      const tondeuseAutomatique = new TondeuseAutomatique(
        coordination.x,
        maxCoordination.maxY,
        maxCoordination.maxX,
        maxCoordination.maxY,
        'N');

      tondeuseAutomatique.advance();

      expect(tondeuseAutomatique.getActualPosition()).to.equal(expectedOutput);
    });
  });

  describe('the performAction', function() {
    it('should turn D when action is "D"', function() {
      const expectedOutput = '<< 0, 0, S >>';

      const tondeuseAutomatique = new TondeuseAutomatique(
        coordination.x,
        coordination.y,
        maxCoordination.maxX,
        maxCoordination.maxY,
        orientation);

      tondeuseAutomatique.performAction('D');

      expect(tondeuseAutomatique.getActualPosition()).to.equal(expectedOutput);
    });

    it('should turn G when action is "G"', function() {
      const expectedOutput = '<< 0, 0, N >>';

      const tondeuseAutomatique = new TondeuseAutomatique(
        coordination.x,
        coordination.y,
        maxCoordination.maxX,
        maxCoordination.maxY,
        orientation);

      tondeuseAutomatique.performAction('G');

      expect(tondeuseAutomatique.getActualPosition()).to.equal(expectedOutput);
    });

    it('should advance when action is "A"', function() {
      const expectedOutput = '<< 1, 0, E >>';

      const tondeuseAutomatique = new TondeuseAutomatique(
        coordination.x,
        coordination.y,
        maxCoordination.maxX,
        maxCoordination.maxY,
        orientation);

      tondeuseAutomatique.performAction('A');

      expect(tondeuseAutomatique.getActualPosition()).to.equal(expectedOutput);
    });
  });
});
