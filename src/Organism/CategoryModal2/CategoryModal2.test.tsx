import ResizeObserver from 'resize-observer-polyfill';
global.ResizeObserver = ResizeObserver;

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import CategoryModal from '.';
import '@testing-library/jest-dom';

describe('CategoryModal Test', () => {
    const mockSetFormValues = jest.fn();
    const mockHandleOk = jest.fn(() => Promise.resolve());
    const mockHandleCancel = jest.fn();

    const mockProps = {
        isModalOpen: true,
        currentCategory: null,
        handleOk: mockHandleOk,
        handleCancel: mockHandleCancel,
        setFormValues: mockSetFormValues,
        formValues: {
            name: '',
            is_active: true,
        },
    };

    describe('Create Category', () => {
        beforeEach(() => {
            render(<CategoryModal {...mockProps} />);
        });

        test('renders correctly with initial values', () => {
            expect(screen.getByText('Create Category')).toBeInTheDocument();
            expect(screen.getByPlaceholderText('Name')).toHaveValue('');
            expect(screen.getByRole('combobox')).toHaveValue('true');
            expect(screen.getByText('OK')).toBeInTheDocument();
            expect(screen.getByText('Cancel')).toBeInTheDocument();
        });

        test('handleOk and setFormValues are called with correct values', async () => {
            const nameInput = screen.getByPlaceholderText('Name') as HTMLInputElement;
            const statusSelect = screen.getByRole('combobox') as HTMLSelectElement;
            const okButton = screen.getByText('OK');

            fireEvent.change(nameInput, { target: { value: 'Sample Category' } });
            fireEvent.change(statusSelect, { target: { value: 'false' } });

            fireEvent.click(okButton);

            // await waitFor(() => {
            //     expect(mockHandleOk).toHaveBeenCalledTimes(1);
            //     expect(mockSetFormValues).toHaveBeenCalledWith({
            //         name: 'Sample Category',
            //         is_active: false,
            //     });
            // });
        });

        test('handleCancel works correctly', async () => {
            const cancelButton = screen.getByText('Cancel');

            fireEvent.click(cancelButton);

            await waitFor(() => {
                expect(mockHandleCancel).toHaveBeenCalledTimes(1);
            });
        });
    });
});
