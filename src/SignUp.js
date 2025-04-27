// import { useState } from 'react';
// import './App.css';

// function SignUp({ onLoginSuccess, onSwitchToLogin }) {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (email && password) {
//       onLoginSuccess(); // after signup, login directly
//     }
//   };

//   return (
//     <div className="auth-container">
//       <h2>Sign Up</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <button type="submit">Sign Up</button>
//       </form>
//       <p>Already have an account? <button onClick={onSwitchToLogin} className="switch-btn">Login</button></p>
//     </div>
//   );
// }

// export default SignUp;
