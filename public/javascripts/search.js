/* global instantsearch */

app({
    appId: '95DC9UW77Y',
    apiKey: 'a8a7d40018f50a19a4c3e2574e540d5d', // search API key
    indexName: 'wine-search',
  });
  
  function app(opts) {
    if (opts.appId === 'XXX') {
      console.error('You forgot to change the API key');
      return;
    }
  
    // ---------------------
    //
    //  Init
    //
    // ---------------------
    const search = instantsearch({
      appId: opts.appId,
      apiKey: opts.apiKey,
      indexName: opts.indexName,
      urlSync: true,
    });
  
    // ---------------------
    //
    //  Default widgets
    //
    // ---------------------
    search.addWidget(
      instantsearch.widgets.searchBox({
        container: '#search-input',
        placeholder: 'Search for wine 🍷',
      })
    );
  
    search.addWidget(
      instantsearch.widgets.hits({
        container: '#hits',
        hitsPerPage: 10,
        templates: {
          item: getTemplate('hit'),
        },
        transformData: {
          item: function(item) {
            // We just call this function to log the data so that
            // you can know what you can use in your item template
            console.log(item);
            return item;
          },
        },
      })
    );
  
    search.start();
  }
  
  // ---------------------
  //
  //  Helper functions
  //
  // ---------------------
  function getTemplate(templateName) {
    return document.querySelector(`#${templateName}-template`).innerHTML;
  }
  
  function getHeader(title) {
    return `<h5>${title}</h5>`;
  }