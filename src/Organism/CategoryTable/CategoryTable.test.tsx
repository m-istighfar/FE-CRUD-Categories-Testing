import { render, screen } from '@testing-library/react';
import CategoryTable from '.';

interface Category {
    id: number;
    name: string;
    is_active: boolean;
}

const mockHandleEdit = jest.fn();
const mockHandleDelete = jest.fn();

const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Status',
        dataIndex: 'is_active',
        key: 'is_active',
    },
    {
        title: 'Actions',
        key: 'actions',
    },
];

const mockData: Category[] = [{ id: 1, name: 'Category 1', is_active: true }];

describe('Test CategoryTable Component', () => {
    beforeAll(() => {
        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: jest.fn().mockImplementation((query) => ({
                matches: false,
                media: query,
                onchange: null,
                addListener: jest.fn(), // Deprecated
                removeListener: jest.fn(), // Deprecated
                addEventListener: jest.fn(),
                removeEventListener: jest.fn(),
                dispatchEvent: jest.fn(),
            })),
        });
    });

    test('test header column', () => {
        render(
            <CategoryTable
                data={mockData}
                loading={false}
                handleEdit={mockHandleEdit}
                handleDelete={mockHandleDelete}
            />,
        );

        columns.map((column) => {
            if (column.title) {
                const title = screen.getByText(column.title.toString());
                expect(title).toBeDefined();
            }
        });
    });
});
