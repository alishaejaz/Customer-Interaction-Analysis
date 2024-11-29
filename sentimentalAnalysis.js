// A simple sentiment analysis mockup (replace with a proper NLP model or API)
function analyzeSentiment(text) {
  // Simple keyword-based sentiment analysis (can be replaced with a more sophisticated model)
  const positiveWords = ['love', 'amazing', 'great', 'excellent', 'good'];
  const negativeWords = ['terrible', 'bad', 'hate', 'worst', 'poor'];

  const words = text.split(' ');
  let positiveCount = 0;
  let negativeCount = 0;

  words.forEach(word => {
    if (positiveWords.includes(word.toLowerCase())) {
      positiveCount++;
    } else if (negativeWords.includes(word.toLowerCase())) {
      negativeCount++;
    }
  });

  if (positiveCount > negativeCount) {
    return 'positive';
  } else if (negativeCount > positiveCount) {
    return 'negative';
  } else {
    return 'neutral';
  }
}

module.exports = { analyzeSentiment };
