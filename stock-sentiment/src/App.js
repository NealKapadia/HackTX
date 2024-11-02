import React, { useState } from 'react';
import './App.css';

function App() {
  const [headline, setHeadline] = useState('');
  const [sentiment, setSentiment] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setHeadline(e.target.value);
  };

  const analyzeHeadline = async () => {
    setLoading(true);
    try {
      // Placeholder for API call
      const response = await fetch('https://api.example.com/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ headline }),
      });
      const data = await response.json();
      setSentiment(data.sentiment); // Assuming response has { sentiment: "bullish" or "bearish" }
    } catch (error) {
      console.error('Error analyzing headline:', error);
      setSentiment('Error analyzing headline');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Stock Sentiment Analysis</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter news headline"
          value={headline}
          onChange={handleInputChange}
        />
        <button onClick={analyzeHeadline} disabled={!headline || loading}>
          {loading ? 'Analyzing...' : 'Analyze'}
        </button>
      </div>
      {sentiment && (
        <div className={`sentiment-result ${sentiment}`}>
          <p>The sentiment is <strong>{sentiment}</strong>.</p>
        </div>
      )}
    </div>
  );
}

export default App;
