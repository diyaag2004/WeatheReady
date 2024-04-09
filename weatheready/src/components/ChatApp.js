import React, { useState } from 'react';
import './Chat.css';
import loader from './loader.gif';
function ChatApp() {
  const [chatHistory, setChatHistory] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);

  async function sendMessage(userInput) {
    try {
      setLoading(true);
      const response = await fetch('https://chatassitantserver.onrender.com/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userInput }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const botMessage = data.response;

      // Update chat history with user and bot messages
      setChatHistory(prevHistory => [
        ...prevHistory,
        { type: 'user', message: userInput },
        { type: 'bot', message: botMessage }
      ]);

      // Scroll to the bottom of the chat history
      const chatHistoryContainer = document.getElementById('chat-history');
      chatHistoryContainer.scrollTop = chatHistoryContainer.scrollHeight;
    } catch (error) {
      console.error('Error:', error);
      // Handle errors gracefully, e.g., display an error message to the user
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent form submission
    sendMessage(userInput);
    setUserInput(''); // Clear input field
  };

  return (
    <div id="chat-container">
      <h4>Dimita, Your Personal<br /> Health Assistant!🌞</h4><br />
      <div id="chat-history">
        {chatHistory.map((message, index) => (
          <div key={index} className={message.type + '-message'}>
            {message.message}
          </div>
        ))}
      </div>
      <form id="chat-form" onSubmit={handleSubmit}>
        <input
          type="text"
          id="user-input"
          placeholder="Enter your message"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Sending...' : 'Send'}
        </button>
      </form>
      <div id="loader" style={{ display: loading ? 'block' : 'none' }}>
        <img src={loader} width="150px" alt="Loahii..." />
      </div>
    </div>
  );
}

export default ChatApp;
