import React from 'react'
import { useSelector } from 'react-redux'
import Authenticator from './Authenticator/Authenticator';
import Header from './Header/Header';
import WaveSender from './WaveSender/WaveSender';
import './App.css';

const App = () => {
  const auth = useSelector(state => state.auth)

  return (
    <div className="App">
      <Header/>
      {
        auth?.accounts.length !== 0 ? <WaveSender /> : <Authenticator />
      }

    </div>
  );
}

export default App;
