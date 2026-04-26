import React from 'react';
import './Loader.css';

export default function Loader({ text = "Loading...", fullScreen = false }) {
  return (
    <div className={`vault-loader-container ${fullScreen ? 'full-screen' : ''}`}>
      <div className="vault-loader">
        <div className="vault-loader-ring ring-1"></div>
        <div className="vault-loader-ring ring-2"></div>
        <div className="vault-loader-ring ring-3"></div>
        <div className="vault-loader-core"></div>
      </div>
      {text && <div className="vault-loader-text">{text}</div>}
    </div>
  );
}
