const Rx = require('rxjs/Rx');

// create an observable of 'foo', 'bar' and 'baz' with `Observable.of`
const source$ = Rx.Observable.of('foo', 'bar', 'baz');

console.log('start');
source$.subscribe(
  x => console.log(x),
  err => console.error(err),
  () => console.info('done')
);
console.log('stop');

// run node exercises/node/7-observable-of.js

/**
  NOTE: expected output
  start
  foo
  bar
  baz
  done
  stop
*/

// Notice the output is _synchronous_!!

// To run async then
// const source$ = Rx.Observable.of('foo', 'bar', 'baz', Rx.Scheduler.asap);

/**
 NOTE: expected output
 start
 stop
 foo
 bar
 baz
 done
 */