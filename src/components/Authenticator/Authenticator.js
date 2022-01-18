import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { store } from '../../store/store';

const Authenticator = () => {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)

    /**
      * Check if user has a wallet.
    */
    const checkMetamask = async () => {
      try {
        const { ethereum } = window;
        
        if(ethereum) {
          dispatch({ type: 'haveMetamask' })
        } else {
          console.log('no meta')
        }
      } catch (err) {
        console.log(err)
      }
    }

    /**
      * Authenticate metamask method
    */
     const authenticateMetamask = async () => {
      try {
        const { ethereum } = window

        if(!ethereum) {
          return
        } 
  
        const accounts = await ethereum.request({method: "eth_requestAccounts"})
        dispatch({ type: 'saveAccounts', payload: accounts})
  
      } catch(err) {
        console.log(err)
      }
    }

    useEffect(() => {
      checkMetamask();
    }, [])

  return (
    <div className="App">
      {auth.haveMetamask ? 
      <div>
        <p> You have metamask </p>
        {
          auth?.accounts.length === 0 ? 
          <button onClick={authenticateMetamask}>Auth Metamask</button> : 
          <p> Your using account: <br/> {auth.accounts[0]} </p>
        }
      </div>
        : 
      <div>
        <p>YOU NEED METAMASK TO USE THIS APP</p>
      </div>
      }
    </div>
  );
}

export default Authenticator;
