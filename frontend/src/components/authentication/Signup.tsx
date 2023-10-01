import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

const Signup: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('Your signup API URL', {
        username: username,
        password: password
      });

      if (response.data.success) {
        navigate('/login'); // Redirect to login page after successful signup
      } else {
        // Handle signup error
      }
    } catch (error) {
      // Handle error
    }
  }

  return (
    <form onSubmit={handleSignup}>
      <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <button type="submit">Sign Up</button>
    </form>
  )
}

export default Signup;