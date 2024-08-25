import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';

const App = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResponse(null);

    try {
      // Validate JSON
      const parsedData = JSON.parse(jsonInput);
      if (!parsedData.data) {
        throw new Error('Invalid JSON format');
      }

      // Make API request
      const result = await axios.post('https://bajaj-finserve.onrender.com/bfhl', parsedData);
      setResponse(result.data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSelectChange = (selected) => {
    setSelectedOptions(selected || []);
  };

  const renderResponse = () => {
    if (!response) return null;

    const options = selectedOptions.map(option => option.value);
    const data = {
      alphabets: response.alphabets,
      numbers: response.numbers,
      highest_lowercase_alphabet: response.highest_lowercase_alphabet,
    };

    const filteredResponse = Object.keys(data)
      .filter(key => options.includes(key))
      .reduce((obj, key) => {
        obj[key] = data[key];
        return obj;
      }, {});

    return (
      <div>
        <h3>Response:</h3>
        <pre>{JSON.stringify(filteredResponse, null, 2)}</pre>
      </div>
    );
  };

  return (
    <div className="App">
      <h1>Roll Number: 21BRS1283</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          rows="10"
          cols="50"
          placeholder='Enter JSON here...'
        />
        <br />
        <button type="submit">Submit</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <Select
        isMulti
        options={[
          { value: 'alphabets', label: 'Alphabets' },
          { value: 'numbers', label: 'Numbers' },
          { value: 'highest_lowercase_alphabet', label: 'Highest Lowercase Alphabet' }
        ]}
        onChange={handleSelectChange}
      />

      {renderResponse()}
    </div>
  );
};

export default App;
