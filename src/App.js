import React, { useState } from 'react';
import axios from 'axios';

function App() {
  // States for encryption
  const [dataToEncrypt, setDataToEncrypt] = useState('');
  const [appPublicKey, setAppPublicKey] = useState('');
  const [encryptedResult, setEncryptedResult] = useState(null);

  // States for decryption
  const [xEncryptedKey, setXEncryptedKey] = useState('');
  const [encryptedData, setEncryptedData] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [decryptedResult, setDecryptedResult] = useState(null);

  // Handle encryption
  const handleEncrypt = async () => {
    try {
      const response = await axios.post('http://localhost:3001/encrypt', {
        data: dataToEncrypt,
        appPublicKey,
      });
      setEncryptedResult(response.data);
    } catch (error) {
      alert('Encryption failed: ' + error.message);
    }
  };

  // Handle decryption
  const handleDecrypt = async () => {
    try {
      const response = await axios.post('http://localhost:3001/decrypt', {
        xEncryptedKey,
        encryptedData,
        privateKey,
      });
      setDecryptedResult(response.data.decryptedData);
    } catch (error) {
      alert('Decryption failed: ' + error.message);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Encryption/Decryption Utility</h1>
      <div style={{ display: 'flex', gap: '20px' }}>
        {/* Encryption Section */}
        <div style={{ flex: 1, border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
          <h2>Encryption</h2>
          <div>
            <label>Data to Encrypt:</label>
            <textarea
              value={dataToEncrypt}
              onChange={(e) => setDataToEncrypt(e.target.value)}
              style={{ width: '100%', height: '100px', marginBottom: '10px' }}
            />
          </div>
          <div>
            <label>App Public Key (PEM):</label>
            <textarea
              value={appPublicKey}
              onChange={(e) => setAppPublicKey(e.target.value)}
              style={{ width: '100%', height: '100px', marginBottom: '10px' }}
            />
          </div>
          <button onClick={handleEncrypt} style={{ marginBottom: '10px' }}>
            Encrypt
          </button>
          {encryptedResult && (
            <div>
              <h3>Encrypted Result:</h3>
              <pre
                style={{
                  whiteSpace: 'pre-wrap', // Wrap long text
                  wordWrap: 'break-word', // Break long words
                  border: '1px solid #ddd',
                  padding: '10px',
                  borderRadius: '5px',
                  backgroundColor: '#f9f9f9',
                }}
              >
                {JSON.stringify(encryptedResult, null, 2)}
              </pre>
            </div>
          )}
        </div>

        {/* Decryption Section */}
        <div style={{ flex: 1, border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
          <h2>Decryption</h2>
          <div>
            <label>xEncryptedKey:</label>
            <textarea
              value={xEncryptedKey}
              onChange={(e) => setXEncryptedKey(e.target.value)}
              style={{ width: '100%', height: '50px', marginBottom: '10px' }}
            />
          </div>
          <div>
            <label>Encrypted Data:</label>
            <textarea
              value={encryptedData}
              onChange={(e) => setEncryptedData(e.target.value)}
              style={{ width: '100%', height: '50px', marginBottom: '10px' }}
            />
          </div>
          <div>
            <label>Private Key (PEM):</label>
            <textarea
              value={privateKey}
              onChange={(e) => setPrivateKey(e.target.value)}
              style={{ width: '100%', height: '100px', marginBottom: '10px' }}
            />
          </div>
          <button onClick={handleDecrypt} style={{ marginBottom: '10px' }}>
            Decrypt
          </button>
          {decryptedResult && (
            <div>
              <h3>Decrypted Result:</h3>
              <pre
                style={{
                  whiteSpace: 'pre-wrap', // Wrap long text
                  wordWrap: 'break-word', // Break long words
                  border: '1px solid #ddd',
                  padding: '10px',
                  borderRadius: '5px',
                  backgroundColor: '#f9f9f9',
                }}
              >
                {decryptedResult}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
