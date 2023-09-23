import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';

interface Category {
    id: number;
    name: string;
    is_active: boolean;
}

interface CategoryTableProps {
    data: Category[];
    onEdit: (category: Category) => void;
    onDelete: (id: number) => void;
}

function CategoryTable({ data, onEdit, onDelete }: CategoryTableProps) {
    return (
        <table className='w-full'>
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
                            {record.is_active ? 'Active' : 'Inactive'}
                        </td>
                        <td className='px-6 py-4 whitespace-no-wrap text-center border-b border-gray-200 text-sm font-medium '>
                            <button
                                onClick={() => onEdit(record)}
                                className='text-blue-600 hover:text-blue-900 mr-4'
                            >
                                <PencilIcon className='h-5 w-5' />
                            </button>
                            <button
                                onClick={() => onDelete(record.id)}
                                className='text-red-600 hover:text-red-900'
                            >
                                <TrashIcon className='h-5 w-5' />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default CategoryTable;
