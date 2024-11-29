const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { analyzeSentiment } = require('./sentimentAnalysis'); // A custom module for sentiment analysis

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Sample data for sentiment analysis (Replace with real data sources later)
const feedbackData = [
  { id: 1, message: "I love the product! It's amazing!" },
  { id: 2, message: "The service was terrible, I will never buy from here again." },
  { id: 3, message: "The product is okay, but it could be better." },
];

// Feedback Collection Route
app.post('/api/feedback', (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  // Save the feedback (you can use a database here instead of an in-memory array)
  const newFeedback = {
    id: feedbackData.length + 1,
    message: message,
  };

  feedbackData.push(newFeedback);

  res.status(201).json({ message: 'Feedback collected successfully', feedback: newFeedback });
});

// Keyword Extraction Route (placeholder logic)
app.post('/api/extract-keywords', (req, res) => {
  const { feedbackId } = req.body;
  const feedback = feedbackData.find(item => item.id === feedbackId);
  if (!feedback) {
    return res.status(404).json({ error: 'Feedback not found' });
  }

  // Simulating keyword extraction (implement a real extraction model here)
  const keywords = feedback.message.split(' ').filter(word => word.length > 3);
  res.json({ keywords });
});

// Sentiment Classification Route
app.post('/api/analyze-sentiment', (req, res) => {
  const { feedbackId } = req.body;
  const feedback = feedbackData.find(item => item.id === feedbackId);
  if (!feedback) {
    return res.status(404).json({ error: 'Feedback not found' });
  }

  // Analyze sentiment (e.g., using a sentiment analysis library or model)
  const sentiment = analyzeSentiment(feedback.message);

  res.json({ sentiment });
});

// Real-time Sentiment Monitoring (simplified example)
app.get('/api/real-time-sentiment', (req, res) => {
  const sentimentCounts = {
    positive: 0,
    neutral: 0,
    negative: 0,
  };

  feedbackData.forEach(feedback => {
    const sentiment = analyzeSentiment(feedback.message);
    sentimentCounts[sentiment]++;
  });

  res.json({ sentimentCounts });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
