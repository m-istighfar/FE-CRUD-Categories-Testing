import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import React from 'react';

interface Category {
    id: number;
    name: string;
    is_active: boolean;
}

interface CategoryTableProps {
    data: Category[];
    loading: boolean;
    handleEdit: (record: Category) => void;
    handleDelete: (id: number) => void;
}

const CategoryTable: React.FC<CategoryTableProps> = ({
    data,
    loading,
    handleEdit,
    handleDelete,
}) => {
    return (
        <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
            <table className={`w-full ${loading ? 'opacity-50' : ''}`}>
                <thead className='bg-gray-50 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>
                    <tr>
                        <th scope='col' className='px-6 py-3'>
                            ID
                        </th>
                        <th scope='col' className='px-6 py-3'>
                            Name
                        </th>
                        <th scope='col' className='px-6 py-3'>
                            Status
                        </th>
                        <th scope='col' className='px-6 py-3'>
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className='bg-white'>
                    {data.map((record) => (
                        <tr key={record.id}>
                            <td className='px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-center'>
                                {record.id}
                            </td>
                            <td className='px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-center'>
                                {record.name}
                            </td>
                            <td className='px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-center'>
                                {record.is_active ? 'Active' : 'Deactive'}
                            </td>
                            <td className='px-6 py-4 whitespace-no-wrap text-center border-b border-gray-200 text-sm font-medium '>
                                <button
                                    aria-label={`Edit ${record.name}`}
                                    onClick={() => handleEdit(record)}
                                    className='text-blue-600 hover:text-blue-900 mr-4'
                                >
                                    <PencilIcon className='h-5 w-5' />
                                </button>
                                <button
                                    onClick={() => handleDelete(record.id)}
                                    className='text-red-600 hover:text-red-900'
                                    aria-label={`Delete ${record.name}`}
                                >
                                    <TrashIcon className='h-5 w-5' />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CategoryTable;
