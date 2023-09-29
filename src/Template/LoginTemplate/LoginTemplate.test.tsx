import { render, screen } from '@testing-library/react';
import LoginTemplate from '.';
import { BrowserRouter as Router } from 'react-router-dom';

describe('LoginTemplate', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders the title correctly', () => {
        render(
            <Router>
                <LoginTemplate />
            </Router>,
        );
        const title = screen.getByText('Sign in to your account');
        expect(title).toBeDefined();
    });

    test('renders the logo correctly', () => {
        render(
            <Router>
                <LoginTemplate />
            </Router>,
        );
        const logo = screen.getByAltText('logo');
        expect(logo).toBeDefined();
    });
});
