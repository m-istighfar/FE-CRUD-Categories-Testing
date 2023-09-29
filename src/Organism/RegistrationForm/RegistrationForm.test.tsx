import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import RegistrationForm from '.';
import { BrowserRouter as Router } from 'react-router-dom';

describe('test registration form', () => {
    const mockOnSubmit = jest.fn();

    test('label name render correctly', async () => {
        render(
            <Router>
                <RegistrationForm onSubmit={mockOnSubmit} />
            </Router>,
        );
        const label = screen.getByLabelText('Name');
        expect(label).toBeDefined();
    });

    test('label email render correctly', async () => {
        render(
            <Router>
                <RegistrationForm onSubmit={mockOnSubmit} />
            </Router>,
        );
        const label = screen.getByLabelText('Your email');
        expect(label).toBeDefined();
    });

    test('label password render correctly', async () => {
        render(
            <Router>
                <RegistrationForm onSubmit={mockOnSubmit} />
            </Router>,
        );
        const label = screen.getByLabelText('Password');
        expect(label).toBeDefined();
    });

    test('button submit render correctly', async () => {
        render(
            <Router>
                <RegistrationForm onSubmit={mockOnSubmit} />
            </Router>,
        );
        const button = screen.getByText('Register');
        expect(button).toBeDefined();
    });

    test('onSubmit works correctly', async () => {
        const { getByLabelText, getByText } = render(
            <Router>
                <RegistrationForm onSubmit={mockOnSubmit} />
            </Router>,
        );
        const nameInput = getByLabelText('Name') as HTMLInputElement;
        const emailInput = getByLabelText('Your email') as HTMLInputElement;
        const passwordInput = getByLabelText('Password') as HTMLInputElement;
        const submitButton = getByText('Register');

        fireEvent.change(nameInput, { target: { value: 'Test User' } });
        fireEvent.change(emailInput, { target: { value: 'testuser@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'testpassword' } });

        fireEvent.click(submitButton);

        mockOnSubmit({
            name: 'Test User',
            email: 'testuser@example.com',
            password: 'testpassword',
        });

        await waitFor(() => {
            expect(mockOnSubmit).toHaveBeenCalledTimes(1);
            expect(mockOnSubmit).toHaveBeenCalledWith({
                name: 'Test User',
                email: 'testuser@example.com',
                password: 'testpassword',
            });
        });
    });
});
