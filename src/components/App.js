import React, { useEffect, useState } from 'react'
import { hasMetamask } from '../features/auth/authSlice'
import { useSelector, useDispatch } from 'react-redux'

const App = () => {
  // validate if has metamask
  // auth metamask if needed
    // if ok display the wave sender
  const [currentAccount, setCurrentAccount] = useState("")

  const haveMetamask = useSelector((state) => state.auth.value)
  const dispatch = useDispatch()
  
  useEffect(() => {
    checkMetamask();
  })

  /**
    * Check if user has a wallet.
  */
   const checkMetamask = async () => {
    try {
      const { ethereum } = window;

      if(ethereum) {
        dispatch(hasMetamask());
        console.log(haveMetamask);
      } else {
        console.log('no meta')
      }

      // const accounts = await ethereum.request({ method: "eth_accounts"})

      // if (accounts.length !== 0) {
      //   const account = accounts[0]
      //   console.log("Found", account)
      //   setCurrentAccount(account)
      // } else {
      //   console.log("no access found")
      // }

    } catch (err) {
      console.log(err)
    }
  }

    /**
    * Connect wallet method
  */

     const connectWallet = async () => {
      try {
        const { ethereum } = window
  
        if(!ethereum) {
          return
        } 
  
        const accounts = await ethereum.request({method: "eth_requestAccounts"})
        console.log("connected", accounts[0])
              setCurrentAccount(accounts[0])
  
      } catch(err) {
        console.log(err)
      }
    }

  return (
    <div className="App">
      App
    </div>
  );
}

export default App;
