require('@babel/register');
({
    ignore: /node_modules/
});
require('@babel/polyfill');

const HDWalletProvider = require('@truffle/hdwallet-provider');

let mnemonic = 'hover enrich sun foot dance razor predict uncle inside light army genre'; 
let testAccounts = [
"0x2b50e6658562bddbd25ada57ddf9ab6cc06ae2a66b53ce10f029b37380aface8",
"0x0a43e68d19501fdfeb258d8ffc83348b617f07be5c84b965338bdf730cc8285a",
"0x0dcf605614ec96742e9b4d0ab15e46d8c3385b2710813595880568edf88def8d",
"0x40d9949fbf171cfc2a72292814733b7b3458ba164f6fb605d978f762fe7466e3",
"0x7d11dc6f2ea2ad580d013920a5ffcb274f309011116c72f645d86eea184e3351",
"0x325f52bf3066cd945506add5bc294527533260d3864da1a005afd8b283c5f317",
"0x105f44ffe6accd5f340efec2629bd464b0a2af3c4705d3f16247b3afde9a45d1",
"0x4faf67dfc4bf59c33c005533524b47f6bd49b6c04f2b95979ff7378c0f14b8ad",
"0x96bf9275a463e1ff16b37d351c35af9e846e744f66fce9904c5bc403ed06fe10",
"0x6d71d147df19e511031fc36069229f0475d82a32ade26d4cf9cc4a54e00835d2"
]; 
let devUri = 'http://127.0.0.1:7545/';

module.exports = {
    testAccounts,
    mnemonic,
    networks: {
        development: {
            uri: devUri,
            provider: () => new HDWalletProvider(
                mnemonic,
                devUri, // provider url
                0, // address index
                10, // number of addresses
                true, // share nonce
                `m/44'/60'/0'/0/` // wallet HD path
            ),
            network_id: '*'
        }
    },
    compilers: {
        solc: {
            version: '^0.5.11'
        }
    }
};
