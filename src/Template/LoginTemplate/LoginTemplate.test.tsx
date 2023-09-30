import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import LoginTemplate from '.';
import { BrowserRouter as Router } from 'react-router-dom';

global.fetch = jest.fn().mockResolvedValue({
    json: async () => ({ data: { token: 'mockedToken' } }),
});
const replaceMock = jest.fn();
Object.defineProperty(window, 'location', {
    value: {
        replace: replaceMock,
    },
    writable: true,
});

describe('LoginTemplate', () => {
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

    test('submits the form and set token in localStorage', async () => {
        const mockSetItem = jest.spyOn(Storage.prototype, 'setItem');
        render(
            <Router>
                <LoginTemplate />
            </Router>,
        );

        const email = screen.getByPlaceholderText('name@company.com');
        const password = screen.getByPlaceholderText('••••••••');
        const button = screen.getByText('Sign in');

        act(() => {
            fireEvent.change(email, { target: { value: 'test@email.com' } });
            fireEvent.change(password, { target: { value: 'password' } });
            fireEvent.submit(button);
        });

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith(
                'https://mock-api.arikmpt.com/api/user/login',
                expect.any(Object),
            );
            expect(mockSetItem).toHaveBeenCalledWith('token', 'mockedToken');
        });
    });
});
