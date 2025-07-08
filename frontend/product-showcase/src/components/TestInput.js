import React, { useState } from 'react';

const TestInput = () => {
  const [testValue, setTestValue] = useState('');

  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f0f0', marginBottom: '20px' }}>
      <h4>Test Input (Debug)</h4>
      <input
        type="text"
        value={testValue}
        onChange={(e) => {
          console.log('Test input changed:', e.target.value);
          setTestValue(e.target.value);
        }}
        placeholder="Type here to test if inputs work"
        style={{ 
          padding: '10px',
          fontSize: '16px',
          width: '100%',
          marginBottom: '10px'
        }}
      />
      <p>Current value: {testValue}</p>
    </div>
  );
};

export default TestInput;
