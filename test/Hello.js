const { expect, assert } = require("chai");
const { ethers } = require("hardhat");
describe("Hello", function (){
    let data;
    this.beforeEach(async()=>{
      const d_hello= await ethers.getContractFactory("HelloWorld")
      const dd_hello= await d_hello.deploy("hello world");
      data=dd_hello;
    })
    it('it should return', async function () {
      assert.equal(await data.getMessage(),"hello world");
    })
    it('it should update', async function () {
        const setnewmessage= await data.setMessage("Hello sk rijwan");
        await setnewmessage.wait();
        assert.equal(await data.getMessage(),"Hello sk rijwan");
    })
    
})