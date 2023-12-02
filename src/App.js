import { useState } from 'react';
import { ethers } from 'ethers';
//Below is the ABI file to interact with the contract
import Lock from "./artifacts/contracts/Lock.sol/Lock.json";
import './App.css';



//Contact address
const lockAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

function App() {

  const [number, setNumber] = useState(""); 
  const [currentNumber, getCurrentNumber] = useState("");  
  const [add, myadd] = useState("");

  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });

  }

  async function fetchNumber() {
    //If MetaMask exists
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        lockAddress, Lock.abi, provider
      );
      try {
        const data = await contract.getNumber();
        console.log("data: ", data);
        getCurrentNumber(data);
      } catch (error) {
        console.log("Error: ", error);
      }
    }
  }





  async function fetchaddress() {
    //If MetaMask exists
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        lockAddress, Lock.abi, provider
      );
      try {
        const data1 = await contract.getaddress();
        console.log("data: ", data1);
        myadd(data1);
      } catch (error) {
        console.log("Error: ", error);
      }
    }
  }





  //Sets the greeting from input text box
  async function inputNumber() { 
    if (!number) return;

    //If MetaMask exists
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(lockAddress, Lock.abi, signer);
      const transaction = await contract.setNumber(number); 

      setNumber("");
      await transaction.wait();
      fetchNumber();

    }
  }





  return (
    <div className="App">
      <div className='App-Header'>
        <div className='description'>
          <h1>FRONTEND</h1>
        </div>


        <div>
          <input
            onChange={(e) => setNumber(e.target.value)}
            value={number}
            placeholder='Enter Number'
          />
          <br />
          <br />

        </div>


        <div className='custom-buttons'>
          <button onClick={fetchNumber} style={{ backgroundColor: 'green' }}>Get Number</button><br />
          <button onClick={inputNumber} style={{ backgroundColor: 'red' }}>Set Number</button>
        </div>



        <div >
          <button onClick={fetchaddress} className='display'>My Address</button>
        </div>


      </div>
    </div>
  );
}

export default App;
