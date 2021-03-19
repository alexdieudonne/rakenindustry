import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Acceuil from './components/Acceuil';
// import App from './components/Acceuil'

test('renders learn react link', () => {
  render(<Acceuil />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
