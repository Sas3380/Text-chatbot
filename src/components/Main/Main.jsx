import React, { useContext } from 'react';
import './Main.css';
import { assets } from '../../assets/assets.js';
import { Context } from '../../Context/Context';
import { CopyToClipboard } from 'react-copy-to-clipboard';


const stripHtml = (html) => {
  const tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
};



const Main = () => {
  const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSent();
    }
  };

  return (
    <div className='main'>
      <div className='nav'>
        <p>Ali.bot</p>
        <img src={assets.user_icon} alt='User Icon' />
      </div>
      <div className='main-container'>
        { !showResult ? (
          <>
            <div className='greet'>
              <p><span>Hello, World</span></p>
              <p>How can I help you today?</p>
            </div>
          </>
        ) : (
          <div className='result'>
            <div className='result-title'>
              <img src={assets.user_icon} alt='User Icon' />
              <p>{recentPrompt}</p>
            </div>
            <div className='result-data'>
              {loading ? (
                <div className='loader'>
                  <div className='dot'></div>
                  <div className='dot'></div>
                  <div className='dot'></div>
                </div>
              ) : (
                <div className="response-wrapper">
                  <div
                    className="response-content"
                    dangerouslySetInnerHTML={{ __html: resultData }}
                  />
                  {resultData.includes('<code') && (
                    <CopyToClipboard text={stripHtml(resultData)}>
                      <button className="copy-button">
                        <img src={assets.copy_icon} alt="Copy" className="copy-icon" />
                      </button>
                    </CopyToClipboard>
                  )}
                </div>
              )}


            </div>
          </div>
        )}

        <div className='main-bottom'>
          <div className='search-box'>
            <input 
              onChange={(e) => setInput(e.target.value)} 
              onKeyDown={handleKeyDown}
              value={input} 
              type='text' 
              placeholder='Ask something...' 
            />
            <div>
              
              <img onClick={onSent}  src={assets.send_icon} alt='Send Icon' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
