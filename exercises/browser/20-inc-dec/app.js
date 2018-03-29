
/** NOTE: Setup */
const inc = document.querySelector('#inc');
const inc10 = document.querySelector('#inc10');
const dec = document.querySelector('#dec');
const output = document.querySelector('output');

/** NOTE: these are different because they're coming from a global */
const { BehaviorSubject } = Rx;
const { map } = Rx.operators;

/**
  1. update output with incremented and decremented values
  2. start output with value zero

  NOTE: Hint `scan` is a great way to update a state
    without pushing your state to some global scope.
    If you're familiar with Redux, it's going to end up a
    little like that.
*/

// v1
// //Creates an observable sequence by adding an event listener to the matching Element
// //Rx.Observable.fromEvent(element, eventName, [selector], [options])
//   const inc$ = Rx.Observable.fromEvent(inc, 'click')
//     .map(() => ({'type': 'INCREMENT'}));
//
//   const dec$ = Rx.Observable.fromEvent(dec, 'click')
//     .map(() => ({'type': 'DECREMENT'}));
//
//   //Combine sequences
//   const action$ = Rx.Observable.merge(
//     inc$,
//     dec$
//   );
//
//   //update a state without pushing your state to some global scope
//   const state$ =  action$.scan((state, action) => {
//     switch (action.type) {
//       case 'INCREMENT':
//         return state + 1;
//       case 'DECREMENT':
//         return state - 1;
//       default:
//         return state;
//     }
//   }, 0);
//
//   state$.subscribe(n => output.innerText = n);


// v2 - More common pattern
// so first time the status subscribes to the action is going to get event INIT
// and then after that is going to get the INC and DEC events
const action$ = new BehaviorSubject({type: 'INIT'});

Rx.Observable.fromEvent(inc, 'click')                              // take our increment events
// you can use also .mapTop({'type': 'INCREMENT'})
  .map(() => ({'type': 'INCREMENT'}))                              // map those to this actions
  .subscribe(action$);                                             // then nest them into the action subject

//Add a button that increments by 10
Rx.Observable.fromEvent(inc10, 'click')
  .map(() => ({'type': 'INCREMENT10'}))
  .subscribe(action$);

Rx.Observable.fromEvent(dec, 'click')
  .map(() => ({'type': 'DECREMENT'}))
  .subscribe(action$);

// v3
// const action$ = Rx.Observable.merge(
//   Rx.Observable.fromEvent(inc, 'click')
//     .map(() => ({'type': 'INCREMENT'})),
//
//   Rx.Observable.fromEvent(inc10, 'click')
//     .map(() => ({'type': 'INCREMENT10'})),
//
//   Rx.Observable.fromEvent(dec, 'click')
//     .map(() => ({'type': 'DECREMENT'}))
// ).startWith({type: 'INIT'});
//
// with this version you loose the flexibility of calling dispatch  action$.next()


//update a state without pushing your state to some global scope
const state$ =  action$.scan((state, action) => {                  // take all the actions that are coming through the action subscription and run it through the scan
  switch (action.type) {

    case 'INIT':
      return 0;

    case 'INCREMENT':
      return state + 1;

    case 'INCREMENT10':
      return state + 10;

    case 'DECREMENT':
      return state - 1;

    default:
      return state;
  }
}, 0);

state$.subscribe(n => output.innerText = n);                       // here we are subscribing to the outcome of that
                                                                   // and use that to update out innerText