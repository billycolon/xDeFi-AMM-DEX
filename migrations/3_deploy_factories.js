const TMath = artifacts.require('TMath');
const XFactory = artifacts.require('XFactory');
const XConfig = artifacts.require('XConfig');
const XPoolCreator = artifacts.require('XPoolCreator');

module.exports = async function (deployer, network, accounts) {
    if (network === 'development' || network === 'coverage') {
        await deployer.deploy(TMath);
    }

    const config = await XConfig.deployed();
    const poolCreator = await XPoolCreator.deployed();

    await deployer.deploy(XFactory, config.address, poolCreator.address);
};
