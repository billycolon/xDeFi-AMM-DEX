const WETH9 = artifacts.require("WETH9");
const XConfig = artifacts.require('XConfig');
const XSwapProxyV1 = artifacts.require('XSwapProxyV1');
const TTokenFactory = artifacts.require("TTokenFactory");

module.exports = async function (deployer, network, accounts) {
    const config = await XConfig.deployed();

    await deployer.deploy(WETH9);
    await deployer.deploy(TTokenFactory);

    //deploy XSwapProxyV1
    await deployer.deploy(XSwapProxyV1, WETH9.address, config.address);

    //setup proxy
    const proxy = await XSwapProxyV1.deployed();
    await config.setSwapProxy(proxy.address);
};
