import { render, waitFor } from '@testing-library/react';
import ProfilePage from './ProfilePage';

const localStorageMock = {
    getItem: jest.fn(),
};

Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
});

global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => ({ data: { id: 1, name: 'John', email: 'john@example.com' } }),
});

describe('ProfilePage', () => {
    it('should render profile data on successful fetch', async () => {
        localStorageMock.getItem.mockReturnValue('mock-token');

        const { getByText } = render(<ProfilePage />);

        expect(getByText('Profile Page')).toBeDefined();

        await waitFor(() => {
            expect(getByText('Profile Page')).toBeDefined();
            expect(getByText('ID: 1')).toBeDefined();
            expect(getByText('Name: John')).toBeDefined();
            expect(getByText('Email: john@example.com')).toBeDefined();
        });
    });
});
