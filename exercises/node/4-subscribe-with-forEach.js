// `data$` is an observable stream of 10 numbers.
const data$ = require('./fixtures/1-data.js');

// TODO: Subscribe to `data$` and log out all values to console.
data$.forEach(x => console.log(x))
    .then(
        () => console.log('done'),
        err => console.error()
    );

// NOTE: If `forEach` returns a promise, how can we unsubscribe?
//   We can't (yet! perhaps in the future of Rx?)

/**
 * expected output:
   0
   1
   2
   3
   4
   5
   6
   7
   8
   9
   done
 */