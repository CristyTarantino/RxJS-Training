const Rx = require('rxjs/Rx');

const data = ['apples', 'bananas', 'oranges'];

//create an observable the `data` array with `Observable.from`
//useful for stabbing data to fake api
const source$ = Rx.Observable.of(data);

console.log('start');
source$.subscribe(
  x => console.log(x),
  err => console.error(err),
  () => console.info('done')
);
console.log('stop');

/**
  NOTE: expected output
  start
  apples
  bananas
  oranges
  done
  stop
*/

// Notice the output is _synchronous_ again, because arrays are consumed
// synchronously

// To run async then
// const source$ = Rx.Observable.of(data, Rx.Scheduler.asap);

/**
 NOTE: expected output
 start
 stop
 foo
 bar
 baz
 done
 */