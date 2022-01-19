import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './Authenticator.css'

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
    <div className="Authenticator">
      {auth.haveMetamask ? 
      <div className='auth-metamask'>
        {
          auth?.accounts.length === 0 ? 
          <div className='auth-metamask'>
            <p>Authenticate metamask:</p>
            <button className='metamask-button' onClick={authenticateMetamask}>🦊</button>
          </div>
          : 
          null
        }
      </div>
        : 
      <div>
        <p className='need-metamask'>Please install metamask to use this app</p>
      </div>
      }
    </div>
  );
}

export default Authenticator;
