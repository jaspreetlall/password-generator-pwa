import React, { useState } from 'react'

function Main() {

  const [ passwordLength, setPasswordLength ] = useState(20);
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
  const symbolCharCodes = arrayFromLowToHigh(33, 47).concat(arrayFromLowToHigh(58, 64)).concat(arrayFromLowToHigh(91, 96)).concat(arrayFromLowToHigh(123, 126));

  const generatePassword = (event) => {
    event.preventDefault();
    let charCodesPool = [];
    if (includeLowercase) charCodesPool = charCodesPool.concat(lowercaseCharCodes);
    if (includeUppercase) charCodesPool = charCodesPool.concat(uppercaseCharCodes);
    if (includeNumbers) charCodesPool = charCodesPool.concat(numberCharCodes);
    if (includeSymbols) charCodesPool = charCodesPool.concat(symbolCharCodes);

    let passwordChars = [];
    for (let i = 0; i < passwordLength; i++) {
      let randomNumber = Math.floor(Math.random() * charCodesPool.length);
      let charCode = charCodesPool[randomNumber];
      passwordChars.push(String.fromCharCode(charCode));
    }

    setGeneratedPassword(passwordChars.join(''));
  }

  const isButtonDisabled = (!includeLowercase && !includeUppercase && !includeNumbers && !includeSymbols);

  return (
    <main>
      <h2>Include</h2>
      <form onSubmit={generatePassword}>
        <div>
          <label htmlFor="passwordLength">Password Length: {passwordLength}</label>
          <input type="range" name="passwordLength" id="passwordLength" min="8" max="24" value={passwordLength} onChange={handlePasswordLength}/>
        </div>
        <div>
          <label htmlFor="includeLowercase">Lowercase</label>
          <input type="checkbox" name="includeLowercase" id="includeLowercase" checked={includeLowercase} onChange={handleCheckboxLower}/>
        </div>
        <div>
          <label htmlFor="includeUppercase">Uppercase</label>
          <input type="checkbox" name="includeUppercase" id="includeUppercase" checked={includeUppercase} onChange={handleCheckboxUpper}/>
        </div>
        <div>
          <label htmlFor="includeNumbers">Numbers</label>
          <input type="checkbox" name="includeNumbers" id="includeNumbers" checked={includeNumbers} onChange={handleCheckboxNumbers}/>
        </div>
        <div>
          <label htmlFor="includeSymbols">Symbols</label>
          <input type="checkbox" name="includeSymbols" id="includeSymbols" checked={includeSymbols} onChange={handleCheckboxSymbols}/>
        </div>
        <div>
          <span>{ generatedPassword ? generatedPassword : "Password will be displayed here" }
          </span>
        </div>
        <div>
          <button type="submit" disabled={isButtonDisabled}>Generate Password</button>
          <button type="reset">Reset</button>
        </div>
      </form>
    </main>
  )
}

export default Main
