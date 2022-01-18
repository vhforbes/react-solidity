import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import './WaveSender.css';
import abi from "../../utils/WavePortal.json";
import { useSelector } from 'react-redux';

const WaveSender = () => {
  const [totalWaves, setTotalWaves] = useState(0)

  const auth = useSelector(state => state.auth)

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
    getWaves()
  }, [])

  return (
    <div className="wave-sender">
      <p className='greeting-text'>Hey! Glad you dropped by! Here you can send me a wave trough the Rinkeby Test Network.</p>
      <button className='send-wave-btn' onClick={sendWave}>👋</button>
      {totalWaves === 0 ? <p>Forbes have no waves</p> : <p>Forbes has {totalWaves} total waves!</p>}

    </div>
  );
}

export default WaveSender;
