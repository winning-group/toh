/**
* Randomly shuffle an array usinng Fisher-Yates (or Knuth) Shuffle algorithm
* https://stackoverflow.com/a/2450976/1293256
*/
export const shuffleAnArray = (array: any): any => {
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex: number;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};
