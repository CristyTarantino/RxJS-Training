const Rx = require('rxjs/Rx');

// create an observable with the Observable constructor that
// emits the values 1, 2, 3 and completes.
const source$ = new Rx.Observable(observer => {
  observer.next(1);
  observer.next(2);
  observer.next(3);
  observer.complete();
});

source$.subscribe(
  x => console.log(x),
  err => console.error(err),
  () => console.info('done')
);

/**
 * expected outpur:
   1
   2
   3
   4
   5
   done
 */


// async observer

// const source1$ = new Rx.Observable(observer => {
//   const id = setTimeout(() => {
//     observer.next(1);
//     observer.next(2);
//     observer.next(3);
//     observer.complete();
//   }, 1000);
//
//   return () => { //this one is the function called to unsubscribe
//     console.log('teardown');
//     clearTimeout();
//   };
// });
//
// console.log('start');
// source$1.subscribe(
//     x => console.log(x),
//     err => console.error(err),
//     () => console.info('done')
// );
// console.log('stop');