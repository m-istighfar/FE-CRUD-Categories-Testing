import { useState, useEffect, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

interface Category {
    id: number;
    name: string;
    is_active: boolean;
}

interface CategoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    onOk: () => void;
    currentCategory: Category | null;
}

function CategoryModal({ isOpen, onClose, onOk, currentCategory }: CategoryModalProps) {
    const [formValues, setFormValues] = useState<{
        name: string;
        is_active: boolean;
    }>({
        name: currentCategory ? currentCategory.name : '',
        is_active: currentCategory ? currentCategory.is_active : true,
    });

    useEffect(() => {
        setFormValues({
            name: currentCategory ? currentCategory.name : '',
            is_active: currentCategory ? currentCategory.is_active : true,
        });
    }, [currentCategory]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as='div' className='fixed inset-0 z-10 overflow-y-auto' onClose={onClose}>
                <div className='min-h-screen px-4 text-center'>
                    <Dialog.Overlay className='fixed inset-0 bg-black opacity-30' />
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
                                value={formValues.name}
                                onChange={handleInputChange}
                                className='w-full p-2 border rounded-md'
                                placeholder='Category Name'
                            />
                            <div className='mt-4'>
                                <label className='block text-sm font-medium text-gray-700'>
                                    Status
                                </label>
                                <select
                                    value={formValues.is_active.toString()}
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
                                onClick={onOk}
                                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2'
                            >
                                OK
                            </button>
                            <button
                                onClick={onClose}
                                className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded'
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}

export default CategoryModal;
