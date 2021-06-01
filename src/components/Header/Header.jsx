import React from 'react';
import './Header.scss';
import AppLogo from '../../assets/logo/logo.png'

function Header() {
  return (
    <header className="header">
      <div className="header__block container">
        <a href="/" className="header__block-logo">
          <img className="header__block-logo-img" src={AppLogo} alt="App logo" />
        </a>
        <h1 className="header__block-title">Password Generator</h1>
      </div>
    </header> 
  )
}

export default Header
