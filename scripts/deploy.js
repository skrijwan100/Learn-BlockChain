const hre= require("hardhat");

async function main() {
    const m1= await hre.ethers.getContractFactory("HelloWorld")
    const d1= await m1.deploy("hello everyone");
    await d1.waitForDeployment();
    console.log("the depoly address: ",await d1.getAddress());
}

main().then(()=> process.exit(0)).catch((error)=>{
console.log(error)
 process.exit(1)
})