import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Import your CSS file for styling

const App = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOption, setSelectedOption] = useState('Numbers');

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
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
      'Highest lowercase alphabet': highest_lowercase_alphabet
    };

    return (
      <div>
        <h3>Filtered Response</h3>
        <p>
          {selectedOption}: {data[selectedOption]?.join(', ') || 'No data available'}
        </p>
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
        <select onChange={handleSelectChange}>
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
