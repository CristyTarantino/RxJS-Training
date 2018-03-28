// `data$` is an observable stream of 10 numbers.
const data$ = require('./fixtures/1-data.js');

// Get the subscription and unsubscribe it after 1 second

// Subscribe using callbacks (producer)
const sub = data$.subscribe(
    x => console.log(x),
    err => console.error(err), //if you don't provide err function it is going to throw the error globally
    () => console.info('done')
);

// consumer
setTimeout(() => {
  sub.unsubscribe();
}, 1000);

// run node exercises/node/3-unsubscribe.js

// expected output:
// 0
// 1
// 2
// 3

/**
 * It never gets to done because we unsubscribe before complete
 * a) the producer notifies that it has successfully completed - () => console.info('done')
 * b) the producer notifies that it has stopped because an error - err => console.error(err),
 * c) the consumer notifies the producer that no longer cares abut it - sub.unsubscribe();
 */