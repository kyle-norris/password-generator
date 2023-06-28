import { useState, useEffect } from 'react'
import './App.css'
import Checkbox from './components/Checkbox'
import StrengthMeter from './components/StrengthMeter'
import CopyButton from './components/CopyButton'
import { generate, calculateStrength } from './utils/password'





function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(10);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(false);
  const [strength, setStrength] = useState(1);

  function onCopyBtn() {
    navigator.clipboard.writeText(password);
  }

  function generatePassword() {
    setPassword(
      generate(length, lowercase, uppercase, numbers, symbols)
    )
  }

  useEffect(() => {
    if (!uppercase && !lowercase && !numbers && !symbols) {
      setLength(0);
      setStrength(0);
    }

    generatePassword();

  }, [uppercase, lowercase, numbers, symbols, length])

  useEffect(() => {
    if (password == "") {
      setStrength(0);
    } else {
      setStrength(calculateStrength(password));
    }
    
  }, [password])

  return (
    <div className='background'>
      <div className='card'>
        <h1>
        Passord Generator
        </h1>
        <div className="passwordCard" style={length < 15 ? {fontSize: "32px"} : {fontSize: "31px"}}>
          {password ? <div>{password}</div> : <div className='defaultPassword'>PTx1f5DaFX</div>}
          
          <div>
            <CopyButton onCopy={onCopyBtn}/>
          </div>
          
        </div>

        <div className="rulesCard">
          <div style={{display: 'flex', justifyContent: "space-between"}}>
            <div>Character Length</div>
            <div style={{fontSize: "32px", color: "#A4FFAF"}}>{length}</div>
          </div>
          
          <input disabled={!uppercase && !lowercase && !numbers && !symbols} className="slider" type="range" min="0" max="20" onChange={(event) => setLength(event.target.value)} value={length}></input>

          <Checkbox value={uppercase} setValue={setUppercase} label="Include Uppercase Letters"/>
          <Checkbox value={lowercase} setValue={setLowercase} label="Include Lowercase Letters"/>
          <Checkbox value={numbers} setValue={setNumbers} label="Include Numbers"/>
          <Checkbox value={symbols} setValue={setSymbols} label="Include Symbols"/>

          <StrengthMeter strength={strength}/>

          <button className="generateBtn" onClick={generatePassword}>GENERATE</button>

        </div>
      </div>
      
    </div>
  )
}

export default App
