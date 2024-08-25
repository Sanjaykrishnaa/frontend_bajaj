import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleSelectChange = (event) => {
    const { options } = event.target;
    const selected = Array.from(options)
      .filter(option => option.selected)
      .map(option => option.value);
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
      'Highest lowercase alphabet': highest_lowercase_alphabet
    };

    return (
      <div>
        {selectedOptions.map(option => (
          <div key={option}>
            <h3>{option}</h3>
            <pre>{JSON.stringify(data[option], null, 2)}</pre>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="App">
      <h1>Bajaj Frontend</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Input JSON:
          <textarea
            value={input}
            onChange={handleInputChange}
            rows="6"
            cols="30"
            placeholder='{"data": ["A", "C", "z"]}'
            required
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
      <br />
      <label>
        Select options to display:
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
