import React, { useState } from 'react';
import axios from 'axios';

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('Your Login API URL', {
        username: username,
        password: password
      });

      if (response.data.success) {
        // Handle successful login
      } else {
        // Handle login error
      }
    } catch (error) {
      // Handle error
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <button type="submit">Log In</button>
    </form>
  )
}

export default Login;