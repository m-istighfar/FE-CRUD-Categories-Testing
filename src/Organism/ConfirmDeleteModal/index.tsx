import { Transition, Dialog } from '@headlessui/react';
import { Fragment } from 'react';

interface ConfirmDeleteModalProps {
    isConfirmModalOpen: boolean;
    handleConfirmDelete: () => void;
    handleCancelDelete: () => void;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
    isConfirmModalOpen,
    handleConfirmDelete,
    handleCancelDelete,
}) => {
    return (
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
                                Are you sure you want to delete this category? This action cannot be
                                undone.
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
    );
};

export default ConfirmDeleteModal;
