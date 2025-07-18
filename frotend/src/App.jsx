import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserProvider, ethers } from 'ethers'
import './App.css'
import contract from "./hello.sol/HelloWorld.json"
function App() {
  const [Address, setAdress] = useState('Connect MetaMask')
  const [bal, setBal] = useState()
  const { ethereum } = window;
  const [message,setMessage]= useState('')
  const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'
  const infuraProvider= new ethers.JsonRpcProvider(
    "https://sepolia.infura.io/v3/4f7699b599794fb6b1c3e4880987bf2c"
  )
  const WalletProvider= new BrowserProvider(ethereum)
  const singer= WalletProvider.getSigner();

  const getContractdata= new ethers.Contract(
    contractAddress,
    contract.abi,
    infuraProvider
  )
 
  const setmessage=async()=>{
    const data= await getContractdata.getMessage()
    console.log(data)
    setMessage(data)
  }
  useEffect(() => {
    const getChainid = async () => {
      const id = await ethereum.request({ method: "eth_chainId" })
      console.log(id);
         const code = await infuraProvider.getCode(contractAddress);
         console.log(code);
    }
    getChainid()
 
  }, [])
  const connectfun = async () => {
    if (!window.ethereum) {
      alert("Install MetaMask frist")
      return;
    }
    const account = await ethereum.request({
      method: "eth_requestAccounts"
    })
    console.log(account)
    setAdress(account[0])
    const balance = await ethereum.request({
      method: "eth_getBalance",
      params: [
        account[0], 'latest'
      ]
    })
    console.log(balance)
    setBal(ethers.formatEther(balance))
  }
  const sendtx = async () => {
    await ethereum.request({
      method: "eth_sendTransaction",
      params: [
        {
          to: `0xe95a1FF5E1c28225FaC694Be2B87B3BFbE88117d`,
          from: Address,
          value: `0x${parseInt(ethers.formatEther('1')).toString(16)}`,
          chainId: "0xaa36a7"
        }
      ]
    })
  }

  return (
    <>
      <div className="wallatbtn">
        <button
          style={{
            backgroundColor: '#f6851b',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            fontSize: '16px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
          }}
          onClick={connectfun}
        >
          {Address}
        </button>
        {bal ? `Your account balance:${bal}` : bal}


      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "10px" }}>
        <button
          style={{
            backgroundColor: '#f6851b',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            fontSize: '16px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
          }}
          onClick={sendtx}
        >
          Send ETC
        </button>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "10px" }}>
        <button
          style={{
            backgroundColor: '#f6851b',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            fontSize: '16px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
          }}
          onClick={setmessage}
        >
          GetMessage
        </button>
        <p style={{color:"white",fontSize:"20px"}}>
        {message}
        </p>
      </div>
    </>
  )
}

export default App
