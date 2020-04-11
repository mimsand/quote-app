//import React from 'react';
import React, { useState, useEffect } from 'react';
import quoteStop from './quote_stop.png';
import quoteStart from './quote_start.png';
import './App.css';

//export const MyComponent = () => {
//  const { apiUrl } = window['runConfig'];
//  return (
//    <div>Runtime config apiUrl: {apiUrl}</div>
//  )
//}

function App() {
  const [apiData, setApiData] = useState([]);
  const { apiUrl } = window['runConfig'];

  useEffect(() => {
    fetch(apiUrl, {mode: 'cors'}).then(res => res.json()).then(data => {
      setApiData([data.quote,data.author,data.sentiment,data.serverip]);
    });
  }, []);


  return (
    <div className="App">
      <header className="App-header">
	<p>
          <img src={quoteStart} className="img-quote" alt="quote" />
	  <font className="font-quote"> 
	  {apiData[0] ? (
	     <font className="font-quote">{apiData[0]}</font>
	  ) : (
	     <font className="font-quote-err">Everything fails all the time. NO DATA FROM BACKEND!&nbsp; ({apiUrl})</font>
	  )}
	  </font> 
          <font className="font-author">&nbsp;-&nbsp;{apiData[1]}</font>
          <img src={quoteStop} className="img-quote" alt="quote" />
	</p>
	<p className="p-sentiment"> Sentiment:&nbsp; {apiData[2]}</p>
	<p className="p-ip"> Backend Server IP:&nbsp; {apiData[3]}</p>
      </header>
    </div>
  );
}

export default App;
