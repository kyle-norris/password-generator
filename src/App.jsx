import { useState, useEffect, useCallback } from 'react'
import './App.css'
import Checkbox from './components/Checkbox'
import StrengthMeter from './components/StrengthMeter'
import CopyButton from './components/CopyButton'
import { generate, calculateStrength } from './utils/password'
import RightArrowIcon from './components/RightArrowIcon'


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


  const generatePassword = useCallback(() => {
    setPassword(generate(length, lowercase, uppercase, numbers, symbols))
  }, [length, lowercase, uppercase, numbers, symbols])

  useEffect(() => {
    if (!uppercase && !lowercase && !numbers && !symbols) {
      setLength(0);
      setStrength(0);
    }

    generatePassword()

  }, [uppercase, lowercase, numbers, symbols, length, generatePassword])

  useEffect(() => {
    if (password == "") {
      setStrength(0);
    } else {
      setStrength(calculateStrength(password));
    }
    
  }, [password])

  return (
    <div className='background' role="main">
      <div className='card'>
        <h1>
        Passord Generator
        </h1>
        <div className="passwordCard">
          {password ? <div className='password'>{password}</div> : <div className='defaultPassword'>PTx1f5DaFX</div>}
          
          <div className='copyContainer'>
            <CopyButton onCopy={onCopyBtn}/>
          </div>
          
        </div>

        <div className="rulesCard">
          <div className="characterLabel" >
            <label id="characterlength">Character Length</label>
            <div className="characterLength">{length}</div>
          </div>
          
          <input aria-labelledby="characterlength" disabled={!uppercase && !lowercase && !numbers && !symbols} className="slider" type="range" min="0" max="20" onChange={(event) => setLength(event.target.value)} value={length}></input>

          <Checkbox value={uppercase} setValue={setUppercase} label="Include Uppercase Letters"/>
          <Checkbox value={lowercase} setValue={setLowercase} label="Include Lowercase Letters"/>
          <Checkbox value={numbers} setValue={setNumbers} label="Include Numbers"/>
          <Checkbox value={symbols} setValue={setSymbols} label="Include Symbols"/>

          <StrengthMeter strength={strength}/>

          <button className="generateBtn" onClick={generatePassword}>
              GENERATE
              <RightArrowIcon />
          </button>

        </div>
      </div>
      
    </div>
  )
}

export default App
