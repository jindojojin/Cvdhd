if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

web3.eth.defaultAccount = web3.eth.accounts[0];
var CoursetroContract = web3.eth.contract( );

var Coursetro = CoursetroContract.at('0x24fb11e0fdba25aea36dbb6e8e01847a43ea6413');
// module.exports = Coursetro;