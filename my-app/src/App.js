import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [pitchText, setPitchText] = useState('');
  const [feedback, setFeedback] = useState(null);
  
  const handlePitchChange = (e) => {
    setPitchText(e.target.value);
  };

  // Submit pitch for analysis
  const submitPitch = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/feedback', { pitchText });
      setFeedback(response.data);  
      setPitchText(''); 
    } catch (error) {
      console.error('Error submitting pitch:', error);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1>AI-Powered Sales Coach</h1>

        {feedback && (
          <div className="feedback-box">
            <h2>Feedback</h2>
            <p><strong>Sentiment:</strong> {feedback.sentimentAnalysis} (Score: {feedback.sentimentScore})</p>
            <p><strong>Clarity:</strong> {feedback.clarity}</p>
            <p><strong>Confidence:</strong> {feedback.confidence}</p>
            
            <h3>NLP Sentiment Analysis (JSON Format)</h3>
            <pre>{JSON.stringify(feedback.nlpAnalysis, null, 2)}</pre> {/* Display JSON */}
          </div>
        )}
        
        <textarea
          value={pitchText}
          onChange={handlePitchChange}
          placeholder="Type your sales pitch here..."
          rows="8"
        />
        
        <button onClick={submitPitch}>Analyze Pitch</button>
      </div>
    </div>
  );
}

export default App;
