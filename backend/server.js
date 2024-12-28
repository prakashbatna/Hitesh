const express = require('express');
const bodyParser = require('body-parser');
const Sentiment = require('sentiment');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const sentiment = new Sentiment();

app.post('/api/feedback', async (req, res) => {
  const { pitchText } = req.body;

  const sentimentResult = sentiment.analyze(pitchText);
  console.log(sentimentResult); 

  let clarity = 'Clear';
  let confidence = 'High';

  if (sentimentResult.score < -3 || sentimentResult.comparative < -0.3) {
    clarity = 'Unclear';
    confidence = 'Low';
  } else if (sentimentResult.score < 0 || sentimentResult.comparative < 0) {
    clarity = 'Average';
    confidence = 'Medium';
  } else if (sentimentResult.score >= 0 || sentimentResult.comparative >= 0.3) {
    clarity = 'Clear';
    confidence = 'High';
  }

  try {
    const nlpResponse = await axios.post(
      'https://api-inference.huggingface.co/models/distilbert-base-uncased-finetuned-sst-2-english',
      { inputs: pitchText },
      {
        headers: {
          'Authorization': 'Bearer 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',
        },
      }
    );

    console.log('Hugging Face response:', nlpResponse.data);

    const nlpAnalysis = nlpResponse.data;

    const feedback = {
      sentimentScore: sentimentResult.score,
      sentimentAnalysis: sentimentResult.comparative > 0 ? 'Positive' : 'Negative',
      clarity,
      confidence,
      nlpAnalysis,
    };

    res.status(200).json(feedback);
  } catch (error) {
    console.error('Error in NLP API:', error.response ? error.response.data : error.message);
    res.status(500).json({ message: 'Error processing NLP request' });
  }
});

app.listen(8000, () => {
  console.log('Server running on port 8000');
});
