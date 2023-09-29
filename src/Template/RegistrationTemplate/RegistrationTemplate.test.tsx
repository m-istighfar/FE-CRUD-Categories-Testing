import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import RegistrationTemplate from '.';
import { BrowserRouter as Router, useNavigate } from 'react-router-dom';

global.fetch = jest.fn().mockResolvedValue({
    json: async () => ({ data: { id: 'mockedId', name: 'John', email: 'john@example.com' } }),
});

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

describe('RegistrationTemplate', () => {
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

    test('renders registration form and submits new user', async () => {
        const navigateMock = jest.fn();
        (useNavigate as jest.Mock).mockReturnValue(navigateMock);

        render(
            <Router>
                <RegistrationTemplate />
            </Router>,
        );

        act(() => {
            fireEvent.change(screen.getByPlaceholderText('name@company.com'), {
                target: { value: 'test@email.com' },
            });
            fireEvent.change(screen.getByPlaceholderText('••••••••'), {
                target: { value: 'password' },
            });
            fireEvent.change(screen.getByPlaceholderText('Your name'), {
                target: { value: 'John' },
            });

            fireEvent.click(screen.getByText('Register'));
        });

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith(
                'https://mock-api.arikmpt.com/api/user/register',
                expect.any(Object),
            );
            expect(navigateMock).toHaveBeenCalledWith('/login');
        });
    });
});
