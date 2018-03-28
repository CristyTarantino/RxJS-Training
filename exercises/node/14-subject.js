const { Subject } = require('rxjs/Subject');
const createLoggingObserver = require('./helpers/createLoggingObserver');

const observerA = createLoggingObserver('A');
const observerB = createLoggingObserver('B');

// Create and subscribe to a subject with `observerA` and `observerB`
// Subjects are both Observable and Observer
// the main reason to use them is to multicast
// second main reason is to have an inperative way to put values into an observable chain
// third is for backpressure management
const subject = new Subject();

subject.subscribe(observerA);
subject.subscribe(observerB);

// synchronously notify the subject with values 1, 2, 3 via `next` and `complete`
subject.next(1);
subject.next(2);
subject.next(3);
subject.complete();

// Try nexting after complete.
subject.next('ciao');

// Try the same thing with `subject.error()` instead of complete
subject.error(new Error('bad'));

/**
  NOTE: expected output
  A 1
  B 1
  A 2
  B 2
  A 3
  B 3
  A done
  B done
*/
