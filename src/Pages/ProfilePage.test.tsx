import { render, waitFor } from '@testing-library/react';
import ProfilePage from './ProfilePage';

// Mock localStorage
const localStorageMock = {
    getItem: jest.fn(),
};

Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
});

// Mock the fetch function
global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => ({ data: { id: 1, name: 'John', email: 'john@example.com' } }),
});

describe('ProfilePage', () => {
    it('should render profile data on successful fetch', async () => {
        // Set up a mock token
        localStorageMock.getItem.mockReturnValue('mock-token');

        const { getByText } = render(<ProfilePage />);

        // Ensure loading message is displayed
        expect(getByText('Profile Page')).toBeDefined();

        // Wait for the data to be fetched and the loading message to disappear
        await waitFor(() => {
            expect(getByText('Profile Page')).toBeDefined();
            expect(getByText('ID: 1')).toBeDefined();
            expect(getByText('Name: John')).toBeDefined();
            expect(getByText('Email: john@example.com')).toBeDefined();
        });
    });
});
