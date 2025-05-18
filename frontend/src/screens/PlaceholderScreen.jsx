import React from 'react';
import { Link } from 'react-router-dom';

function PlaceholderScreen({ title }) {
  return (
    <div className="placeholder-screen">
      <h1>{title}</h1>
      <p>This page is under construction.</p>
      <Link to="/">Back to Home</Link>
    </div>
  );
}

export default PlaceholderScreen;