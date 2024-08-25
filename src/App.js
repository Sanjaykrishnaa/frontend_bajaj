import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Make sure this file exists and is correctly linked

const App = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleSelectChange = (event) => {
    const selected = Array.from(event.target.selectedOptions, option => option.value);
    setSelectedOptions(selected);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const parsedInput = JSON.parse(input);
      const res = await axios.post('https://bajaj-finserve.onrender.com/bfhl', parsedInput);
      setResponse(res.data);
    } catch (error) {
      console.error('Error:', error);
      setResponse({ error: 'Invalid input or network error' });
    }
  };

  const renderResponse = () => {
    if (!response) return null;

    const { numbers, alphabets, highest_lowercase_alphabet } = response;
    const data = {
      Numbers: numbers,
      Alphabets: alphabets,
      'Highest lowercase alphabet': highest_lowercase_alphabet,
    };

    return (
      <div>
        <h3>Filtered Response</h3>
        {selectedOptions.map((option, index) => (
          <p key={index}>
            {option}: {data[option]?.join(', ') || 'No data available'}
          </p>
        ))}
      </div>
    );
  };

  return (
    <div className="App">
      <h1>Bajaj Frontend</h1>
      <form onSubmit={handleSubmit}>
        <label>
          API Input:
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder='{"data": ["A", "C", "z"]}'
            required
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
      <br />
      <label>
        Multi Filter:
        <select multiple={true} onChange={handleSelectChange}>
          <option value="Numbers">Numbers</option>
          <option value="Alphabets">Alphabets</option>
          <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
        </select>
      </label>
      <div>
        {renderResponse()}
      </div>
    </div>
  );
};

export default App;
