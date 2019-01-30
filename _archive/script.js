const rp = require('request-promise');
const options = {
  method: 'get',
  //uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
  uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/historical',
  qs: {
    start: 1,
    limit: 5,
    convert: 'USD'
  },
  headers: {
    'X-CMC_PRO_API_KEY': '31c332f1-c7b3-482c-891c-29b59b1d53c9'
  },
  json: true,
  gzip: true
}

rp(options).then(resp=>{
  console.log('API call response:', resp);
  process_data(resp);
}).catch( err=>{
  console.log('API call error:'
, err.message);
});


function process_data(response){
  response.data.forEach( (item,i)=>{
    console.log( item.name, item.quotes.quote.USD );
  });
}
