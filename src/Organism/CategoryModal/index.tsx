import { Transition, Dialog } from '@headlessui/react';
import React, { useState, useEffect, Fragment } from 'react';

interface Category {
    id: number;
    name: string;
    is_active: boolean;
}

interface CategoryModalProps {
    isModalOpen: boolean;
    currentCategory: Category | null;
    formValues: {
        name: string;
        is_active: boolean;
    };
    handleOk: () => void;
    handleCancel: () => void;
    setFormValues: React.Dispatch<React.SetStateAction<{ name: string; is_active: boolean }>>; // Add this prop
}

const authToken: string = localStorage.getItem('token') || '';

const CategoryModal: React.FC<CategoryModalProps> = ({
    isModalOpen,
    currentCategory,
    formValues,
    handleOk,
    handleCancel,
    setFormValues,
}) => {
    const [modalFormValues, setModalFormValues] = useState(formValues);

    useEffect(() => {
        setModalFormValues(formValues);
    }, [formValues]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setModalFormValues({
            ...modalFormValues,
            [name]: name === 'is_active' ? value === 'true' : value,
        });
    };

    const handleSubmit = async () => {
        try {
            if (modalFormValues.name.trim() === '') {
                throw new Error('Category name cannot be empty');
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
                        name: modalFormValues.name,
                        is_active: modalFormValues.is_active,
                    }),
                });

                currentCategory.name = modalFormValues.name;
                currentCategory.is_active = modalFormValues.is_active;
            } else {
                await fetch('https://mock-api.arikmpt.com/api/category/create', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: authToken,
                    },
                    body: JSON.stringify({
                        name: modalFormValues.name,
                        is_active: modalFormValues.is_active,
                    }),
                });
            }

            setFormValues(modalFormValues);

            handleOk();
        } catch (e) {
            if (e instanceof Error) {
                console.error(e);
            }
        }
    };

    return (
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
                                name='name'
                                placeholder='Name'
                                value={modalFormValues.name}
                                onChange={handleInputChange}
                                className='w-full p-2 border rounded-md'
                            />
                            <div className='mt-4'>
                                <label className='block text-sm font-medium text-gray-700'>
                                    Status
                                </label>
                                <select
                                    name='is_active'
                                    value={modalFormValues.is_active.toString()}
                                    onChange={handleInputChange}
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
                                onClick={handleSubmit}
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
    );
};

export default CategoryModal;
