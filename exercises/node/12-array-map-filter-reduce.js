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

   result called 0
   result called 1
   result called 2
   result called 3
   result called 4
   result called 5
   result called 6
   result called 7
   result called 8
   result called 9
   map called 1
   map called 3
   map called 5
   map called 7
   map called 9
   reduce called 0 2
   reduce called 2 6
   reduce called 8 10
   reduce called 18 14
   reduce called 32 18
   50
 */
