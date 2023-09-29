import { render, screen, waitFor } from '@testing-library/react';
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

        render(<ProfilePage />);

        expect(screen.getByText('Profile Page')).toBeDefined();

        await waitFor(() => {
            expect(screen.getByText('ID: 1')).toBeDefined();
            expect(screen.getByText('Name: John')).toBeDefined();
            expect(screen.getByText('Email: john@example.com')).toBeDefined();
        });
    });
});
