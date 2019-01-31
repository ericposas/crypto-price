const rp = require('request-promise');
let symbs = process.argv.slice(2,process.argv.length);
let symbs_to_string = symbs.join(',');
const fs = require('fs');
const EOL = require('os').EOL;
const cp = require('child_process');


module.exports = function crypto_check(){

if(symbs == ''){
  symbs_to_string = 'ETH,BTC';
}

setInterval( get_crypto_prices, 3000);


function get_crypto_prices(){
  let req = rp({
    method: 'get',
    uri: `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${symbs_to_string}&tsyms=USD&api_key=3f1949649f53975592a769d97da853b28ba6e6d63126d8817bcb1f0818303b61`,
    json: true
  }).then( res=>{
    process_result(res);
  }).catch( err=>{
    console.log(err);
  });
}

fs.watchFile('./data.txt', ()=>{
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
  const wstream = fs.createWriteStream('./data.txt', {flags:'w'});
  let data = '';
  Object.keys(res).forEach( key=>{
    Object.keys(res[key]).forEach( k=>{
      data+=key+': '+res[key][k];
      data+=EOL;
    });
  });
  wstream.write( data );  
}

);
