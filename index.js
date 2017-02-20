'use strict';

const fs = require('fs');
const path = require('path');
const Q = require('q');
const TondeuseAutomatique = require('./TondeuseAutomatique');

const dataPath = path.join(__dirname, 'data.txt');


loadDataFromFile(dataPath)
  .then(processRawData)
  .then(performTenduseOperation);

///////////

function loadDataFromFile(filePath) {
  return Q.nfcall(fs.readFile, filePath, 'utf8')
    .then(data => data.split(/\r\n|\r|\n/g))
    .catch(err => console.error(`Oops! error: ${err}`) || Q.reject(`Oops! error: ${err}`));
}

function processRawData(rawDataAsArray) {
  const maxCoordination = rawDataAsArray[0];
  const tendeuseAutomatiqueRawData = rawDataAsArray.slice(1);
  const tendeuseAutomatiqueProcessedData = [];

  for (let i = 0, j = tendeuseAutomatiqueRawData.length; i < j; i += 2) {
    tendeuseAutomatiqueProcessedData.push(tendeuseAutomatiqueRawData.slice(i, i + 2));
  }

  return {
    maxCoordination,
    tendeuseAutomatiqueProcessedData
  };
}

function performTenduseOperation({ maxCoordination, tendeuseAutomatiqueProcessedData }) {
  const [maxX, maxY] = maxCoordination.split(/\s+/);

  tendeuseAutomatiqueProcessedData.forEach(([initialPosition, [...actions]], index) => {
    const [x, y, orientation] = initialPosition.split(/\s+/);
    const tondeuseAutomatique = new TondeuseAutomatique(x, y, maxX, maxY, orientation);

    actions.forEach(action => tondeuseAutomatique.performAction(action));

    console.log(`The final position of the Tondeuse number "${index + 1}" is: ${tondeuseAutomatique.getActualPosition()}`);
  });
}
