const data$ = require('./fixtures/13-data');

/**
  1. Take the odd numbers from the observable `data$`,
  2. Double them (i.e. 1 -> 2, 3 -> 6, etc)
  3. Sum them
  4. Log the result
  5. Try using the pipeable operators from `rxjs/operators`!
*/

data$
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
    }, 0)
    .subscribe(x => console.log(x));


/**
  NOTE: expected output

   result called 0
   result called 1
   map called 1
   reduce called 0 2
   result called 2
   result called 3
   map called 3
   reduce called 2 6
   result called 4
   result called 5
   map called 5
   reduce called 8 10
   result called 6
   result called 7
   map called 7
   reduce called 18 14
   result called 8
   result called 9
   map called 9
   reduce called 32 18
   50
 */

// so filter map reduce for observable differently from arrays don't create a new array but they pass through the value to the next observer

//try replacing `reduce` with `scan`!

data$
    .filter(x => {
      // console.log('result called', x);
      return x % 2 === 1
    })
    .map(x => {
      // console.log('map called', x);
      return x + x;
    })
    .scan((state, x) => {
      console.log('scan called', state, x);
      const newState = state + x;
      return newState;
    }, 0)
    .subscribe(x => console.log(x));

//scan does the same thing as reduce, except it returns all the intermediate accumulators instead of just the last one