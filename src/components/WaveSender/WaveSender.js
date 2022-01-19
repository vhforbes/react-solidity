import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import './WaveSender.css';
import abi from "../../utils/WavePortal.json";

const WaveSender = () => {
  const [totalWaves, setTotalWaves] = useState(0)
  const [allWaves, setAllWaves] =  useState([])
  const [message, setMessage] = useState('')
  const [emptyMessage, setEmptyMessage] = useState(false)
  const [loading, setLoading] = useState(false)
  const [transactionHash, setTransactionHash] = useState('')
  const contractAddress = "0xf3DA07C98Fa86A99a242DF3be9bFB6efe69152E2"
  const contractABI = abi.abi
  const { ethereum } = window
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer)

  const getWaves = async () => {
    try {
      let count = await wavePortalContract.getTotalWaves()
      setTotalWaves(count.toNumber())
    } catch (err) {
      console.log(err)
    }
  }

  const getAllWaves = async () => {
    try {
      let waves = await wavePortalContract.getAllWaves()
      setAllWaves(waves)
    } catch (err) {
      console.log(err)
    }
  }

  const sendWave = async () => {
    if (message.length > 0) {
      setEmptyMessage(false)
      try {
        const wave = await wavePortalContract.wave(message);
        setTransactionHash(wave.hash)
        setLoading(true)

        await wave.wait()
        setLoading(false)

        getAllWaves()
        getWaves()
      } catch (err) {
        console.log(err)
      }
    } else {
      setEmptyMessage(true)
    }
  }

  const updateMessage = (message) => {
    setMessage(message)
  }

  useEffect(() => {
    getWaves()
    getAllWaves()
  }, [])

  return (
    <>
    {loading ? (
      <div className='loading'>
        <p>Loading transaction...</p>
        <p>{transactionHash}</p>
      </div>
    )
    : 
    (<div className="wave-sender">
      <p className='greeting-text'>Hey! Glad you dropped by! Here you can send me a wave and a message trough the Rinkeby Test Network.</p>
      <div className='input-container'>
        <span className='label'>Leave a message!</span>
        <input onChange={(e) => updateMessage(e.target.value)} type="text" value={message} className='message-input' />
        {emptyMessage ? <p className='message-warning'>Please leave a message!</p> : null}
      </div>
      <button className='send-wave-btn' onClick={() => sendWave(message)}>👋</button>
      {totalWaves === 0 ? <p>Forbes have no waves</p> : <p>Forbes has {totalWaves} total waves!</p>}
      <div className='waves-list'>{
        allWaves.map(wave => (
          <div className='message-board'>
            <div className='sender-wallet'>
              <span>Sent by: </span>
              <span>{wave[0]}</span>
            </div>
            <br/>
            <span>{wave[1]}</span>
          </div>
        ))
        }
      </div>
    </div>)
    }
    </>

    
  );
}

export default WaveSender;
