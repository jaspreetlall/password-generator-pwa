import React from 'react';
import './Footer.scss';
import GitHubLogo from '../../assets/logo/contact-github.png';
import LinkedInLogo from '../../assets/logo/contact-linkedin.png';


function Footer() {
  return (
    <footer className="footer">
      <div className="footer__block container">
        <a className="footer__block-link footer__block-link--credit" href="https://freeicons.io/profile/823" target="_blank" rel="noreferrer noopener">App Icon by Muhammad Haq</a>
        <a className="footer__block-link" href="https://github.com/jaspreetlall/password-generator-pwa" target="_blank" rel="noreferrer noopener">
          <img className="footer__block-link-logo" src={GitHubLogo} alt="Github"/>
        </a>
        <a className="footer__block-link" href="https://linkedin.com/in/jaspreetlall" target="_blank" rel="noreferrer noopener">
          <img className="footer__block-link-logo" src={LinkedInLogo} alt="LinkedIn" />
        </a>
      </div>
    </footer>
  )
}

export default Footer
