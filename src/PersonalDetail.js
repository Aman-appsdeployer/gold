// import React, { useState } from 'react';
// import './PersonalDetail.css'; // Create this CSS file for styling

// function PersonalDetail() {
//   const [form, setForm] = useState({
//     fullName: '',
//     email: '',
//     dateOfBirth: '',
//     address: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prevForm) => ({ ...prevForm, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Process form data (e.g., send to server)
//     console.log('Form submitted:', form);
//   };

//   return (
//     <div className="personal-detail-container">
//       <div className="personal-detail-box">
//         <h2>PERSONAL DETAIL</h2>
//         <p>Let us know about yourself.</p>
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label>Full Name</label>
//             <input
//               type="text"
//               name="fullName"
//               value={form.fullName}
//               onChange={handleChange}
//               placeholder="Enter your full name"
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label>Email</label>
//             <input
//               type="email"
//               name="email"
//               value={form.email}
//               onChange={handleChange}
//               placeholder="Enter your email id"
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label>Date of Birth</label>
//             <input
//               type="text"
//               name="dateOfBirth"
//               value={form.dateOfBirth}
//               onChange={handleChange}
//               placeholder="DD/MM/YYYY"
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label>Address</label>
//             <input
//               type="text"
//               name="address"
//               value={form.address}
//               onChange={handleChange}
//               placeholder="Enter your full address"
//               required
//             />
//           </div>
//           <button type="submit" className="submit-button">Proceed</button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default PersonalDetail;
