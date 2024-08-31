
import axios from 'axios';
import Papa from 'papaparse';
import React, { useEffect, useState } from 'react';
import './Dashboard.css';

function Dashboard() {
  const [data, setData] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [creditStatus, setCreditStatus] = useState({});

  useEffect(() => {
    console.log('Dashboard page loaded');

    fetch('/nuqi-inventry-CSV - Sheet1.csv')
      .then((response) => response.text())
      .then((text) => {
        Papa.parse(text, {
          header: true,
          complete: (results) => {
            setData(results.data);
          },
        });
      });
  }, []);

  const handleCreditToWallet = async (userID, amountCredited, rowIndex) => {
    const confirmed = window.confirm('Are you sure you want to credit this amount to the wallet?');
    if (!confirmed) return;

    if (!userID) {
      setMessage('Error: User ID not Found');
      return;
    }

    const amount = parseFloat(amountCredited.replace(/,/g, ''));
    if (isNaN(amount)) {
      setMessage('Error: Invalid amount');
      return;
    }

    const config = {
      method: 'POST',
      url: `http://150.129.118.10:8080/user/${userID}/transaction/wallet`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        amount,
        type: "add",
        transaction_type: "wallet",
        status: "success"
      }
    };

    try {
      setLoading(true);
      const response = await axios(config);
      if (response.status === 200) {
        setMessage('Credit to Wallet successful');
        setCreditStatus(prevStatus => ({ ...prevStatus, [rowIndex]: 'success' }));
      } else {
        setMessage('Error crediting to wallet');
        setCreditStatus(prevStatus => ({ ...prevStatus, [rowIndex]: 'error' }));
      }
      console.log('Credit successful:', response.data);
    } catch (error) {
      setMessage('Error crediting to wallet');
      console.error('Error crediting to wallet:', error.response ? error.response.data : error.message);
      setCreditStatus(prevStatus => ({ ...prevStatus, [rowIndex]: 'error' }));
    } finally {
      setLoading(false);
    }
  };

  const handleReject = (rowIndex) => {
    const confirmed = window.confirm('Are you sure you want to reject this action?');
    if (!confirmed) return;

    setCreditStatus(prevStatus => ({ ...prevStatus, [rowIndex]: 'rejected' }));
    setMessage('Action rejected');
  };

  return (
    <div className="dashboard-container">
      <div className="table-container">
        {message && <div className={`message-box ${message.includes('Error') || message.includes('rejected') ? 'error' : 'success'}`}>{message}</div>}
        {loading && <div className="loading">Processing...</div>} 
        <table>
          <thead>
            <tr>
              {data.length > 0 && Object.keys(data[0]).map((key, index) => (
                <th key={index}>{key}</th>
              ))}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {Object.values(row).map((value, colIndex) => (
                  <td key={colIndex}>{value}</td>
                ))}
                <td className="actions-cell">
                  {creditStatus[rowIndex] === 'success' ? (
                    <span className="tick-mark">✔️</span>
                  ) : creditStatus[rowIndex] === 'rejected' || parseFloat(row['Amount Credited'].replace(/,/g, '')) === 0 ? (
                    <span className="cross-mark">❌ Rejected </span>
                  ) : (
                    <>
                      <button
                        className="accept-button"
                        onClick={() => handleCreditToWallet(row['Description'], row['Amount Credited'], rowIndex)}
                        disabled={loading}
                      >
                        Credit to Wallet
                      </button>
                      <button
                        className="reject-button"
                        onClick={() => handleReject(rowIndex)}
                        disabled={loading}
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;



