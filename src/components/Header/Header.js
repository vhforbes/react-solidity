import React from 'react'
import { useSelector } from 'react-redux'
import './Header.css';


const Header = () => {
  const auth = useSelector(state => state.auth)

  return (
    <div className="header">
      <p className='welcome'>Welcome to the <strong>Victor Forbes</strong> wave sender!</p>
      <span className='wave-header'>👋</span>
      {auth.accounts.length === 0 ?
        <span>Please connect your wallet to send a wave!</span>
        :
        <span className='account'>Wallet: {auth.accounts[0]}</span>
      }
    </div>
  );
}

export default Header;
