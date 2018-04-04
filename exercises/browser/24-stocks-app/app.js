(function () {
  // NOTE: Setup ---------------------------------------------


  // the div containing the search suggestion results
  const suggestions = document.querySelector('#suggestions');

  // the div containing the selected tickers
  const tickers = document.querySelector('#tickers');

  // the search input element
  const q = document.querySelector('#q');

  // a function to get the search results URL
  const getSearchURL = (query) => `/search?q=${query}`;
  // ---------------------------------------------------------

  /**
      create an subscribe to an observable that does the
            look ahead search

      NOTE: You don't have to keep the subscription to it, as it will
            be active for the life of this application.
  */

  Rx.Observable.fromEvent(q, 'input')
    .debounceTime(500) //only emit what is typed after 500ms to avoid spamming
    .map(e => e.target.value)
    .filter(x => x.length < 6) //filter only values that are less than 6 characters length
    .map(q => getSearchURL(q))
    .switchMap(url =>
      Rx.Observable.ajax.getJSON(url)
        .catch((err) => {         //by doing this you prevent to unsubscribe to the whole Observable
          console.log('bad thing');
          return Rx.Observable.empty();
        })) //get only the last typed value (switch)
    // .do(x => console.log(x)) //debug
    .subscribe(results => showSuggestions(results));


  // without RxJS sample code for multiplex
  //
  // const socket = new WebSocket('ws://localhost:8080');
  //
  // socket.onopen = () => {
  //   socket.send(JSON.stringify({type: 'sub', symbol: 'NFLX'}))
  // };
  //
  // socket.onmessage = e => {
  //   const data = JSON.parse(e.data);
  //   //  do something with data
  //   console.log(data);
  // };
  //
  // socket.onclose = e => {
  //
  // };
  // really complex code for a multiplex socket (one socket for multiple data streams)

  // setup a WebSocket
  const socket = Rx.Observable.webSocket('ws://localhost:8080');

  // multiplex the web socket (then add retry logic)
  function getTickerStream(symbol) {
    return socket.multiplex(
      // factory to get subsciption message to send
      () => JSON.stringify({type: 'sub', symbol}),
      // factory to get the unsub to send on teardown
      () => JSON.stringify({type: 'unsub', symbol}),
      // a filter to get just the values you care about
      // for this stream
      data => data.symbol === symbol,
    )
      .map(x => x.price)
      // retry to connenct to the server
      .retryWhen(error$ => error$.switchMap(() => Rx.Observable.timer(1000)));
  };

  // ***************************************************************************
  // ***************************************************************************
  // ***************************************************************************
  // Hacky render code past here. Just for demoing purposes. Not best practice!
  // ***************************************************************************
  // ***************************************************************************
  // ***************************************************************************

  function showSuggestions(results) {
    let html = '<ul>';
    results.forEach(({ symbol, name }) => {
      html += `<li>
        <a href="javascript:selectSymbol('${symbol}')">
          ${symbol} - ${name}
        </a>
      </li>`;
    })
    html += '</ul>';

    suggestions.innerHTML = html;
    return html;
  };

  // a hook that is called when a symbol is selected from the suggestions.
  function selectSymbol(symbol) {
    addTicker(symbol);
    suggestions.innerHTML = '';
  };

  function addTicker(symbol) {
    const id = 'ticker-' + symbol;
    if (document.querySelector('#' + id)) {
      return;
    }
    const ticker = document.createElement('x-ticker-display');
    ticker.id = id;
    ticker.title = symbol;
    ticker.data = getTickerStream(symbol);
    tickers.appendChild(ticker);
  };

  window.selectSymbol = selectSymbol;
} ());
