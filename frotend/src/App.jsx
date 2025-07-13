import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { ethers } from 'ethers'
import './App.css'

function App() {
  const [Address, setAdress] = useState('Connect MetaMask')
  const [bal,setBal]= useState()
  const {ethereum}=window;
  useEffect(()=>{
    ethereum.on("ChangeChainid",(chain)=>{
      console.log(chain)
    })
  })
  const connectfun=async()=>{
    if(!window.ethereum){
      alert("Install MetaMask frist")
      return;
    }
      const account= await ethereum.request({
        method:"eth_requestAccounts"
      })
      console.log(account)
      // setAdress(`${account[0].slice(0, 6)}...${account[0].slice(-4)}`);
      setAdress(account[0])
      const balance= await ethereum.request({
        method:"eth_getBalance",
        params:[
          account[0],'latest'
        ]
      })
      console.log(balance)
      setBal(ethers.formatEther(balance))
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
         {bal?`Your account balance:${bal}`:bal}
     </div>
    
    </>
  )
}

export default App
