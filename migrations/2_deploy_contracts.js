var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var pictereum = artifacts.require("./pictereum.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(pictereum);
};
