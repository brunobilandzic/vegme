const pickRandomElement = (dataArray) => {
  return dataArray[Math.floor(Math.random() * dataArray.length)];
};

module.exports = {
    pickRandomElement
};
