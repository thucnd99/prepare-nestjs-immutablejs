import React from 'react';
import { render, screen } from '@testing-library/react'
import LoginForm from '../pages/login/Login';

describe('Login', () => {
    test('renders login', () => {
        render(<LoginForm />)
        
    })
})