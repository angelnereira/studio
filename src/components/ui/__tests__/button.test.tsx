"use client";

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Button } from '../button';

describe('Button Component', () => {
  it('debería renderizar el botón con el texto correcto', () => {
    render(<Button>Click Me</Button>);
    
    const buttonElement = screen.getByRole('button', { name: /Click Me/i });
    
    expect(buttonElement).toBeInTheDocument();
  });
});
