import React, { useState, useRef } from 'react';
import './App.css';

function App() {
  const [prompt, setPrompt] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Use a ref to store the interval ID
  const pollIntervalRef = useRef(null);

  // Function to check the status of the video generation
  const checkStatus = async (taskId) => {
    try {
      const response = await fetch(`/api/status/${taskId}`);
      const data = await response.json();

      if (data.status === 'completed') {
        clearInterval(pollIntervalRef.current); // Stop polling
        setVideoUrl(data.videoUrl);
        setIsLoading(false);
      } else if (data.status === 'failed') {
        clearInterval(pollIntervalRef.current); // Stop polling
        setError('Video generation failed. Please try again.');
        setIsLoading(false);
      }
      // If status is 'processing', we do nothing and let the interval continue
    } catch (err) {
      clearInterval(pollIntervalRef.current); // Stop polling on error
      setError('An error occurred while checking status.');
      setIsLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setVideoUrl('');
    setIsLoading(true);

    // Clear any existing interval
    if (pollIntervalRef.current) {
      clearInterval(pollIntervalRef.current);
    }

    try {
      // 1. Start the generation process
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error('Failed to start generation.');
      }

      const data = await response.json();
      const { taskId } = data;

      // 2. Start polling for the result
      pollIntervalRef.current = setInterval(() => {
        checkStatus(taskId);
      }, 5000); // Poll every 5 seconds

    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>AI Video Generator</h1>
        <p>Enter a prompt to create a short video.</p>
      </header>
      <main>
        <form onSubmit={handleSubmit} className="prompt-form">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., a corgi riding a skateboard in a futuristic city"
            required
            disabled={isLoading}
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Generating...' : 'Generate'}
          </button>
        </form>

        {isLoading && (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Generating video... This can take a minute or two.</p>
          </div>
        )}

        {error && <p className="error-message">{error}</p>}

        {videoUrl && (
          <div className="video-container">
            <h2>Your Generated Video:</h2>
            <video src={videoUrl} controls autoPlay loop />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;