// import React, { useState } from 'react';

// const Auth = () => {
//   const [isLogin, setIsLogin] = useState(true);

//   const toggleAuthMode = () => {
//     setIsLogin(!isLogin);
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="text-2xl font-semibold">{isLogin ? 'Login' : 'Register'}</h3>
//           <button onClick={() => toggleAuthMode()} className="text-gray-700 hover:text-gray-900">&times;</button>
//         </div>
//         <form>
//           <div className="mb-4">
//             <label htmlFor="username" className="block text-gray-700">Username</label>
//             <input
//               type="text"
//               id="username"
//               name="username"
//               className="w-full p-2 border border-gray-300 rounded-lg"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="password" className="block text-gray-700">Password</label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               className="w-full p-2 border border-gray-300 rounded-lg"
//               required
//             />
//           </div>
//           <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition">
//             {isLogin ? 'Login' : 'Register'}
//           </button>
//         </form>
//         <p onClick={toggleAuthMode} className="text-center text-gray-600 mt-4 cursor-pointer">
//           {isLogin ? "Don't have an account? Register here" : 'Already have an account? Login here'}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Auth;
