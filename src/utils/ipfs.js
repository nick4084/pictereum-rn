const IPFS = require('ipfs-http-client');

//const ipfs = new IPFS({ host:'localhost', port: '8080', protocol: 'https'});
const ipfs = IPFS({ host: 'localhost', 
					port: '5001', 
					protocol: 'http'})

export default ipfs;