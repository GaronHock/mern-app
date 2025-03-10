// src/components/Home.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h2>Welcome to the Home Page!</h2>
      <p>This is your application's landing page.</p>
      <p>
        <Link to="/login">Login</Link> or <Link to="/register">Register</Link>{' '}
        to get started.
      </p>
    </div>
  );
};

export default Home;
