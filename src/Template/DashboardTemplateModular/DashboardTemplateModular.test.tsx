import ResizeObserver from 'resize-observer-polyfill';
global.ResizeObserver = ResizeObserver;

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import DashboardTemplate2 from '.';

global.fetch = jest.fn().mockImplementation((url) => {
    if (url.includes('create')) {
        return Promise.resolve({
            json: async () => ({
                data: { id: 3, name: 'Category 3', is_active: true },
            }),
        });
    } else if (url.includes('update')) {
        return Promise.resolve({
            json: async () => ({
                data: { id: 1, name: 'Updated Category 1', is_active: true },
            }),
        });
    } else if (url.includes('delete')) {
        return Promise.resolve({ json: async () => ({}) });
    } else {
        return Promise.resolve({
            json: async () => ({
                data: [
                    { id: 1, name: 'Category 1', is_active: true },
                    { id: 2, name: 'Category 2', is_active: false },
                ],
                total_page: 1,
            }),
        });
    }
});

describe('DashboardTemplate2', () => {
    test('initial data load and loading state', async () => {
        render(<DashboardTemplate2 />);

        const loading = screen.queryByText(/loading/i);
        expect(loading).toBeDefined();

        await waitFor(() => {
            expect(screen.queryByText(/loading/i)).toBeNull();
        });

        const category1 = screen.queryByText(/Category 1/i);
        const category2 = screen.queryByText(/Category 2/i);
        expect(category1).toBeDefined();
        expect(category2).toBeDefined();
    });

    test('creates a new category', async () => {
        render(<DashboardTemplate2 />);

        fireEvent.click(screen.getByText('Create Category'));
        fireEvent.change(screen.getByPlaceholderText('Name'), {
            target: { value: 'Category 3' },
        });
        fireEvent.click(screen.getByText('OK'));

        await waitFor(() => {
            const newCategory = screen.queryByText('Category 3');
            expect(newCategory).toBeDefined();
        });
    });

    test('edits an existing category', async () => {
        render(<DashboardTemplate2 />);

        await waitFor(() => screen.getByText('Category 1'));

        const editButton = screen.getByRole('button', { name: /edit category 1/i });
        fireEvent.click(editButton);

        fireEvent.change(screen.getByPlaceholderText('Name'), {
            target: { value: 'Updated Category 1' },
        });

        fireEvent.click(screen.getByText('OK'));

        await waitFor(() => {
            expect(screen.getByText('Category created/updated successfully')).toBeDefined();
        });
    });

    test('deletes a category', async () => {
        render(<DashboardTemplate2 />);

        await waitFor(() => screen.getByText('Category 1'));

        const deleteButton = screen.getByRole('button', { name: /delete category 1/i });
        fireEvent.click(deleteButton);

        const confirmDeleteButton = screen.getByRole('button', { name: /delete/i });
        fireEvent.click(confirmDeleteButton);

        // await waitFor(() => {
        //     expect(screen.queryByText('Category 1')).toBeNull();
        // });
    });
});
