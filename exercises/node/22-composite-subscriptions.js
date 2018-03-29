const { Subscription } = require('rxjs/Subscription');
const noisyUnsubscriber = require('./fixtures/22-noisy-unsubscriber');

//Imperative way to write subscription

// NOTE: Setup
const sourceA$ = noisyUnsubscriber('a');
const sourceB$ = noisyUnsubscriber('b');
const sourceC$ = noisyUnsubscriber('c');

// we're going to clean these subscriptions up on a timer (later)
const subA = sourceA$.subscribe(x => console.log(x));
const subB = sourceB$.subscribe(x => console.log(x));
const subC = sourceC$.subscribe(x => console.log(x));

// TODO: manage subscriptions by building a single parent subscription

const sub = new Subscription();
const childSubA = sub.add(subA);  //this way wraps it into a child Subscription
const childSubB = sub.add(subB);
const childSubC = sub.add(subC);

setTimeout(() => {
  // TODO: unsubscribe from `subA` so that it's removed from your
  //       parent subscription
  // subA.unsubscribe();    // it will leave the child subscription into the parent
  childSubA.unsubscribe();  // unsubscribe subA but also removes itself from the parent subscription (so it doesn't hold on to a memory reference to the old subscription you don't care about
                            // this is like doing  --> sub.remove(childSubA); and subA.unsubscribe();
}, 900);

setTimeout(() => {
  // unsubscribe from all remaining subscriptions (`subB` and `subC`)
  // using a single parent subscription
  sub.unsubscribe();
}, 1300);

/**
  NOTE: expected output
  a: 0
  b: 0
  c: 0
  a: 1
  b: 1
  c: 1
  a: 2
  b: 2
  c: 2
  a: 3
  b: 3
  c: 3
  a unsubscribed
  b: 4
  c: 4
  b: 5
  c: 5
  b unsubscribed
  c unsubscribed
*/
