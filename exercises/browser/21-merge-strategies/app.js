(function () {
  const drop = document.querySelector('#drop');
  const dropped = document.querySelector('#dropped');
  const completed = document.querySelector('#completed');
  const svg  = document.querySelector('svg');

  const { Observable } = Rx;
  const { fromEvent } = Observable;

  const dropClick$ = fromEvent(drop, 'click');

  /**
    TODO: part 1
    1. Use `addBall` and a merging strategy to add an animated ball to the svg element
       for each click of the `drop` button as soon as the `drop` button is clicked.
    2. Increment the value displayed in `dropped` for each ball dropped.
    3. Increment the value displayed in `completed` for each ball animation completed

    TODO: part 2
    4. Change merging strategies so only one animated ball is added at a time,
       But all requested balls complete their animation. Effectively, you'll be
       queueing up animations for each click to `drop`.

    TODO: part3
    5. Change merging strategies so only one animated ball may be added at a time,
       and subsequent requests cancel the currently animating ball.

    TODO: BONUS - Try different source other than button clicks to start your
                  Ball animations!

    NOTE: Balls can be added with the `addBall` function found in global scope.

    `addBall` API:

    addBall(svg: SVGElement): Observable<BallAnimationEvent>

      - returns an Observable that adds a bouncing SVGCircleElement to the passed
        SVGElement. The values emitted are BallAnimationEvents such that:

        interface BallAnimationEvent {
          t: number; // completion ratio between 0 and 1
          x: number; // x pixel position
          y: number; // y pixel position
        }
  */

  //DIFFERENT MERGE STRATEGIES

  /*
    MERGEALL
    If you have multiple observables A and B

    A            ----a----a--------a----a----|
    B               ----b--b---b----b-----b----|


    subject -----A-----B-------|

    subject.mergeAll()
            -----*---a*-b-ab---b---ab---a-b----|
   */

  // our stream of drop clicks
  // dropClick$
  //   .map(() => addBall(svg))         // play every single one of these and merge these into the output stream
  //   .mergeAll()                      // takes every observable that arrives from its source and it merges and subscribes their values into the output stream
  //   .subscribe();
  // verbose version

  // dropClick$
  //   .mergeMap(() => addBall(svg))       //or .flatMap(() => addBall(svg))
  //   .subscribe();

  /*
    a$.merge(b$, c$); === Observable.merge(a$, b$, c$) === Observable.of(a$, b$, c$).mergeAll();
   */

  /*
    CONCATALL waits for each one to complete before it starts the next one

    subject.concatAll()
            -----*----a----a--------a----a----*----b--b---b----b-----b----|
   */

  // dropClick$
  //   .map(() => addBall(svg))         -----| //or concatMap(() => addBall(svg))
  //   .concatAll()                     -----|
  //   .subscribe();

  /*
    SWITCH interrupts the previous request and subscribes to the new one

    subject.switch()
            -----*----a*--b--b---b----b-----b----|

    used for HTTP requests like autocomplete
    so you start with searching for fish but then you keep typing because you need fisherman
   */

    // dropClick$
    //   .map(() => addBall(svg))       -----| //or switchMap(() => addBall(svg))
    //   .switch()                      -----|
    //   .subscribe();


  dropClick$
    // EVENTS COORDINATOR in order to make a stream of actions
    // .switchMap(() => listenFor('drop a ball'))
    // .do(x => console.log(x))                        // used for debugging
    .mergeMap(() => {
      // return a ball animation observable where
      return addBall(svg)
        // when the ball animates, emit an action
        .mapTo({type: 'BALL_ANIMATE'})
        // it starts with a BALL_START action
        .startWith({type: 'BALL_START'})
        // it ends with a BALL_END action
        .concat(Rx.Observable.of({type: 'BALL_END'}))
    })
    // use a scan for state management (we'll just mutate state, it's okay here) - STATE MANAGEMENT
    .scan((state, action) => {
      switch (action.type) {
        // when you get a BALL_START, increment dropped counter
        case 'BALL_START':
          // best practice create a new state -> return {...state, dropped: state.dropped + 1}
          state.dropped++;
          break;

        // when you get a BALL_END, increment the completed counter
        case 'BALL_END':
          state.completed++;
          break;
      }

      return state;

    }, { dropped: 0, completed: 0 })
    // init scan here
    // subscribe to our state stream
    .subscribe(state => {
      dropped.innerText = state.dropped;
      completed.innerText = state.completed;
    });

}());
