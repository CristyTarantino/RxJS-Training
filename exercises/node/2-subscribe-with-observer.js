// `data$` is an observable stream of 10 numbers.
const data$ = require('./fixtures/1-data.js');

// TODO: create an observer to subscribe to `data$` and log out all values.
// An observer is an object with at least a next, an error and a complete function
const observer = {
  focusOffset() {},
  next(x) { console.log(x); },
  error(err) { console.error(err); },
  complete() {console.info('done'); }
};

// Subscribe using observer
data$.subscribe(observer);

// run node exercises/node/2-subscribe-with-observer.js

//Output
// 0
// 1
// 2
// 3
// 4
// 5
// 6
// 7
// 8
// 9
// done
