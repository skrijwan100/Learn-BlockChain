const { task } = require("hardhat/config");

require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
/** @  import('hardhat/config').HardhatUserConfig */
task("accounts","prinst the list of account", async(taskArgs,hre)=>{
  const accounts= await hre.ethers.getSigners();
  console.log(accounts)
  for(const account of accounts){
    const address= await account.getAddress();
    const bal= await hre.ethers.provider.getBalance(address);
    // console.log(address +":" + `${ethers.utils.formatEther(bal)}`);
  }
})
module.exports = {
  defaultNetwork:"hardhat",
  solidity: "0.8.28",
  networks:{
    hardhat:{},
     sepolia: {
      url: `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`, // RPC endpoint
      accounts:[process.env.PRIVATE_KEY], // Your wallet's private key
    },
  }
};
