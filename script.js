const rp = require('request-promise');
let symbs = process.argv.slice(2,process.argv.length);
let symbs_to_string = symbs.join(',');

//console.log( symbs_to_string );
//return;

if(symbs == ''){
  symbs_to_string = 'ETH,BTC';
}


rp({
  method: 'get',
  uri: `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${symbs_to_string}&tsyms=USD&api_key=3f1949649f53975592a769d97da853b28ba6e6d63126d8817bcb1f0818303b61`,
  json: true
}).then( res=>{
  //console.log(res);
  process_result(res);
}).catch( err=>{
  console.log(err);
});


function process_result(res){
  Object.keys(res).forEach( key=>{
    console.log( key);
    Object.keys(res[key]).forEach( k=>{
      console.log( res[key][k] );
    });
  });
}
