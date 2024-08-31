

// import axios from 'axios';
// import Papa from 'papaparse';
// import React, { useEffect, useState } from 'react';
// import './Dashboard.css';

// function Dashboard() {
//   const [data, setData] = useState([]);

//   // Fetch and parse CSV data
//   useEffect(() => {
//     fetch('/nuqi-inventry-CSV - Sheet1.csv')
//       .then((response) => response.text())
//       .then((text) => {
//         Papa.parse(text, {
//           header: true,
//           complete: (results) => {
//             setData(results.data);
//           },
//         });
//       });
//   }, []);

//   // Handle Credit to Wallet button click
//   const handleCreditToWallet = (accountNumber, amountCredited) => {
//     if (!accountNumber) {
//       console.error('Account number is undefined');
//       return;
//     }

//     // Convert amount to a number
//     const amount = parseFloat(amountCredited.replace(/,/g, ''));

//     // Axios configuration for the PUT request
//     const config = {
//       method: 'put',
//       url:`http://150.129.118.10:3000/user/17`,
//       headers: { 
//         'Content-Type': 'application/json', 
//         'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcsImlhdCI6MTcyNDE0NzI1NSwiZXhwIjoxNzMxOTIzMjU1fQ.u78RekbUOzwT5iuD72QIzJ-Xk4sf7i3lQxRD8INs7Cs'  // Replace <your-token> with a valid token if required
//       },
//       data: JSON.stringify({ amount })
//     };

//     // Make the Axios request to credit the amount to the wallet
//     axios(config)
//       .then((response) => {
//         console.log('Credit successful:', response.data);
//       })
//       .catch((error) => {
//         console.error('Error crediting to wallet:', error);
//       });
//   };

//   return (
//     <div className="dashboard-container">
//       <div className="table-container">
//         <table>
//           <thead>
//             <tr>
//               {data.length > 0 && Object.keys(data[0]).map((key, index) => (
//                 <th key={index}>{key}</th>
//               ))}
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((row, rowIndex) => (
//               <tr key={rowIndex}>
//                 {Object.values(row).map((value, colIndex) => (
//                   <td key={colIndex}>{value}</td>
//                 ))}
//                 <td className="actions-cell">
//                   <button 
//                     className="accept-button" 
//                     onClick={() => handleCreditToWallet(row['Account Number'], row['Amount Credited'])}
//                   >
//                     Credit to Wallet
//                   </button>
//                   <button className="reject-button">Reject</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;







import axios from 'axios';
import Papa from 'papaparse';
import React, { useEffect, useState } from 'react';
import './Dashboard.css';

function Dashboard() {
  const [data, setData] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch and parse CSV data
  useEffect(() => {
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

  // Handle Credit to Wallet button click
  const handleCreditToWallet = async (accountNumber, amountCredited) => {
    if (!accountNumber) {
      setMessage('Error: Account number is undefined');
      return;
    }

    // Convert amount to a number
    const amount = parseFloat(amountCredited.replace(/,/g, ''));
    if (isNaN(amount)) {
      setMessage('Error: Invalid amount');
      return;
    }

    // Axios configuration for the PUT request
    const config = {
      method: 'put',
      url: `http://150.129.118.10:3000/user/17`,
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcsImlhdCI6MTcyNDE0NzI1NSwiZXhwIjoxNzMxOTIzMjU1fQ.u78RekbUOzwT5iuD72QIzJ-Xk4sf7i3lQxRD8INs7Cs' 
      },
      data: JSON.stringify({ amount })
    };

    try {
      setLoading(true); // Start loading
      const response = await axios(config);
      setMessage('Credit to Wallet successful');
      console.log('Credit successful:', response.data);
    } catch (error) {
      setMessage('Error crediting to wallet');
      console.error('Error crediting to wallet:', error.response ? error.response.data : error.message);
    } finally {
      setLoading(false); // Stop loading
    }
  };


  return (
    <div className="dashboard-container">
      <div className="table-container">
        {message && <div className="message-box">{message}</div>} {/* Display success/error message */}
        {loading && <div className="loading">Processing...</div>} {/* Display loading message */}
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
                  <button 
                    className="accept-button" 
                    onClick={() => handleCreditToWallet(row['Account Number'], row['Amount Credited'])}
                    disabled={loading} // Disable button during loading
                  >
                    Credit to Wallet
                  </button>
                  <button className="reject-button">Reject</button>
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


