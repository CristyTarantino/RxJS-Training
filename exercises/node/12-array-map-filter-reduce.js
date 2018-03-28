const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

/**
  1. Take the odd numbers from the list,
  2. Double them (i.e. 1 -> 2, 3 -> 6, etc)
  3. Sum them
*/

const result = arr
    .filter(x => {
      console.log('result called', x);
      return x % 2 === 1
    })
    .map(x => {
      console.log('map called', x);
      return x + x;
    })
    .reduce((state, x) => {
      console.log('reduce called', state, x);
      const newState = state + x;
      return newState;
    }, 0);



console.log(result);

/**
  NOTE: expected output
  50
*/
