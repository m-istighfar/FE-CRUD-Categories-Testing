import { render, screen } from '@testing-library/react';
import RegistrationTemplate from '.';
import { BrowserRouter as Router } from 'react-router-dom';

describe('RegistrationTemplate', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders the title correctly', () => {
        render(
            <Router>
                <RegistrationTemplate />
            </Router>,
        );
        const title = screen.getByText('Create your account');
        expect(title).toBeDefined();
    });

    test('renders the logo correctly', () => {
        render(
            <Router>
                <RegistrationTemplate />
            </Router>,
        );
        const logo = screen.getByAltText('logo');
        expect(logo).toBeDefined();
    });
});
