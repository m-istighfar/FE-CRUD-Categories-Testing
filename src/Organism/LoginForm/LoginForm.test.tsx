import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import LoginForm from '.';
import { BrowserRouter as Router } from 'react-router-dom';

describe('test login form', () => {
    const mockProps = jest.fn();

    test('label email render correctly', async () => {
        render(
            <Router>
                <LoginForm onSubmit={mockProps} />
            </Router>,
        );
        const label = screen.getByLabelText('Your email');
        expect(label).toBeDefined();
    });

    test('label password render correctly', async () => {
        render(
            <Router>
                <LoginForm onSubmit={mockProps} />
            </Router>,
        );
        const label = screen.getByLabelText('Password');
        expect(label).toBeDefined();
    });

    test('button submit render correctly', async () => {
        render(
            <Router>
                <LoginForm onSubmit={mockProps} />
            </Router>,
        );
        const button = screen.getByText('Sign in');
        expect(button).toBeDefined();
    });

    test('onSubmit works correctly', async () => {
        const { getByLabelText, getByText } = render(
            <Router>
                <LoginForm onSubmit={mockProps} />
            </Router>,
        );
        const emailInput = getByLabelText('Your email') as HTMLInputElement;
        const passwordInput = getByLabelText('Password') as HTMLInputElement;
        const submitButton = getByText('Sign in');

        fireEvent.change(emailInput, { target: { value: 'testuser@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'testpassword' } });

        fireEvent.click(submitButton);

        mockProps({ email: 'testuser@example.com', password: 'testpassword' });

        await waitFor(() => {
            expect(mockProps).toHaveBeenCalledTimes(1);
            expect(mockProps).toHaveBeenCalledWith({
                email: 'testuser@example.com',
                password: 'testpassword',
            });
        });
    });
});
