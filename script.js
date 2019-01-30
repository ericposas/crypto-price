const rp = require('request-promise');
let symbs = process.argv.slice(2,process.argv.length);
let symbs_to_string = symbs.join(',');
const fs = require('fs');
const wstream = fs.createWriteStream('./data.txt', {flags:'w'});
const EOL = require('os').EOL;

//console.log( symbs_to_string );
//return;

if(symbs == ''){
  symbs_to_string = 'ETH,BTC';
}

setTimeout( get_crypto_prices, 2000);


function get_crypto_prices(){
  let req = rp({
    method: 'get',
    uri: `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${symbs_to_string}&tsyms=USD&api_key=3f1949649f53975592a769d97da853b28ba6e6d63126d8817bcb1f0818303b61`,
    json: true
  }).then( res=>{
    //console.log(res);
    process_result(res);
  }).catch( err=>{
    console.log(err);
  });
}

fs.watch('./data.txt', ()=>{
  let chunks = [];
  const rstream = fs.createReadStream('./data.txt');
  rstream.on('data', chunk=>{
    chunks.push(chunk);
  });
  rstream.on('end', ()=>{
    console.log( Buffer.concat(chunks).toString() );
  });
});


function process_result(res){
  let data = '';
  Object.keys(res).forEach( key=>{
    //console.log( key);
    data+=key;
    data+=EOL;
    Object.keys(res[key]).forEach( k=>{
      //console.log( res[key][k] );
      data+=res[key][k];
      data+=EOL;
    });
  });
  wstream.write( data );  
}
