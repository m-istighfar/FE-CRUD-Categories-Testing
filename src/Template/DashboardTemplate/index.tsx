import { useState, useEffect, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { MagnifyingGlassIcon, PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/solid';

interface Category {
    id: number;
    name: string;
    is_active: boolean;
}

const authToken: string = localStorage.getItem('token') || '';

function DashboardTemplate() {
    const [data, setData] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);
    const [categoryIdToDelete, setCategoryIdToDelete] = useState<number | null>(null);

    const [formValues, setFormValues] = useState<{
        name: string;
        is_active: boolean;
    }>({
        name: '',
        is_active: true,
    });
    const [notification, setNotification] = useState<string | null>(null);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);

    const showNotification = (message: string) => {
        setNotification(message);
        setTimeout(() => {
            setNotification(null);
        }, 1000);
    };

    const fetchData = async () => {
        try {
            setLoading(true);
            const url = `https://mock-api.arikmpt.com/api/category?page=${currentPage}&name=${searchTerm}`;

            const res = await fetch(url, {
                headers: { Authorization: authToken },
                method: 'GET',
            });
            const result = await res.json();
            setData(result.data || []);
            setTotalPages(result.total_page || 1);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchTerm, currentPage]);

    const handleOk = async () => {
        try {
            const existingCategory = data.find((item) => item.name === formValues.name);
            if (
                existingCategory &&
                (!currentCategory || existingCategory.id !== currentCategory.id)
            ) {
                throw new Error('Category name already exists');
            }
            if (currentCategory) {
                await fetch(`https://mock-api.arikmpt.com/api/category/update`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: authToken,
                    },
                    body: JSON.stringify({
                        id: currentCategory.id,
                        name: formValues.name,
                        is_active: formValues.is_active,
                    }),
                });
            } else {
                await fetch('https://mock-api.arikmpt.com/api/category/create', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: authToken,
                    },
                    body: JSON.stringify({
                        name: formValues.name,
                        is_active: formValues.is_active, // Include the status here
                    }),
                });
            }
            showNotification('Category created/updated successfully');
            fetchData();
            handleCancel();
        } catch (e) {
            if (e instanceof Error) {
                showNotification(e.message);
            }
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setCurrentCategory(null);
        setFormValues({ name: '', is_active: true });
    };

    const handleDelete = (id: number) => {
        setCategoryIdToDelete(id);
        setIsConfirmModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (categoryIdToDelete !== null) {
            try {
                await fetch(`https://mock-api.arikmpt.com/api/category/${categoryIdToDelete}`, {
                    method: 'DELETE',
                    headers: { Authorization: authToken },
                });
                showNotification('Category deleted successfully');
                fetchData();
            } catch (e) {
                showNotification('Deletion failed');
            }
        }
        setIsConfirmModalOpen(false);
        setCategoryIdToDelete(null);
    };

    const handleCancelDelete = () => {
        setIsConfirmModalOpen(false);
        setCategoryIdToDelete(null);
    };

    const handleEdit = (record: Category) => {
        setFormValues({ name: record.name, is_active: record.is_active });
        setCurrentCategory(record);
        setIsModalOpen(true);
    };

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className='flex flex-col mx-auto w-11/12'>
            <div className='flex justify-between items-center mb-6'>
                <div className='w-1/3'>
                    <div className='relative text-gray-600'>
                        <input
                            type='search'
                            name='serch'
                            placeholder='Filter by category name'
                            className='bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none w-full'
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button type='submit' className='absolute right-0 top-0 mt-2 mr-4'>
                            <MagnifyingGlassIcon className='h-6 w-6 text-gray-600' />
                        </button>
                    </div>
                </div>

                <button
                    onClick={() => setIsModalOpen(true)}
                    className='flex items-center bg-blue-500  text-white text-sm rounded-md px-4 py-2 focus:outline-none hover:bg-blue-600'
                >
                    <PlusIcon className='h-5 w-5 mr-2' />
                    Create Category
                </button>
            </div>
            <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
                <table className={`w-full  ${loading ? 'opacity-50' : ''}`}>
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
                                        onClick={() => handleEdit(record)}
                                        className='text-blue-600 hover:text-blue-900 mr-4'
                                    >
                                        <PencilIcon className='h-5 w-5' />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(record.id)}
                                        className='text-red-600 hover:text-red-900'
                                    >
                                        <TrashIcon className='h-5 w-5' />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='mt-4'>
                <nav
                    className='relative z-0 inline-flex rounded-md shadow-sm -space-x-px'
                    aria-label='Pagination'
                >
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className='relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'
                    >
                        <span className='sr-only'>Previous</span>
                        <span>&laquo;</span>
                    </button>
                    {[...Array(totalPages).keys()].map((_, index) => (
                        <button
                            key={index}
                            onClick={() => handlePageChange(index + 1)}
                            className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 ${
                                currentPage === index + 1 && 'bg-gray-200'
                            }`}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className='relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'
                    >
                        <span className='sr-only'>Next</span>
                        <span>&raquo;</span>
                    </button>
                </nav>
            </div>
            {notification && (
                <div className='fixed inset-0 flex items-center justify-center z-50'>
                    <div className='bg-green-500 text-white py-2 px-4 rounded-md shadow-md'>
                        {notification}
                    </div>
                </div>
            )}
            <Transition show={isModalOpen} as={Fragment}>
                <Dialog
                    as='div'
                    className='fixed inset-0 z-10 overflow-y-auto'
                    static
                    open={isModalOpen}
                    onClose={handleCancel}
                >
                    <div className='min-h-screen px-4 text-center'>
                        <Dialog.Overlay className='fixed inset-0 bg-gray-500 bg-opacity-75' />
                        <span className='inline-block h-screen align-middle' aria-hidden='true'>
                            &#8203;
                        </span>
                        <div className='inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl'>
                            <Dialog.Title
                                as='h3'
                                className='text-lg font-medium leading-6 text-gray-900'
                            >
                                {currentCategory ? 'Edit Category' : 'Create Category'}
                            </Dialog.Title>
                            <div className='mt-2'>
                                <input
                                    type='text'
                                    placeholder='Name'
                                    value={formValues.name}
                                    onChange={(e) =>
                                        setFormValues({ ...formValues, name: e.target.value })
                                    }
                                    className='w-full p-2 border rounded-md'
                                />
                                <div className='mt-4'>
                                    <label className='block text-sm font-medium text-gray-700'>
                                        Status
                                    </label>
                                    <select
                                        value={formValues.is_active.toString()} // Explicitly cast to string
                                        onChange={(e) =>
                                            setFormValues({
                                                ...formValues,
                                                is_active: e.target.value === 'true',
                                            })
                                        }
                                        className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                                    >
                                        <option value='true'>Active</option>
                                        <option value='false'>Deactive</option>
                                    </select>
                                </div>
                            </div>
                            <div className='mt-4'>
                                <button
                                    type='button'
                                    onClick={handleOk}
                                    className='inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'
                                >
                                    OK
                                </button>
                                <button
                                    type='button'
                                    onClick={handleCancel}
                                    className='ml-2 inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-transparent rounded-md hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </Transition>
            {isConfirmModalOpen && (
                <Transition show={isConfirmModalOpen} as={Fragment}>
                    <Dialog
                        as='div'
                        className='fixed inset-0 z-20 overflow-y-auto'
                        open={isConfirmModalOpen}
                        onClose={handleCancelDelete}
                    >
                        <div className='min-h-screen px-4 text-center'>
                            <Dialog.Overlay className='fixed inset-0 bg-gray-500 bg-opacity-75' />
                            <span className='inline-block h-screen align-middle' aria-hidden='true'>
                                &#8203;
                            </span>
                            <div className='inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl'>
                                <Dialog.Title
                                    as='h3'
                                    className='text-lg font-medium leading-6 text-gray-900'
                                >
                                    Confirm Deletion
                                </Dialog.Title>
                                <div className='mt-2'>
                                    <p>
                                        Are you sure you want to delete this category? This action
                                        cannot be undone.
                                    </p>
                                </div>
                                <div className='mt-4'>
                                    <button
                                        type='button'
                                        onClick={handleConfirmDelete}
                                        className='inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-red-500 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500'
                                    >
                                        Delete
                                    </button>
                                    <button
                                        type='button'
                                        onClick={handleCancelDelete}
                                        className='ml-2 inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-transparent rounded-md hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            )}
        </div>
    );
}

export default DashboardTemplate;
