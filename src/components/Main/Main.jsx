import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import './Main.scss';

function Main() {

  const [ passwordLength, setPasswordLength ] = useState(16);
  const [ includeLowercase, setIncludeLowercase ] = useState(true);
  const [ includeUppercase, setIncludeUppercase ] = useState(true);
  const [ includeNumbers, setIncludeNumbers ] = useState(true);
  const [ includeSymbols, setIncludeSymbols ] = useState(true);
  const [ generatedPassword, setGeneratedPassword ] = useState('');

  const handlePasswordLength = (event) => setPasswordLength(parseInt(event.target.value));
  const handleCheckboxLower = (event) => setIncludeLowercase(event.target.checked);
  const handleCheckboxUpper = (event) => setIncludeUppercase(event.target.checked);
  const handleCheckboxNumbers = (event) => setIncludeNumbers(event.target.checked);
  const handleCheckboxSymbols = (event) => setIncludeSymbols(event.target.checked);

  // Returns array of numbers in a given range
  const arrayFromLowToHigh = (low, high) => {
    const numbersArray = [];
    for (let i = low; i <= high; i++ ) {
      numbersArray.push(i);
    }
    return numbersArray;
  }

  // https://theasciicode.com.ar/
  // Arrays of ASCII character codes
  const lowercaseCharCodes = arrayFromLowToHigh(97, 122);
  const uppercaseCharCodes = arrayFromLowToHigh(65, 90);
  const numberCharCodes = arrayFromLowToHigh(48, 57);
  const symbolCharCodes = arrayFromLowToHigh(33, 47)
    .concat(arrayFromLowToHigh(58, 64))
    .concat(arrayFromLowToHigh(91, 96))
    .concat(arrayFromLowToHigh(123, 126));

  // Password generation logic
  const generatePassword = (event) => {
    event.preventDefault();
    let charCodesPool = [];
    // Adding charCodes to the pool dependingon user choices
    if (includeLowercase) charCodesPool = charCodesPool.concat(lowercaseCharCodes);
    if (includeUppercase) charCodesPool = charCodesPool.concat(uppercaseCharCodes);
    if (includeNumbers) charCodesPool = charCodesPool.concat(numberCharCodes);
    if (includeSymbols) charCodesPool = charCodesPool.concat(symbolCharCodes);

    let passwordChars = [];
    // Adding random characters to the passwordChars array
    for (let i = 0; i < passwordLength; i++) {
      let randomNumber = Math.floor(Math.random() * charCodesPool.length);
      let charCode = charCodesPool[randomNumber];
      passwordChars.push(String.fromCharCode(charCode));
    }

    // Joining the passwordChars array as string to setGeneratedPassword
    setGeneratedPassword(passwordChars.join(''));
  }

  const isButtonDisabled = (!includeLowercase && !includeUppercase && !includeNumbers && !includeSymbols);

  return (
    <main className="main">
      <form className="main__form container" onSubmit={generatePassword}>
        <div className="main__form-block main__form-block--password">
          <h3 className="main__form-block-title">Generated Password</h3>
          {(generatedPassword)
          ? (
            <div className="main__form-block-password">
              <input
                className="main__form-block-password-text"
                type="text"
                readOnly
                value={generatedPassword}
              />
            </div>
          )
          : (
            <div className="main__form-block-password">
              <input
                className="main__form-block-password-text main__form-block-password-text--none"
                type="text"
                value="Password will be displayed here"
                readOnly
              />
            </div>
          )}
        </div>
        <div className="main__form-block main__form-block--length">
          <h3 className="main__form-block-title">Length: {passwordLength}</h3>
          <div className="main__form-block-input main__form-block-input--length">
            <span className="main__form-block-input-span">8</span>
            <input className="main__form-block-input-field main__form-block-input-field--length" type="range" name="passwordLength" id="passwordLength" min="8" max="24" value={passwordLength} onChange={handlePasswordLength}/>
            <span className="main__form-block-input-span">24</span>
          </div>
        </div>
        <div className="main__form-block main__form-block--settings">
          <h3 className="main__form-block-title">Settings</h3>
          <div className="main__form-block-input">
            <label className="main__form-block-input-label" htmlFor="includeLowercase">Include lowercase</label>
            <input className="main__form-block-input-field" type="checkbox" name="includeLowercase" id="includeLowercase" checked={includeLowercase} onChange={handleCheckboxLower}/>
          </div>
          <div className="main__form-block-input">
            <label className="main__form-block-input-label" htmlFor="includeUppercase">Include uppercase</label>
            <input className="main__form-block-input-field" type="checkbox" name="includeUppercase" id="includeUppercase" checked={includeUppercase} onChange={handleCheckboxUpper}/>
          </div>
          <div className="main__form-block-input">
            <label className="main__form-block-input-label" htmlFor="includeNumbers">Include numbers</label>
            <input className="main__form-block-input-field" type="checkbox" name="includeNumbers" id="includeNumbers" checked={includeNumbers} onChange={handleCheckboxNumbers}/>
          </div>
          <div className="main__form-block-input">
            <label className="main__form-block-input-label" htmlFor="includeSymbols">Include symbols</label>
            <input className="main__form-block-input-field" type="checkbox" name="includeSymbols" id="includeSymbols" checked={includeSymbols} onChange={handleCheckboxSymbols}/>
          </div>
        </div>
        <div className="main__form-block main__form-block--buttons">
          <button className="main__form-block-button main__form-block-button--submit" type="submit" disabled={isButtonDisabled}>Generate Password</button>
          <CopyToClipboard
            text={generatedPassword}
            type="button"
            >
            <button className="main__form-block-button" disabled={!(generatedPassword)}>Copy</button>
          </CopyToClipboard>
        </div>        
      </form>
    </main>
  )
}

export default Main
