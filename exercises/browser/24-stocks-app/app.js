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
    .filter(x => x.length < 6)
    .map(q => getSearchURL(q))
    .switchMap(url => Rx.Observable.ajax.getJSON(url)) //get only the last typed value (switch)
    .subscribe(showSuggestions);

  // TODO: setup a WebSocketSubject

  function getTickerStream(symbol) {
    // TODO: multiplex the web socket (then add retry logic)
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
