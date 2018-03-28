const Rx = require('rxjs/Rx');

const promise = Promise.resolve('still useful!');

//create an observable the `data` array with `Observable.from`
const source$ = Rx.Observable.from(promise);

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
  stop
  still useful!
  done
*/

// Notice the output is _asynchronous_, because promises are an async value

// The situations in which you want a promise is when you only have one value and you do not want it to be cancellable