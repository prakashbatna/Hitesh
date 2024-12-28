AI-Powered Sales Coach

This is an AI-powered sales pitch feedback system built with Node.js, Express, and Hugging Face's sentiment analysis model. It uses basic sentiment analysis to evaluate the sentiment of a sales pitch, determines its clarity and confidence, and provides detailed feedback to the user.

Features

• Sentiment Analysis: Uses the sentiment library to determine the sentiment score of the sales pitch (positive/negative).

• Clarity and Confidence: Provides feedback on the clarity and confidence of the pitch based on sentiment scores.

• Hugging Face NLP Model: Calls the Hugging Face API to perform advanced sentiment analysis with a fine-tuned model (distilbert-base-uncased-finetuned-sst-2-english).

• JSON Response: Returns feedback in a structured JSON format including sentiment, clarity, confidence, and NLP analysis.
