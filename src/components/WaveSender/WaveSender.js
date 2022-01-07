import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import './App.css';
import abi from "../../utils/WavePortal.json";

const WaveSender = () => {
  const [currentAccount, setCurrentAccount] = useState("")
  const [totalWaves, setTotalWaves] = useState(0)
  const contractAddress = "0xa4eeca7e0aa2a0d5a916843c033a5d25400c4d5b"
  const contractABI = abi.abi





  const getWaves = async () => {
    try {
      const { ethereum } = window

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer)

        let count = await wavePortalContract.getTotalWaves()
        setTotalWaves(count.toNumber())

      } else {
        console.log("eth object doesn't exist: getting waves")
      }
    } catch (err) {
      console.log(err)
    }
  }

  const sendWave = async () => {
    try {
      const { ethereum } = window

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer)

        const wave = await wavePortalContract.wave();
        console.log("Mining...", wave.hash)

        await wave.wait()
        console.log("Mined --", wave.hash)

        getWaves()

      } else {
        console.log("eth object doesn't exist: getting waves")
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    checkIfWallet()
  }, [])

  return (
    <div className="App">
      <p>Your using wallet: {currentAccount}</p>
      {totalWaves === 0 ? <p>You have no waves</p> : <p>Your total waves are {totalWaves}</p>}
      
      {!currentAccount ? <button onClick={connectWallet}>Connect wallet</button> : null}
      
      <button onClick={sendWave}>Wave</button>

    </div>
  );
}

export default WaveSender;
